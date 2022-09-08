import { useAppDispatch } from "../../redux/hooks";
import { changeFilter } from "../../redux/slices/hr-updates";
import Select from "react-select";
import { Text, VStack } from "@chakra-ui/react";

const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
];

const MonthFilter = () => {
    const dispatch = useAppDispatch();

    const setMonth = (value: number) =>
        dispatch({
            type: changeFilter,
            payload: {
                key: "month",
                value,
            },
        });

    const options = months.map((m, _i) => ({ label: m, value: _i }));

    return (
        <VStack w={"full"} alignItems="flex-start">
            <Text fontSize="sm">Month</Text>
            <Select
                options={options}
                onChange={(v: any) => setMonth(v.value)}
                defaultValue={options[new Date().getMonth()]}
                styles={{
                    container: (base) => ({
                        ...base,
                        width: "100%",
                    }),
                }}
            />
        </VStack>
    );
};

export default MonthFilter;
