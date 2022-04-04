import { useState } from 'react';
import { Center, VStack, chakra, FormLabel, Text, Button, Stack, useBoolean } from '@chakra-ui/react';
import { useQuery } from 'react-query';
import { getLegacyUsers, getBusinessUnits, getProjects, getProposals, getAccounts, getTimetrackItemsReport, downloadFile, generateExcelFileURL } from './api';
import SelectItemsDropdown, { SelectItem } from './select-item/select-item';
import SidePanel from './side-panel/side-panel';

export const App = ({ authHeader }: { authHeader: string }) => {
    const [users, setUsers] = useState<SelectItem[]>([]);
    const [businessUnits, setBusinessUnits] = useState<SelectItem[]>([]);
    const [projects, setProjects] = useState<SelectItem[]>([]);
    const [proposals, setProposals] = useState<SelectItem[]>([]);
    const [accounts, setAccounts] = useState<SelectItem[]>([]);
    const [exportLoading, setExportLoading] = useBoolean();

    /* Dates inputs can't change between controlled-uncontrolled state so i have to avoid using undefined and manually convert
        them to undefined if they're an empty string before sending them as filter value */
    const [from, setFrom] = useState<string>("");
    const [to, setTo] = useState<string>("");

    const onExport = () => {
        setExportLoading.toggle();
        timetrackItemsQuery.isSuccess && downloadFile(generateExcelFileURL(timetrackItemsQuery.data?.data), `gms_report_${new Date(Date.now()).toISOString()}.xlsx`);
        setExportLoading.toggle();
    }

    const onFromChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFrom(e.target.value);
        if (to && Date.parse(to) < Date.parse(e.target.value)) {
            setTo("");
        }
    }

    const onToChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setTo(e.target.value);
        if (from && Date.parse(from) > Date.parse(e.target.value)) {
            setFrom("");
        }
    }

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

    const timetrackItemsQuery = useQuery(
        ['timetrackItems', users, businessUnits, projects, proposals, accounts, from, to],
        () => getTimetrackItemsReport(
            authHeader,
            [
                {
                    field: 'userId_OR',
                    value: selectItemToFilterValues(users)
                },
                {
                    field: 'user.businessUnitId_OR',
                    value: selectItemToFilterValues(businessUnits)
                },
                {
                    field: 'projectId_OR',
                    value: selectItemToFilterValues(projects)
                },
                {
                    field: 'project.proposalId_OR',
                    value: selectItemToFilterValues(proposals)
                },
                {
                    field: 'project.proposal.accountId_OR',
                    value: selectItemToFilterValues(accounts)
                },
                {
                    field: 'date_sml',
                    value: to !== "" ? to : undefined
                },
                {
                    field: 'date_bgr',
                    value: from !== "" ? from : undefined
                }
            ])
    );

    return (
        <Center w={'full'} minH={'92vh'}>
            <VStack
                w={{ base: 'full', md: '75%' }}
                spacing={5}
                p={{ base: 5, md: 0 }}
            >
                <Stack
                    w={'full'}
                    justifyContent={'center'}
                    alignItems={'flex-start'}
                    h={'full'}
                    flexDir={{ base: 'column', md: 'row' }}
                >
                    <VStack
                        alignItems={'flex-start'}
                        w={{ base: '100%', md: '50%' }}
                        h={'full'}
                        me={{ base: 0, md: 5 }}
                        mb={{ base: 5, md: 0 }}
                        spacing={3}
                    >
                        <SelectItemsDropdown
                            query={usersQuery}
                            placeholder={'Employee'}
                            values={users}
                            setter={setUsers}
                            nameField={'fullName'}
                        />
                        <SelectItemsDropdown
                            query={businessUnitsQuery}
                            placeholder={'Business Unit'}
                            values={businessUnits}
                            setter={setBusinessUnits}
                            nameField={'name'}
                        />
                        <SelectItemsDropdown
                            query={projectsQuery}
                            placeholder={'Project'}
                            values={projects}
                            setter={setProjects}
                            nameField={'name'}
                        />
                        <SelectItemsDropdown
                            query={proposalsQuery}
                            placeholder={'Proposal'}
                            values={proposals}
                            setter={setProposals}
                            nameField={'name'}
                        />
                        <SelectItemsDropdown
                            query={accountsQuery}
                            placeholder={'Account'}
                            values={accounts}
                            setter={setAccounts}
                            nameField={'name'}
                        />

                        <FormLabel>From</FormLabel>
                        <chakra.input
                            borderRadius={5}
                            border={'1px solid lightgray'}
                            w={'full'} p={2}
                            placeholder='Date start'
                            bgColor={'white'}
                            type={'date'}
                            value={from}
                            onChange={onFromChange}
                        />
                        <FormLabel>To</FormLabel>
                        <chakra.input
                            borderRadius={5}
                            border={'1px solid lightgray'}
                            w={'full'} p={2}
                            placeholder='Date start'
                            bgColor={'white'}
                            type={'date'}
                            value={to}
                            onChange={onToChange}
                        />
                    </VStack>
                    <SidePanel query={timetrackItemsQuery} />
                </Stack>
                <Button
                    onClick={onExport}
                    isLoading={exportLoading}
                    disabled={timetrackItemsQuery.isLoading
                        || timetrackItemsQuery.isError
                        || (timetrackItemsQuery.isSuccess && timetrackItemsQuery.data.headers['x-total-count'] === '0')}
                    colorScheme={'green'} w={'full'}
                >
                    Export
                </Button>
                {timetrackItemsQuery.isLoading && <Text>You can use the filters even if the results are loading</Text>}
            </VStack>
        </Center>
    );
}

const selectItemToFilterValues = (items: SelectItem[]) => {
    const values = items.map(item => item.id);
    // The lib that processes the filters before sending them to the API needs empty filters to be undefined
    if (values.length === 0) return undefined; 
    console.log(values);
    return values.toString();
}

export default App;
