import {
    VStack,
    Skeleton,
    Text,
    Link,
    HStack,
    Heading,
} from "@chakra-ui/react";
import moment from "moment";
import { useQuery } from "react-query";
import { useMemo } from "react";
import { useAuthHeader } from "react-auth-kit";
import TableRow from "../table-row/table-row";
import { getResourceListFilteredAndPaginated } from "../../../../api/api";
import { TimetrackItem } from "../../../../api/types";
import { useAppDispatch, useAppSelector } from "../../../../redux/hooks";
import {
    clearCustomFilters,
    setCustomFiltersPage,
    setCustomFiltersTotalPages,
} from "../../../../redux/slices/timetrackSlice";
import { hoursToHHMMstring } from "../../../../utils/datetime";
import DynamicTablePagination from "../../../../components/DynamicTable/DynamicTablePagination";
import { parseTotalPagesHeader } from "../../../../utils/query";

const CustomTab = () => {
    const dispatch = useAppDispatch();
    const getAuthHeader = useAuthHeader();
    const { startDate, endDate, project, page, totalPages } = useAppSelector(
        (state) => state.timetrack.table.custom
    );

    const {
        isLoading,
        isSuccess,
        data: axiosResponse,
    } = useQuery(
        ["owned-custom", startDate, endDate, page, project],
        () =>
            getResourceListFilteredAndPaginated<TimetrackItem>(
                "timetrack/owned",
                getAuthHeader(),
                [
                    {
                        field: "date_bgr",
                        value:
                            startDate !== ""
                                ? moment(startDate).format("YYYY-MM-DD")
                                : undefined,
                    },
                    {
                        field: "date_sml",
                        value:
                            endDate !== ""
                                ? moment(endDate).format("YYYY-MM-DD")
                                : undefined,
                    },
                    {
                        field: "projectId",
                        value: project ? project : undefined,
                    },
                ],
                [],
                { field: "date", isAscending: false },
                page,
                5
            ),
        {
            onSuccess: (r) =>
                parseTotalPagesHeader(setTotalPages, r.headers["pages-amount"]),
        }
    );

    const totalHours = useMemo(
        () =>
            isSuccess && axiosResponse
                ? parseInt(axiosResponse.headers["total-hours"])
                : 0,
        [axiosResponse, isSuccess]
    );

    const clearFilters = () => {
        dispatch({
            type: clearCustomFilters,
        });
    };

    const setPage = (value: number) => {
        dispatch({
            type: setCustomFiltersPage,
            payload: value,
        });
    };

    const setTotalPages = (value: number | null) => {
        dispatch({
            type: setCustomFiltersTotalPages,
            payload: value,
        });
    };

    return (
        <VStack w={"full"} spacing={5}>
            <HStack w={"full"} justifyContent={"space-between"}>
                {isLoading && <Skeleton h={"20px"} w={"3rem"} />}
                {isSuccess && (
                    <Heading fontSize={"lg"}>
                        {hoursToHHMMstring(totalHours)} total
                    </Heading>
                )}
                <Link ms={"auto"} color={"steelblue"} onClick={clearFilters}>
                    Clear filters
                </Link>
            </HStack>
            {isLoading && <Loading />}
            {isSuccess && (
                <>
                    <VStack
                        w={"full"}
                        spacing={0}
                        maxH={{ base: "35vh", md: "40vh" }}
                        overflowY={"auto"}
                    >
                        {axiosResponse?.data.map((item, index) => (
                            <TableRow
                                key={item.id}
                                index={index}
                                item={item}
                                withDay
                            />
                        ))}
                    </VStack>
                    {!axiosResponse?.data.length && (
                        <Text>No hours found for this filter</Text>
                    )}
                </>
            )}
            <DynamicTablePagination
                page={page}
                setPage={setPage}
                totalPages={totalPages}
            />
        </VStack>
    );
};

const Loading = () => {
    return (
        <VStack w={"full"} spacing={0}>
            {Array.from(Array(5).keys()).map((item, index) => (
                <Skeleton
                    key={index}
                    w={"full"}
                    h={"5rem"}
                    startColor={index % 2 ? "white" : "#F6ECD4"}
                    endColor={index % 2 ? "#F6ECD4" : "white"}
                />
            ))}
        </VStack>
    );
};

export default CustomTab;
