import { useAuthHeader } from "react-auth-kit";
import { useQuery } from "react-query";
import { getReportFiltered } from "../../api/api";
import { useAppSelector } from "../../redux/hooks";
import ExportStats from "./ExportStats";
import PopoverExportButton from "./PopoverExportButton";

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
                    { name: "columns", value: state.filters.columns },
                ],
                state.sort
            )
    );

    return (
        <>
            <ExportStats query={reportQuery} />
            <PopoverExportButton
                reportQuery={reportQuery}
            />
        </>
    );
};

export default ExportModule;
