import { VStack, Text, Input } from '@chakra-ui/react';
import { useEffect, useState, useMemo } from 'react';
import { useQuery } from 'react-query';
import TableComponent from './table/table';
import { TablePaginationWithChakra } from '@gms-micro/table-utils';
import {
    getResourceListFilteredAndPaginated,
    TimetrackItem,
} from '@gms-micro/api-utils';
import SelectFilters from './select-filters/select-filters';
import { useDidMountEffect } from '@gms-micro/react-hooks';
import ExportModule from './export-module/export-module';
import { Sort } from '@gms-micro/api-filters';
import moment from 'moment';
import { useAuthHeader } from 'react-auth-kit';
import DatesFilter from './dates-filters/dates-filters';

const App = () => {
    const [currentPage, setCurrentPage] = useState(0);
    const [from, setFrom] = useState<string>(
        moment().add(-1, 'month').startOf('month').format('YYYY-MM-DD')
    ); // Default filter to beggining of previous month
    const [to, setTo] = useState<string>('');
    const [users, setUsers] = useState<Array<number>>([]);
    const [sort, setSort] = useState<Sort>({
        field: 'date',
        isAscending: false,
    });
    const [businessUnits, setBusinessUnits] = useState<Array<number>>([]);
    const [projects, setProjects] = useState<Array<number>>([]);
    const [proposals, setProposals] = useState<Array<number>>([]);
    const [accounts, setAccounts] = useState<Array<number>>([]);
    const [generalSearch, setGeneralSearch] = useState('');
    const [refetchAux, setRefetchAux] = useState(0);
    const getAuthHeader = useAuthHeader();

    const onGeneralSearchChange = useMemo(
        () => (e: React.ChangeEvent<HTMLInputElement>) => {
            setGeneralSearch(e.target.value);
        },
        []
    );

    // Go to first page if any filter changes
    useEffect(() => {
        setCurrentPage(0);
    }, [
        from,
        to,
        refetchAux,
        users,
        businessUnits,
        projects,
        proposals,
        accounts,
        sort,
    ]);

    // Workaround for waiting 1500ms after user finished typing in the general searchbar for the search to be triggered
    useDidMountEffect(() => {
        // Instead of passing generalSearch directly to the query filter, we use an aux that's triggered after 1500 ms
        // This is to avoid refetching the query when the user is typing in the general searchbar
        const timeOutId = setTimeout(() => setRefetchAux(refetchAux + 1), 1500);
        return () => clearTimeout(timeOutId);
    }, [generalSearch]);

    const filters = useMemo(
        () => [
            { field: 'date_bgr', value: from !== '' ? from : undefined },
            { field: 'date_sml', value: to !== '' ? to : undefined },
            {
                field: 'legacyUserId_OR',
                value: users.length ? users.join(',') : undefined,
            },
            {
                field: 'legacyUser.businessUnitId_OR',
                value: businessUnits.length
                    ? businessUnits.join(',')
                    : undefined,
            },
            {
                field: 'projectId_OR',
                value: projects.length ? projects.join(',') : undefined,
            },
            {
                field: 'project.proposalId_OR',
                value: proposals.length ? proposals.join(',') : undefined,
            },
            {
                field: 'project.proposal.accountId_OR',
                value: accounts.length ? accounts.join(',') : undefined,
            },
        ],
        [
            from,
            to,
            refetchAux,
            users,
            businessUnits,
            projects,
            proposals,
            accounts,
        ]
    );

    const customFilters = useMemo(
        () => [{ name: 'generalSearch', value: generalSearch }],
        [generalSearch]
    );

    const refetchTriggers = useMemo(
        () => [
            currentPage,
            from,
            to,
            refetchAux,
            users,
            businessUnits,
            projects,
            proposals,
            accounts,
            sort,
        ],
        [
            currentPage,
            from,
            to,
            refetchAux,
            users,
            businessUnits,
            projects,
            proposals,
            accounts,
            sort,
        ]
    );

    const timetrackQuery = useQuery(['timetrack', refetchTriggers], () =>
        getResourceListFilteredAndPaginated<TimetrackItem>(
            'timetrack',
            getAuthHeader(),
            filters,
            customFilters,
            sort,
            currentPage
        )
    );

    return (
        <VStack w={'full'} maxW={'full'} p={5}>
            <VStack w={'90%'} spacing={5}>
                <VStack w={'full'} spacing={5} alignItems={'flex-start'}>
                    <DatesFilter
                        from={from}
                        to={to}
                        setFrom={setFrom}
                        setTo={setTo}
                    />
                    <Input
                        w={'full'}
                        bgColor={'white'}
                        value={generalSearch}
                        onChange={onGeneralSearchChange}
                        placeholder={'General search'}
                    />
                    <SelectFilters
                        dropdownsData={[
                            {
                                labelOption: 'fullName',
                                valueOption: 'id',
                                values: users,
                                setValue: setUsers,
                                title: 'Employee',
                                resource: 'users/legacy',
                                optionField: 'fullName',
                            },
                            {
                                labelOption: 'name',
                                valueOption: 'id',
                                values: businessUnits,
                                setValue: setBusinessUnits,
                                title: 'Business Unit',
                                resource: 'businessUnits',
                            },
                            {
                                labelOption: 'name',
                                valueOption: 'id',
                                values: projects,
                                setValue: setProjects,
                                title: 'Project',
                                resource: 'projects',
                            },
                            {
                                labelOption: 'name',
                                valueOption: 'id',
                                values: proposals,
                                setValue: setProposals,
                                title: 'Proposal',
                                resource: 'proposals',
                            },
                            {
                                labelOption: 'name',
                                valueOption: 'id',
                                values: accounts,
                                setValue: setAccounts,
                                title: 'Account',
                                resource: 'accounts',
                            },
                        ]}
                    />
                    <ExportModule
                        filters={filters}
                        customFilters={customFilters}
                        refetch={refetchTriggers}
                    />
                </VStack>
                {timetrackQuery.isLoading && <Text>Loading...</Text>}
                {timetrackQuery.isSuccess && (
                    <TableComponent
                        tableData={timetrackQuery.data.data}
                        sort={sort}
                        setSort={setSort}
                    />
                )}
                {timetrackQuery.isError && (
                    <Text>
                        There was an error generating the table, try again later
                    </Text>
                )}
                <TablePaginationWithChakra
                    isLoading={timetrackQuery.isLoading}
                    currentPage={currentPage}
                    setCurrentPage={setCurrentPage}
                    pagesAmountHeader={
                        timetrackQuery.data?.headers['pages-amount']
                    }
                />
            </VStack>
        </VStack>
    );
};

export default App;
