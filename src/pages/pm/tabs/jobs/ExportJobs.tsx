import { Button } from "@chakra-ui/react";
import { useAuthHeader } from "react-auth-kit";
import { useQuery } from "react-query";
import { getReportFiltered } from "../../../../api/api";
import { useAppSelector } from "../../../../redux/hooks";
import { downloadFile, generateExcelFileURL } from "../../../../utils/files";

const translateTypeFilter = (type: { project: boolean; proposal: boolean }) => {
    if (type.project && type.proposal) return undefined;
    if (type.project) return true;
    return false;
};

const onExport = (base64?: string) => {
    base64 &&
        downloadFile(
            generateExcelFileURL(base64),
            `gms_jobs_report_${new Date(Date.now()).toISOString()}.xlsx`
        );
};

const ExportJobs = () => {
    const getAuthHeader = useAuthHeader();
    const state = useAppSelector((s) => s.projectManagement.jobs);
    const reportQuery = useQuery(
        ["projectReport", state.filters, state.sort, state.search],
        () =>
            getReportFiltered(
                "projects/report",
                getAuthHeader(),
                [
                    { field: "name", value: state.search },
                    {
                        field: "proposal.accountId",
                        value: state.filters.account
                    },
                    {
                        field: "client",
                        value: state.filters.client
                    },
                    {
                        field: "sold",
                        value: translateTypeFilter(state.filters.type)
                    },
                    { 
                        field: "active", 
                        value: state.filters.active 
                    },
                ],
                [],
                state.sort
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
