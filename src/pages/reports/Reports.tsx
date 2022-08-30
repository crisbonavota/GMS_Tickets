import { Text, VStack } from "@chakra-ui/react";
import { useMemo } from "react";
import { useAuthHeader } from "react-auth-kit";
import { useQuery } from "react-query";
import { getResourceListFilteredAndPaginated } from "../../api/api";
import { TimetrackItem } from "../../api/types";
import DatesFilters from "./DatesFilters";
import DropdownFilters from "./DropdownFilters";
import ExportModule from "./ExportModule";
import TableComponent from "./TableComponent";
import { useAppSelector, useAppDispatch } from "../../redux/hooks";
import { changeTotalPages } from "../../redux/slices/tt-reports";
import BorrowedFilter from "./BorrowedFilter";
import GeneralSearchFilter from "./GeneralSearchFilter";
import { parseTotalPagesHeader } from "../../utils/query";

const Reports = () => {
    const getAuthHeader = useAuthHeader();
    const state = useAppSelector((s) => s.ttReports);
    const dispatch = useAppDispatch();

    const setTotalPages = (value: number | null) =>
        dispatch({
            type: changeTotalPages,
            payload: value,
        });

    const {
        isSuccess,
        isLoading,
        isError,
        data: axiosRes,
    } = useQuery(
        ["timetrack", state],
        () =>
            getResourceListFilteredAndPaginated<TimetrackItem>(
                "timetrack",
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
                state.sort,
                state.pagination.currentPage
            ),
        {
            onSuccess: (res) =>
                parseTotalPagesHeader(
                    setTotalPages,
                    res.headers["pages-amount"]
                ),
        }
    );

    const timetrackItems = useMemo(
        () => (isSuccess ? axiosRes.data : []),
        [isSuccess, axiosRes]
    );

    return (
        <VStack w={"full"} p={5}>
            <VStack w={"90%"} spacing={5}>
                <VStack w={"full"} spacing={5} alignItems={"flex-start"}>
                    <DatesFilters />
                    <GeneralSearchFilter />
                    <BorrowedFilter />
                    <DropdownFilters />
                    <ExportModule />
                </VStack>
                {isLoading && <Text>Loading...</Text>}
                {isError && <Text>Error</Text>}
                {isSuccess && <TableComponent data={timetrackItems} />}
            </VStack>
        </VStack>
    );
};
export default Reports;
