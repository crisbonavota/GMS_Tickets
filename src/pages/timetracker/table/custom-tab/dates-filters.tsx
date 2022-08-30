import { VStack, Heading, Input, Stack } from "@chakra-ui/react";
import { useAppSelector, useAppDispatch } from "../../../../redux/hooks";
import {
    setCustomFiltersStartDate,
    setCustomFiltersEndDate,
} from "../../../../redux/slices/timetrackSlice";

const DatesFilters = () => {
    const { startDate, endDate } = useAppSelector(
        (state) => state.timetrack.table.custom
    );

    const dispatch = useAppDispatch();

    const setStartDate = (startDate: string) => {
        dispatch({
            type: setCustomFiltersStartDate,
            payload: startDate,
        });
    };

    const setEndDate = (endDate: string) => {
        dispatch({
            type: setCustomFiltersEndDate,
            payload: endDate,
        });
    };

    return (
        <VStack alignItems={"flex-start"} spacing={3}>
            <Heading fontSize={"lg"}>Date</Heading>
            <Stack
                flexDir={{ base: "column", md: "row" }}
                direction={{ base: "column", md: "row" }}
            >
                <DatesFilterItem
                    label={"From"}
                    value={startDate}
                    setter={setStartDate}
                />
                <DatesFilterItem
                    label={"To"}
                    value={endDate}
                    setter={setEndDate}
                />
            </Stack>
        </VStack>
    );
};

interface DatesFilterItemProps {
    label: string;
    value: string;
    setter: (value: string) => void;
}

const DatesFilterItem = ({ label, value, setter }: DatesFilterItemProps) => {
    return (
        <VStack alignItems={"flex-start"}>
            <Heading fontSize={"sm"}>{label}</Heading>
            <Input
                type={"date"}
                value={value}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                    setter(e.target.value)
                }
            />
        </VStack>
    );
};

export default DatesFilters;
