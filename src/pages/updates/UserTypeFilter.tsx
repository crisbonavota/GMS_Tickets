import { useAppDispatch } from "../../redux/hooks";
import { changeFilter } from "../../redux/slices/hr-updates";
import Select from "react-select";
import { Text, VStack } from "@chakra-ui/react";

const UserTypeFilter = () => {
    const dispatch = useAppDispatch();

    const setUserType = (value: "employee" | "provider") =>
        dispatch({
            type: changeFilter,
            payload: {
                key: "userType",
                value,
            },
        });

    return (
        <VStack w={"full"} alignItems="flex-start">
            <Text fontSize="sm">User type</Text>
            <Select
                options={[
                    { label: "Employees", value: "employee" },
                    { label: "Providers", value: "provider" },
                ]}
                onChange={(v: any) => setUserType(v.value)}
                defaultValue={{ label: "Employees", value: "employee" }}
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

export default UserTypeFilter;
