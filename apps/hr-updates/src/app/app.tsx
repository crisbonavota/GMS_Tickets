import { Flex, Heading, IconButton, VStack, Wrap, Text } from '@chakra-ui/react';
import { getReportFiltered, getResourceListFilteredAndPaginated, Update } from '@gms-micro/api-utils';
import { downloadFile, generateExcelFileURL } from '@gms-micro/files-utils';
import { TableDatesFilterWithChakra, TablePaginationWithChakra, TableSingleLegacyUserFilterWithChakra } from '@gms-micro/table-utils';
import { useState, useEffect } from 'react';
import TableComponent from './table/table';
import UpdateTypeFilter from './update-type-filter/update-type-filter';
import { useQuery } from 'react-query';
import { FaFileExport } from 'react-icons/fa';

const onExport = (isSuccess: boolean, base64?: string) => {
    isSuccess && base64 && downloadFile(generateExcelFileURL(base64), `gms_updates_report_${new Date(Date.now()).toISOString()}.xlsx`);
}

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

    const updatesQueriesFilters = [
        { field: 'date_bgr', value: from !== "" ? from : undefined },
        { field: 'endDate_sml', value: to !== "" ? to : undefined },
        { field: 'updateTypeId', value: updateType !== "" ? updateType : undefined },
        { field: 'legacyUserId', value: legacyUser !== "" ? legacyUser : undefined }
    ];

    const updatesQueriesSort = { field: "date", isAscending: false };

    const updatesQuery = useQuery(
        ['updates', currentPage, from, to, updateType, legacyUser],
        () => getResourceListFilteredAndPaginated<Update>(
            "updates",
            authHeader,
            updatesQueriesFilters,
            [],
            updatesQueriesSort,
            currentPage
        )
    );

    const reportQuery = useQuery(
        ['updatesReport', from, to, updateType, legacyUser],
        () => getReportFiltered(
            "updates/report",
            authHeader,
            updatesQueriesFilters,
            [],
            updatesQueriesSort
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
                    <VStack mb={{ base: 3, md: 0 }}>
                        <Text fontSize={'sm'}>Export</Text>
                        <IconButton
                            icon={<FaFileExport />}
                            size={'lg'}
                            aria-label="Export"
                            colorScheme={'green'}
                            isLoading={reportQuery.isLoading}
                            disabled={reportQuery.isError}
                            onClick={() => onExport(reportQuery.isSuccess, reportQuery.data?.data)}
                        />
                    </VStack>
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
