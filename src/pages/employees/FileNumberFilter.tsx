import { Input, Text, VStack } from "@chakra-ui/react";
import { useAppSelector, useAppDispatch } from "../../redux/hooks";
import { changeFilter } from "../../redux/slices/hr-employees";

const FileNumberFilter = () => {
    const value = useAppSelector((s) => s.hrEmployees.filters.fileNumber);
    const dispatch = useAppDispatch();

    const onChange = (e: React.ChangeEvent<HTMLInputElement>) =>
        dispatch({
            type: changeFilter,
            payload: {
                key: "fileNumber",
                value: e.target.value,
            },
        });

    return (
        <VStack alignItems={"flex-start"} w={"full"}>
            <Text fontSize={"sm"}>File Number</Text>
            <Input
                type={"number"}
                bgColor="white"
                value={value ? value : undefined}
                onChange={onChange}
                w={"full"}
            />
        </VStack>
    );
};

export default FileNumberFilter;
