import { Heading, Text, VStack, Wrap, IconButton, Flex } from '@chakra-ui/react';
import { useQuery } from "react-query";
import { generateReport, getUpdates } from '../api';
import TableComponent from "./table/table";
import { useState, useEffect } from 'react';
import TablePagination from './table-pagination/table-pagination';
import TableDatesFilter from './table-dates-filter/table-dates-filter';
import UpdateTypeFilter from './update-type-filter/update-type-filter';
import LegacyUserFilter from './legacy-user-filter/legacy-user-filter';
import { FaFileExport } from 'react-icons/fa';
import { downloadFile, generateExcelFileURL } from '@gms-micro/api-utils';

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
    }, [from, to, updateType, legacyUser])

    const updatesQuery = useQuery(
        ['updates', currentPage, from, to, updateType, legacyUser],
        () => getUpdates(
            authHeader,
            [
                { field: 'date_bgr', value: from !== "" ? from : undefined },
                { field: 'endDate_sml', value: to !== "" ? to : undefined },
                { field: 'updateTypeId', value: updateType !== "" ? updateType : undefined },
                { field: 'legacyUserId', value: legacyUser !== "" ? legacyUser : undefined }
            ],
            [],
            undefined,
            currentPage)
    );

    const reportQuery = useQuery(
        ['updatesReport', from, to, updateType, legacyUser],
        () => generateReport(
            authHeader,
            [
                { field: 'date_bgr', value: from !== "" ? from : undefined },
                { field: 'endDate_sml', value: to !== "" ? to : undefined },
                { field: 'updateTypeId', value: updateType !== "" ? updateType : undefined },
                { field: 'legacyUserId', value: legacyUser !== "" ? legacyUser : undefined }
            ],
            [],
            undefined)
    );

    return (
        <VStack w={'full'} maxW={'full'} p={5}>
            <VStack w={'90%'} spacing={5}>
                <Heading fontSize={'2xl'}>Employees updates</Heading>
                <Flex justifyContent={'space-between'} alignItems={'flex-start'} w={'full'} flexDir={{ base: 'column-reverse', md: 'row' }}>
                    <Wrap w={'full'} spacing={5} justifyContent={'flex-start'} alignItems={'flex-end'}>
                        <LegacyUserFilter authHeader={authHeader} legacyUser={legacyUser} setLegacyUser={setLegacyUser} isLoading={updatesQuery.isLoading} />
                        <UpdateTypeFilter authHeader={authHeader} updateType={updateType} setUpdateType={setUpdateType} isLoading={updatesQuery.isLoading} />
                        <TableDatesFilter isLoading={updatesQuery.isLoading} from={from} to={to} setFrom={setFrom} setTo={setTo} />
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
                {updatesQuery.isSuccess && <TableComponent tableData={updatesQuery.data.data} />}
                {updatesQuery.isError && <Text>There was an error generating the table, try again later</Text>}
                <TablePagination
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