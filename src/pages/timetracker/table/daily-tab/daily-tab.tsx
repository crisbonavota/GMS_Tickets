import { VStack, HStack, Text, Heading, Skeleton } from "@chakra-ui/react";
import { useMemo } from "react";
import { useQuery } from "react-query";
import { GrNext, GrPrevious } from "react-icons/gr";
import { useAuthHeader } from "react-auth-kit";
import TableRow from "../table-row/table-row";
import { IconButton } from "@chakra-ui/react";
import { getResourceListFilteredAndPaginated } from "../../../../api/api";
import { TimetrackItem } from "../../../../api/types";
import { useAppDispatch, useAppSelector } from "../../../../redux/hooks";
import { setTableDailyDate } from "../../../../redux/slices/timetrackSlice";
import {
    hoursToHHMMstring,
    momentToLocaleMoment,
    momentToLocaleDateString,
} from "../../../../utils/datetime";

const DailyTab = () => {
    const dispatch = useAppDispatch();
    const getAuthHeader = useAuthHeader();

    const dailyDate = useAppSelector(
        (state) => state.timetrack.table.daily.date
    );

    const {
        isSuccess,
        isLoading,
        data: axiosResponse,
    } = useQuery(["owned-daily", dailyDate], () =>
        getResourceListFilteredAndPaginated<TimetrackItem>(
            "timetrack/owned",
            getAuthHeader(),
            [
                {
                    field: "date_date",
                    value: dailyDate.format("YYYY-MM-DD"),
                },
            ],
            [],
            undefined,
            0,
            100
        )
    );

    const totalHoursHeader = useMemo(
        () => axiosResponse?.headers["total-hours"],
        [axiosResponse]
    );

    const totalHoursMinutes = useMemo(
        () =>
            isSuccess && totalHoursHeader
                ? hoursToHHMMstring(totalHoursHeader)
                : null,
        [isSuccess, totalHoursHeader]
    );

    const onPreviousDayClick = () => {
        dispatch({
            type: setTableDailyDate,
            payload: dailyDate.clone().subtract(1, "days"),
        });
    };

    const onNextDayClick = () => {
        dispatch({
            type: setTableDailyDate,
            payload: dailyDate.clone().add(1, "days"),
        });
    };

    return (
        <VStack w={"full"} spacing={5} h={"full"}>
            <HStack
                justifyContent={"space-between"}
                w={"full"}
                bgColor={"white"}
                p={3}
            >
                <IconButton
                    icon={<GrPrevious />}
                    onClick={onPreviousDayClick}
                    aria-label="Previous day"
                    variant={"ghost"}
                />
                <HStack justifyContent={"space-between"} w={"full"} px={3}>
                    <Text as={"span"}>
                        {momentToLocaleMoment(dailyDate)
                            .format("ddd")
                            .toUpperCase()}{" "}
                        - {momentToLocaleDateString(dailyDate)}
                    </Text>
                    {(isLoading || !totalHoursMinutes) && (
                        <Skeleton width={"50px"} height={"20px"} />
                    )}
                    {totalHoursMinutes && (
                        <Heading fontSize={"md"}>{totalHoursMinutes}</Heading>
                    )}
                </HStack>
                <IconButton
                    icon={<GrNext />}
                    aria-label="Next day"
                    onClick={onNextDayClick}
                    variant={"ghost"}
                />
            </HStack>
            <VStack
                w={"full"}
                spacing={"0"}
                maxH={{ base: "35vh", md: "40vh" }}
                overflowY={"auto"}
            >
                {isLoading && <Loading />}
                {isSuccess && axiosResponse && (
                    <>
                        {axiosResponse.data.map((item, index) => (
                            <TableRow index={index} item={item} key={item.id} />
                        ))}
                        {!axiosResponse.data.length && (
                            <Text>No hours found for this day</Text>
                        )}
                    </>
                )}
            </VStack>
        </VStack>
    );
};

const Loading = () => {
    return (
        <VStack w={"full"} spacing={0}>
            {Array.from(Array(4).keys()).map((_i, index) => (
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

export default DailyTab;
