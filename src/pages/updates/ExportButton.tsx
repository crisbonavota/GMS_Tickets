import { VStack, IconButton, Text } from "@chakra-ui/react";
import { useAuthHeader } from "react-auth-kit";
import { FaFileExport } from "react-icons/fa";
import { useQuery } from "react-query";
import { getReportFiltered } from "../../api/api";
import { downloadFile, generateExcelFileURL } from "../../utils/files";
import { useAppSelector } from "../../redux/hooks";

const onExport = (isSuccess: boolean, base64?: string) => {
    isSuccess &&
        base64 &&
        downloadFile(
            generateExcelFileURL(base64),
            `gms_updates_report_${new Date(Date.now()).toISOString()}.xlsx`
        );
};

const ExportButton = () => {
    const state = useAppSelector((s) => s.hrUpdates);
    const getAuthHeader = useAuthHeader();
    const {
        isLoading,
        isSuccess,
        data: report,
        isError,
    } = useQuery(
        ["updatesReport", state.sort, state.filters],
        () =>
            getReportFiltered(
                "updates/report",
                getAuthHeader(),
                [
                    {
                        field: "updateTypeId",
                        value: state.filters.updateTypeId,
                    },
                    {
                        field: "legacyUserId",
                        value: state.filters.legacyUserId,
                    },
                ],
                [
                    {
                        name: "month",
                        // api months index starts at 1, but JS months index starts at 0
                        value: state.filters.month + 1,
                    },
                    {
                        name: "year",
                        value: state.filters.year,
                    },
                    {
                        name: "userType",
                        value: state.filters.userType,
                    },
                ],
                state.sort
            ),
        { select: (r) => r.data }
    );

    return (
        <VStack>
            <Text fontSize={"sm"}>Export</Text>
            <IconButton
                icon={<FaFileExport />}
                size={"lg"}
                aria-label="Export"
                colorScheme={"blue"}
                isLoading={isLoading}
                disabled={isError}
                onClick={() => onExport(isSuccess, report)}
            />
        </VStack>
    );
};

export default ExportButton;
