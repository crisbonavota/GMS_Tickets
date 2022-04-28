import { Heading, Text, VStack, Wrap, IconButton, Flex } from '@chakra-ui/react';
import { useQuery } from "react-query";
import { generateReport, getUpdates } from '../api';
import TableComponent from "./table/table";
import { useState, useEffect } from 'react';
import UpdateTypeFilter from './update-type-filter/update-type-filter';
import { FaFileExport } from 'react-icons/fa';
import { downloadFile, generateExcelFileURL } from '@gms-micro/api-utils';
import { TablePaginationWithChakra, TableDatesFilterWithChakra, TableSingleLegacyUserFilterWithChakra } from '@gms-micro/table-utils';

const onExport = (isSuccess: boolean, base64?: string) => {
    isSuccess && base64 && downloadFile(generateExcelFileURL(base64), `gms_updates_report_${new Date(Date.now()).toISOString()}.xlsx`);
}

const App = ({ authHeader }: { authHeader: string }) => {
    return (
        <VStack w={'full'} maxW={'full'} p={5}>
            
        </VStack>
    )
}

export default App
