import { Button } from '@chakra-ui/react'
import { CustomFilter, FilterItem } from '@gms-micro/api-filters'
import { getReportFiltered } from '@gms-micro/api-utils'
import { downloadFile, generateExcelFileURL } from '@gms-micro/files-utils'
import { useQuery } from 'react-query'
import ExportStats from '../export-stats/export-stats'

const onExport = (base64?: string) => {
    base64 && downloadFile(generateExcelFileURL(base64), `gms_timetrack_report_${new Date(Date.now()).toISOString()}.xlsx`);
};

type Props = {
    authHeader: string,
    filters: FilterItem[],
    customFilters: CustomFilter[],
    refetch: any[]
}

const ExportModule = ({ authHeader, filters, customFilters, refetch }: Props) => {
    const reportQuery = useQuery(
        ['timetrackReport', refetch],
        () => getReportFiltered(
            "timetrack/report",
            authHeader,
            filters,
            customFilters)
    );

    return (
        <>
            <ExportStats query={reportQuery} />
            <Button
                colorScheme={'green'}
                w={'full'}
                isLoading={reportQuery.isLoading}
                disabled={reportQuery.isError}
                onClick={() => onExport(reportQuery.data?.data)}
            >
                Export
            </Button>
        </>
    )
}

export default ExportModule
