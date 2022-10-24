import { Button } from "@chakra-ui/react";
import { useAuthHeader } from "react-auth-kit";
import { useQuery } from "react-query";
import { getReportFiltered } from "../../../../api/api";
import { useAppSelector } from "../../../../redux/hooks";
import { downloadFile, generateExcelFileURL } from "../../../../utils/files";


const onExport = (base64?: string) => {
    base64 &&
        downloadFile(
            generateExcelFileURL(base64),
            `gms_projects_report_${new Date(Date.now()).toISOString()}.xlsx`
        );
};

const ExportJobs = () => {
    const getAuthHeader = useAuthHeader();
    const state = useAppSelector((s) => s.projectManagement.jobs.filters);
    const reportQuery = useQuery(
        ["projectReport", state],
        () =>
            getReportFiltered(
                "projects/report",
                getAuthHeader(),
            )
    );

    return (
        <>
            <Button
                color={"white"}
                bgColor={"#FF4500"}
                _hover={{bg: 'FF4500'}}
                w={"full"}
                isLoading={reportQuery.isLoading}
                disabled={reportQuery.isError}
                onClick={() => onExport(reportQuery.data?.data)}
            >
                Export
            </Button>
        </>
    );
};

export default ExportJobs;
