import { Input, Text, VStack, Flex } from "@chakra-ui/react";
import moment from "moment";
import { useAppSelector, useAppDispatch } from "../../redux/hooks";
import { changeFilter } from "../../redux/slices/tt-reports";

const DatesFilters = () => {
    const state = useAppSelector((s) => s.ttReports.filters);
    const from = state.from;
    const to = state.to;
    const dispatch = useAppDispatch();

    const onFromChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        dispatch({
            type: changeFilter,
            payload: {
                key: "from",
                value: e.target.value,
            },
        });
        if (to !== "" && moment(e.target.value).isAfter(moment(to))) {
            dispatch({
                type: changeFilter,
                payload: {
                    key: "to",
                    value: "",
                },
            });
        }
    };

    const onToChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        dispatch({
            type: changeFilter,
            payload: {
                key: "to",
                value: e.target.value,
            },
        });
        if (from !== "" && moment(e.target.value).isBefore(moment(from))) {
            dispatch({
                type: changeFilter,
                payload: {
                    key: "from",
                    value: "",
                },
            });
        }
    };

    return (
        <Flex w={"full"} flexDir={["column", "row"]} gap={3}>
            <VStack flex={1} alignItems={"flex-start"}>
                <Text fontSize={"sm"}>From</Text>
                <Input
                    type={"date"}
                    bgColor={"white"}
                    w={"full"}
                    value={from}
                    onChange={onFromChange}
                />
            </VStack>
            <VStack flex={1} alignItems={"flex-start"}>
                <Text fontSize={"sm"}>To</Text>
                <Input
                    type={"date"}
                    bgColor={"white"}
                    w={"full"}
                    value={to}
                    onChange={onToChange}
                />
            </VStack>
        </Flex>
    );
};

export default DatesFilters;
