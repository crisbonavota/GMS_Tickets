import { Flex, Heading, VStack, Wrap, Text, HStack } from '@chakra-ui/react';
import { getResourceListFilteredAndPaginated, Update } from '@gms-micro/api-utils';
import { TablePaginationWithChakra, TableSingleLegacyUserFilterWithChakra } from '@gms-micro/table-utils';
import { useState, useEffect, useMemo } from 'react';
import TableComponent from './table/table';
import UpdateTypeFilter from './update-type-filter/update-type-filter';
import { useQuery } from 'react-query';
import { CustomFilter, FilterItem } from '@gms-micro/api-filters';
import ExportButton from './export-button/export-button';
import CreateSelectUpdateType from './create-select-update-type/create-select-update-type';
import MonthFilter from './month-filter/month-filter';
import YearFilter from './year-filter/year-filter';

const App = ({ authHeader }: { authHeader: string }) => {
    const [currentPage, setCurrentPage] = useState(0);
    const [updateType, setUpdateType] = useState<string>("");
    const [legacyUser, setLegacyUser] = useState<string>("");
    // index starts at 1 on the backend
    const [month, setMonth] = useState(new Date().getMonth() + 1);
    const [year, setYear] = useState(new Date().getFullYear());

    // Go to first page if any filter changes
    useEffect(() => {
        setCurrentPage(0);
    }, [updateType, legacyUser, month, year]);

    const filters: FilterItem[] = useMemo(() => [
        { field: 'updateTypeId', value: updateType !== "" ? updateType : undefined },
        { field: 'legacyUserId', value: legacyUser !== "" ? legacyUser : undefined }
    ], [legacyUser, updateType]);

    const customFilters: CustomFilter[] = useMemo(() => [
        { name: 'month', value: month },
        { name: 'year', value: year }
    ], [month, year]);

    const updatesQueriesSort = useMemo(() => {
        return {
            field: "date",
            isAscending: false
        }
    }, [legacyUser, updateType]);

    const refetchTriggers = useMemo(() => [
        currentPage, updateType, legacyUser, month, year
    ], [currentPage, updateType, legacyUser, month, year]);

    const updatesQuery = useQuery(
        ['updates', refetchTriggers],
        () => getResourceListFilteredAndPaginated<Update>(
            "updates",
            authHeader,
            filters,
            customFilters,
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
                        <MonthFilter month={month} setMonth={setMonth} />
                        <YearFilter year={year} setYear={setYear} />
                    </Wrap>
                    <HStack mb={{ base: 3, md: 0 }} spacing={5}>
                        <ExportButton authHeader={authHeader} sort={updatesQueriesSort} filters={filters} customFilters={customFilters} refetchTriggers={refetchTriggers} />
                        <CreateSelectUpdateType authHeader={authHeader} />
                    </HStack>
                </Flex>
                {updatesQuery.isLoading && <Text>Loading...</Text>}
                {updatesQuery.isError && <Text>There was an error generating the table, try again later</Text>}
                {updatesQuery.isSuccess && <TableComponent authHeader={authHeader} tableData={updatesQuery.data.data} />}
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
