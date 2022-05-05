import { Flex, Heading, VStack, Wrap, Text, HStack } from '@chakra-ui/react';
import { getResourceListFilteredAndPaginated, Update } from '@gms-micro/api-utils';
import { TableDatesFilterWithChakra, TablePaginationWithChakra, TableSingleLegacyUserFilterWithChakra } from '@gms-micro/table-utils';
import { useState, useEffect, useMemo } from 'react';
import TableComponent from './table/table';
import UpdateTypeFilter from './update-type-filter/update-type-filter';
import { useQuery } from 'react-query';
import CreateModal from './create-modal/create-modal';
import { FilterItem } from '@gms-micro/api-filters';
import ExportButton from './export-button/export-button';
import CreateSelectUpdateType from './create-select-update-type/create-select-update-type';

const App = ({ authHeader }: { authHeader: string }) => {
    const [currentPage, setCurrentPage] = useState(0);
    const [from, setFrom] = useState<string>("");
    const [to, setTo] = useState<string>("");
    const [updateType, setUpdateType] = useState<string>("");
    const [legacyUser, setLegacyUser] = useState<string>("");

    // Go to first page if any filter changes
    useEffect(() => {
        setCurrentPage(0);
    }, [from, to, updateType, legacyUser]);

    const updatesQueriesFilters: FilterItem[] = useMemo(() => [
        { field: 'date_bgr', value: from !== "" ? from : undefined },
        { field: 'endDate_sml', value: to !== "" ? to : undefined },
        { field: 'updateTypeId', value: updateType !== "" ? updateType : undefined },
        { field: 'legacyUserId', value: legacyUser !== "" ? legacyUser : undefined }
    ], [from, to, legacyUser, updateType]);

    const updatesQueriesSort = useMemo(() => {
        return {
            field: "date",
            isAscending: false
        }
    }, [from, to, legacyUser, updateType]);

    const updatesQuery = useQuery(
        // as any so concat don't complay about an array with different data types
        (['updates'] as any).concat(updatesQueriesFilters.map(f => f.value)),
        () => getResourceListFilteredAndPaginated<Update>(
            "updates",
            authHeader,
            updatesQueriesFilters,
            [],
            updatesQueriesSort,
            currentPage
        )
    );

    return (
        <VStack w={'full'} maxW={'full'} p={5}>
            <VStack w={'90%'} spacing={5}>
                <Heading fontSize={'2xl'}>Employees updates</Heading>
                <Flex justifyContent={'space-between'} alignItems={'flex-start'} w={'full'} flexDir={{ base: 'column-reverse', md: 'row' }}>
                    <Wrap w={'full'} spacing={5} justifyContent={'flex-start'} alignItems={'flex-end'}>
                        <TableSingleLegacyUserFilterWithChakra authHeader={authHeader} legacyUser={legacyUser} setLegacyUser={setLegacyUser} isLoading={updatesQuery.isLoading} />
                        <UpdateTypeFilter authHeader={authHeader} updateType={updateType} setUpdateType={setUpdateType} isLoading={updatesQuery.isLoading} />
                        <TableDatesFilterWithChakra isLoading={updatesQuery.isLoading} from={from} to={to} setFrom={setFrom} setTo={setTo} />
                    </Wrap>
                    <HStack mb={{ base: 3, md: 0 }} spacing={5}>
                        <ExportButton authHeader={authHeader} sort={updatesQueriesSort} filters={updatesQueriesFilters} />
                        <CreateSelectUpdateType authHeader={authHeader} />
                    </HStack>
                </Flex>
                {updatesQuery.isLoading && <Text>Loading...</Text>}
                {updatesQuery.isSuccess && <TableComponent authHeader={authHeader} tableData={updatesQuery.data.data} />}
                {updatesQuery.isError && <Text>There was an error generating the table, try again later</Text>}
                <TablePaginationWithChakra
                    isLoading={updatesQuery.isLoading}
                    currentPage={currentPage}
                    setCurrentPage={setCurrentPage}
                    pagesAmountHeader={updatesQuery.data?.headers['pages-amount']}
                />
            </VStack>
        </VStack>
    )
}


export default App
