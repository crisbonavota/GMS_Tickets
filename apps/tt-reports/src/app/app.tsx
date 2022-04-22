import { Heading, VStack, Text, Input, Button } from '@chakra-ui/react';
import { useEffect, useState, useMemo } from 'react';
import { useQuery } from 'react-query'
import { getTimetrackItems, getTimetrackItemsReport } from './api';
import TableComponent from './table/table';
import { TableDatesFilterWithChakra, TablePaginationWithChakra } from '@gms-micro/table-utils';
import { getLegacyUsers, getBusinessUnits, getProjects, getProposals, getAccounts, downloadFile, generateExcelFileURL } from '@gms-micro/api-utils';
import SelectFilters from './select-filters/select-filters';
import { SelectItem } from './select-item/select-item';
import { useDidMountEffect } from '@gms-micro/react-hooks';
import ExportStats from './export-stats/export-stats';

const App = ({ authHeader }: { authHeader: string }) => {
    const [currentPage, setCurrentPage] = useState(0);
    const [from, setFrom] = useState<string>(addMonths(new Date(Date.now()), -1)); // Default filter to 1 month ago
    const [to, setTo] = useState<string>("");
    const [users, setUsers] = useState<SelectItem[]>([]);
    const [businessUnits, setBusinessUnits] = useState<SelectItem[]>([]);
    const [projects, setProjects] = useState<SelectItem[]>([]);
    const [proposals, setProposals] = useState<SelectItem[]>([]);
    const [accounts, setAccounts] = useState<SelectItem[]>([]);
    const [generalSearch, setGeneralSearch] = useState("");
    const [refetchAux, setRefetchAux] = useState(0);

    const onGeneralSearchChange = useMemo(() =>
        (e: React.ChangeEvent<HTMLInputElement>) => {
            setGeneralSearch(e.target.value);
        }, []);

    const onExport = () => {
        reportQuery.isSuccess
            && downloadFile(generateExcelFileURL(reportQuery.data.data), `gms_timetrack_report_${new Date(Date.now()).toISOString()}.xlsx`);
    };

    // Go to first page if any filter changes
    useEffect(() => {
        setCurrentPage(0);
    }, [from, to, refetchAux, users, businessUnits, projects, proposals, accounts]);

    // Workaround for waiting 1500ms after user finished typing in the general searchbar for the search to be triggered
    useDidMountEffect(() => {
        // Instead of passing generalSearch directly to the query filter, we use an aux that's triggered after 1500 ms
        // This is to avoid refetching the query when the user is typing in the general searchbar
        const timeOutId = setTimeout(() => setRefetchAux(refetchAux + 1), 1500);
        return () => clearTimeout(timeOutId);
    }, [generalSearch]);

    const timetrackQuery = useQuery(
        ['timetrack', currentPage, from, to, refetchAux, users, businessUnits, projects, proposals, accounts],
        () => getTimetrackItems(
            authHeader,
            [
                { field: 'date_bgr', value: from !== "" ? from : undefined },
                { field: 'date_sml', value: to !== "" ? to : undefined },
                { field: 'legacyUserId_OR', value: selectItemToFilterValues(users) },
                { field: 'legacyUser.businessUnitId_OR', value: selectItemToFilterValues(businessUnits) },
                { field: 'projectId_OR', value: selectItemToFilterValues(projects) },
                { field: 'project.proposalId_OR', value: selectItemToFilterValues(proposals) },
                { field: 'project.proposal.accountId_OR', value: selectItemToFilterValues(accounts) }
            ],
            [{ name: 'generalSearch', value: generalSearch }],
            undefined,
            currentPage)
    );

    const reportQuery = useQuery(
        ['timetrackReport', from, to, refetchAux, users, businessUnits, projects, proposals, accounts],
        () => getTimetrackItemsReport(
            authHeader,
            [
                { field: 'date_bgr', value: from !== "" ? from : undefined },
                { field: 'date_sml', value: to !== "" ? to : undefined },
                { field: 'legacyUserId_OR', value: selectItemToFilterValues(users) },
                { field: 'legacyUser.businessUnitId_OR', value: selectItemToFilterValues(businessUnits) },
                { field: 'projectId_OR', value: selectItemToFilterValues(projects) },
                { field: 'project.proposalId_OR', value: selectItemToFilterValues(proposals) },
                { field: 'project.proposal.accountId_OR', value: selectItemToFilterValues(accounts) }
            ],
            [{ name: 'generalSearch', value: generalSearch }])
    );

    const usersQuery = useQuery(['users', authHeader], () =>
        getLegacyUsers(authHeader), { retry: 2, retryDelay: 500 });

    const businessUnitsQuery = useQuery(['businessUnits', authHeader], () =>
        getBusinessUnits(authHeader), { retry: 2, retryDelay: 500 });

    const projectsQuery = useQuery(['projects', authHeader], () =>
        getProjects(authHeader), { retry: 2, retryDelay: 500 });

    const proposalsQuery = useQuery(['proposals', authHeader], () =>
        getProposals(authHeader), { retry: 2, retryDelay: 500 });

    const accountsQuery = useQuery(['accounts', authHeader], () =>
        getAccounts(authHeader), { retry: 2, retryDelay: 500 });

    return (
        <VStack w={'full'} maxW={'full'} p={5}>
            <VStack w={'90%'} spacing={5}>
                <Heading fontSize={'2xl'}>Timetrack reports</Heading>
                <VStack w={'full'} spacing={5} alignItems={'flex-start'}>
                    <TableDatesFilterWithChakra isLoading={false} from={from} to={to} setFrom={setFrom} setTo={setTo} full />
                    <Input
                        w={'full'}
                        bgColor={'white'}
                        value={generalSearch}
                        onChange={onGeneralSearchChange}
                        placeholder={'General search'}
                    />
                    <SelectFilters
                        selectItems={[
                            { query: usersQuery, placeholder: 'Employee', nameField: 'fullName', values: users, setter: setUsers },
                            { query: businessUnitsQuery, placeholder: 'Business unit', nameField: 'name', values: businessUnits, setter: setBusinessUnits },
                            { query: projectsQuery, placeholder: 'Project', nameField: 'name', values: projects, setter: setProjects },
                            { query: proposalsQuery, placeholder: 'Proposal', nameField: 'name', values: proposals, setter: setProposals },
                            { query: accountsQuery, placeholder: 'Account', nameField: 'name', values: accounts, setter: setAccounts }
                        ]}
                    />
                    <ExportStats query={reportQuery} />
                    <Button
                        colorScheme={'green'}
                        w={'full'}
                        isLoading={reportQuery.isLoading}
                        disabled={reportQuery.isError}
                        onClick={onExport}
                    >
                        Export
                    </Button>
                </VStack>
                {timetrackQuery.isLoading && <Text>Loading...</Text>}
                {timetrackQuery.isSuccess && <TableComponent tableData={timetrackQuery.data.data} />}
                {timetrackQuery.isError && <Text>There was an error generating the table, try again later</Text>}
                <TablePaginationWithChakra
                    isLoading={timetrackQuery.isLoading}
                    currentPage={currentPage}
                    setCurrentPage={setCurrentPage}
                    pagesAmountHeader={timetrackQuery.data?.headers['pages-amount']}
                />
            </VStack>
        </VStack>
    )
}

const selectItemToFilterValues = (items: SelectItem[]) => {
    const values = items.map(item => item.id);
    // The lib that processes the filters before sending them to the API needs empty filters to be undefined
    if (values.length === 0) return undefined;
    console.log(values);
    return values.toString();
}

const getDaysInMonth = (year: number, month: number) => new Date(year, month, 0).getDate()

const addMonths = (input: Date, months: number) => {
    const date = new Date(input)
    date.setDate(1)
    date.setMonth(date.getMonth() + months)
    date.setDate(Math.min(input.getDate(), getDaysInMonth(date.getFullYear(), date.getMonth() + 1)))
    return date.toISOString().substring(0, 10); // substring to remove time from the string
}

export default App