import { VStack, Text } from "@chakra-ui/react";
import Select from "react-select";
import { useAppDispatch } from "../../../redux/hooks";
import { changeFilter } from "../../../redux/slices/hr";

const currentYear = new Date().getFullYear();
const last10Years = new Array(10)
    .fill(0)
    .map((_, index) => (currentYear + 1) - index);

const YearFilter = () => {
    const options = last10Years.map((year) => ({
        label: year,
        value: year,
    }));

    const dispatch = useAppDispatch();
    const setYear = (value: number) =>
        dispatch({
            type: changeFilter,
            payload: {
                module: "trainings",
                value: {
                    key: "year",
                    value,
                }, 
            },
        });

    return (
        <VStack alignItems={"flex-start"} w={"full"}>
            <Text fontSize={"sm"}>Start Date Year</Text>
            <Select
                options={options}
                onChange={(v: any) => setYear(v.value)}
                defaultValue={options[1]}
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

export default YearFilter;
