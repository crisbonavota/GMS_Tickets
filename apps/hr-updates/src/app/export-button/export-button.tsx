import { VStack, IconButton, Text } from '@chakra-ui/react'
import { CustomFilter, FilterItem, Sort } from '@gms-micro/api-filters';
import { getReportFiltered } from '@gms-micro/api-utils';
import { downloadFile, generateExcelFileURL } from '@gms-micro/files-utils';
import { FaFileExport } from 'react-icons/fa'
import { useQuery } from 'react-query';

const onExport = (isSuccess: boolean, base64?: string) => {
    isSuccess && base64 && downloadFile(generateExcelFileURL(base64), `gms_updates_report_${new Date(Date.now()).toISOString()}.xlsx`);
}

export interface ExportButtonProps {
    filters: FilterItem[],
    authHeader: string,
    sort: Sort,
    customFilters: CustomFilter[],
    refetchTriggers: any[]
}

const ExportButton = ({ filters, authHeader, sort, refetchTriggers, customFilters }: ExportButtonProps) => {
    const reportQuery = useQuery(
        ['updatesReport', refetchTriggers],
        () => getReportFiltered(
            "updates/report",
            authHeader,
            filters,
            customFilters,
            sort
        )
    );

    return (
        <VStack>
            <Text fontSize={'sm'}>Export</Text>
            <IconButton
                icon={<FaFileExport />}
                size={'lg'}
                aria-label="Export"
                colorScheme={'blue'}
                isLoading={reportQuery.isLoading}
                disabled={reportQuery.isError}
                onClick={() => onExport(reportQuery.isSuccess, reportQuery.data?.data)}
            />
        </VStack>
    )
}

export default ExportButton
