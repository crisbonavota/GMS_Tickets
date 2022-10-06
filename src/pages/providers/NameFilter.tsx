import { Input, Text, VStack } from "@chakra-ui/react";
import { useAppSelector, useAppDispatch } from "../../redux/hooks";
import { changeFilter } from "../../redux/slices/hr-providers";

const NameFilter = () => {
    const value = useAppSelector((s) => s.hrProviders.filters.fullName);
    const dispatch = useAppDispatch();

    const onChange = (e: React.ChangeEvent<HTMLInputElement>) =>
        dispatch({
            type: changeFilter,
            payload: {
                key: "fullName",
                value: e.target.value,
            },
        });

    return (
        <VStack alignItems={"flex-start"} w={"full"}>
            <Text fontSize={"sm"}>Name</Text>
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

export default NameFilter;
