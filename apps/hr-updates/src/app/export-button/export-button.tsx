import { VStack, IconButton, Text } from '@chakra-ui/react'
import { FilterItem, Sort } from '@gms-micro/api-filters';
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
    sort: Sort
}

const ExportButton = ({ filters, authHeader, sort }: ExportButtonProps) => {
    const reportQuery = useQuery(
        // as any so concat don't complay about an array with different data types
        (['updatesReport'] as any).concat(filters.map(f => f.value)),
        () => getReportFiltered(
            "updates/report",
            authHeader,
            filters,
            [],
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
