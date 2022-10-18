import { Button } from "@chakra-ui/react";
import { useAuthHeader } from "react-auth-kit";
import { useQuery } from "react-query";
import { getReportFiltered } from "../../api/api";
import { useAppSelector } from "../../redux/hooks";
import { downloadFile, generateExcelFileURL } from "../../utils/files";
import ExportStats from "./ExportStats";

const onExport = (base64?: string) => {
    base64 &&
        downloadFile(
            generateExcelFileURL(base64),
            `gms_timetrack_report_${new Date(Date.now()).toISOString()}.xlsx`
        );
};

const ExportModule = () => {
    const getAuthHeader = useAuthHeader();
    const state = useAppSelector((s) => s.ttReports);
    const reportQuery = useQuery(
        ["timetrackReport", state.filters, state.sort],
        () =>
            getReportFiltered(
                "timetrack/report",
                getAuthHeader(),
                [
                    {
                        field: "date_bgr",
                        value:
                            state.filters.from !== ""
                                ? state.filters.from
                                : undefined,
                    },
                    {
                        field: "date_sml",
                        value:
                            state.filters.to !== ""
                                ? state.filters.to
                                : undefined,
                    },
                    {
                        field: "legacyUserId_OR",
                        value: state.filters.legacyUsers.length
                            ? state.filters.legacyUsers.join(",")
                            : undefined,
                    },
                    {
                        field: "legacyUser.businessUnitId_OR",
                        value: state.filters.businessUnits.length
                            ? state.filters.businessUnits.join(",")
                            : undefined,
                    },
                    {
                        field: "projectId_OR",
                        value: state.filters.projects.length
                            ? state.filters.projects.join(",")
                            : undefined,
                    },

                    {
                        field: "project.proposal.accountId_OR",
                        value: state.filters.accounts.length
                            ? state.filters.accounts.join(",")
                            : undefined,
                    },
                ],
                [
                    {
                        name: "generalSearch",
                        value: state.filters.generalSearch,
                    },
                    { name: "isGiven", value: state.filters.borrowed },
                ],
                state.sort
            )
    );

    return (
        <>
            <ExportStats query={reportQuery} />
            <Button
                colorScheme={"green"}
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

export default ExportModule;
