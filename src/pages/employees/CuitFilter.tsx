import { Input, Text, VStack } from "@chakra-ui/react";
import { useAppSelector, useAppDispatch } from "../../redux/hooks";
import { changeFilter } from "../../redux/slices/hr-employees";

const CuitFilter = () => {
    const value = useAppSelector((s) => s.hrEmployees.filters.afipId);
    const dispatch = useAppDispatch();

    const onChange = (e: React.ChangeEvent<HTMLInputElement>) =>
        dispatch({
            type: changeFilter,
            payload: {
                key: "afipId",
                value: e.target.value,
            },
        });

    return (
        <VStack alignItems={"flex-start"} w={"full"}>
            <Text fontSize={"sm"}>CUIT</Text>
            <Input
                type={"text"}
                bgColor="white"
                value={value}
                onChange={onChange}
                w={"full"}
            />
        </VStack>
    );
};

export default CuitFilter;
