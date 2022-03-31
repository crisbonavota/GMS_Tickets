import { useEffect, useState } from 'react';
import { getAuthHeader } from '@gms-micro/auth-methods';
import { HStack, Select, Center, VStack, chakra, FormLabel, Text, Heading, Button, Skeleton, Stack } from '@chakra-ui/react';
import { useQuery, UseQueryResult } from 'react-query';
import { getLegacyUsers, getBusinessUnits, getProjects, getProposals, getAccounts, getTimetrackItemsReport, downloadFile, generateExcelFileURL } from './api';
import { AxiosResponse } from 'axios';

export function App() {
    const [authHeader, setAuthHeader] = useState("");
    const [user, setUser] = useState<number>();
    const [businessUnit, setBusinessUnit] = useState<number>();
    const [project, setProject] = useState<number>();
    const [proposal, setProposal] = useState<number>();
    const [account, setAccount] = useState<number>();

    const onExport = () => {
        timetrackItemsQuery.isSuccess && downloadFile(generateExcelFileURL(timetrackItemsQuery.data?.data), `gms_report_${new Date(Date.now()).toISOString()}.xlsx`);
    }

    useEffect(() => {
        const queryAuthHeader = getAuthHeader('reports');
        setAuthHeader(queryAuthHeader);
    }, []);

    const usersQuery = useQuery(['users'], () =>
        getLegacyUsers(authHeader), { retry: 2, retryDelay: 500 });

    const businessUnitsQuery = useQuery(['businessUnits'], () =>
        getBusinessUnits(authHeader), { retry: 2, retryDelay: 500 });

    const projectsQuery = useQuery(['projects'], () =>
        getProjects(authHeader), { retry: 2, retryDelay: 500 });

    const proposalsQuery = useQuery(['proposals'], () =>
        getProposals(authHeader), { retry: 2, retryDelay: 500 });

    const accountsQuery = useQuery(['accounts'], () =>
        getAccounts(authHeader), { retry: 2, retryDelay: 500 });

    const timetrackItemsQuery = useQuery(
        ['timetrackItems', user, businessUnit, project, proposal, account],
        () => getTimetrackItemsReport(
            authHeader,
            [
                {
                    field: 'userId',
                    value: user
                },
                {
                    field: 'user.businessUnitId',
                    value: businessUnit
                },
                {
                    field: 'projectId',
                    value: project
                },
                {
                    field: 'project.proposalId',
                    value: proposal
                },
                {
                    field: 'project.proposal.accountId',
                    value: account
                },
            ])
    );

    return (
        <Center w={'full'} minH={'100vh'} bgColor={'whitesmoke'}>
            <VStack
                w={{ base: 'full', md: '75%' }}
                spacing={5}
                px={{ base: 5, md: 0 }}
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
                    >
                        <SelectItem query={usersQuery} placeholder={'Employee'} value={user} setter={setUser} nameField={'fullName'} />
                        <SelectItem query={businessUnitsQuery} placeholder={'Business Unit'} value={businessUnit} setter={setBusinessUnit} nameField={'name'} />
                        <SelectItem query={projectsQuery} placeholder={'Project'} value={project} setter={setProject} nameField={'name'} />
                        <SelectItem query={proposalsQuery} placeholder={'Proposal'} value={proposal} setter={setProposal} nameField={'name'} />
                        <SelectItem query={accountsQuery} placeholder={'Account'} value={account} setter={setAccount} nameField={'name'} />

                        <FormLabel>From</FormLabel>
                        <chakra.input
                            borderRadius={5}
                            border={'1px solid lightgray'}
                            w={'full'} p={2}
                            placeholder='Date start'
                            bgColor={'white'}
                            type={'date'}
                        />
                        <FormLabel>To</FormLabel>
                        <chakra.input
                            borderRadius={5}
                            border={'1px solid lightgray'}
                            w={'full'} p={2}
                            placeholder='Date start'
                            bgColor={'white'}
                            type={'date'}
                        />
                    </VStack>
                    <SidePanel query={timetrackItemsQuery} />
                </Stack>
                <Button onClick={onExport} disabled={timetrackItemsQuery.isLoading} colorScheme={'green'} w={'full'}>Export</Button>
                {timetrackItemsQuery.isLoading && <Text>You can use the filters even if it's loading</Text>}
            </VStack>
        </Center>
    );
}

interface SelectItemProps {
    placeholder: string,
    value?: number,
    setter: (value?: number) => void,
    query: UseQueryResult<AxiosResponse<any[], any>, unknown>,
    nameField: string
}

const SelectItem = ({ placeholder, setter, query, value, nameField }: SelectItemProps) => {
    const onSelectChange = (e: React.ChangeEvent<HTMLSelectElement>, setter: (value?: number) => void) => {
        if (e.target.value) setter(parseInt(e.target.value));
        else setter(undefined);
    }

    return (
        <>
            {query.isLoading && <Skeleton h={'40px'} w={'full'} />}
            {query.isSuccess && query.data &&
                <Select
                    placeholder={placeholder}
                    bgColor={'white'}
                    disabled={query.isLoading || query.isError}
                    value={value}
                    onChange={(e) => onSelectChange(e, setter)}
                >
                    {query.data.data.map(e =>
                        <option key={e.id} value={e.id}>
                            {e[nameField]}
                        </option>)}
                </Select>}
        </>
    )
}

interface SidePanelProps {
    query: UseQueryResult<AxiosResponse<string, any>, unknown>
}

const SidePanel = ({ query }: SidePanelProps) => {
    return (
        <>
            <VStack alignItems={'flex-start'} spacing={5} w={{ base: '100%', md: '50%' }} h={'full'}>
                {query.isSuccess &&
                    <>
                        <HStack>
                            <Heading>{query.data.headers['x-total-count']}</Heading>
                            <Text>items with current filters</Text>
                        </HStack>
                        <HStack>
                            <Heading>{query.data.headers['total-hours']}</Heading>
                            <Text>hours with current filters</Text>
                        </HStack>
                        <HStack>
                            <Heading>
                                {/* Capping the export to 25000 rows */}
                                {parseInt(query.data.headers['x-total-count']) > 25000
                                    ? 25000 : parseInt(query.data.headers['x-total-count'])}
                            </Heading>
                            <Text>rows exported with current filters</Text>
                        </HStack>
                        {parseInt(query.data.headers['x-total-count']) > 25000 &&
                            <Text fontSize={'sm'}>We limit the rows of the export to 25k to ensure reasonable waiting times</Text>}
                    </>}
                {query.isLoading && [...Array(3)].map((v, i) => <Skeleton key={i} h={'50px'} w={'full'} />)}
            </VStack>
        </>
    )
}

export default App;
