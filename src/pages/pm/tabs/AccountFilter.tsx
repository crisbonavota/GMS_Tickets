import AsyncSelect from "react-select/async";
import { useAuthHeader } from "react-auth-kit";
import { VStack, Text } from "@chakra-ui/react";
import { SingleValue } from "react-select";
import { getResourceListFilteredAndPaginated } from "../../../api/api";
import { Account } from "../../../api/types";

interface Props {
    setter: (value: number | null) => void;
}

const AccountFilter = ({ setter }: Props) => {
    const getAuthHeader = useAuthHeader();
    const getOptions = async (input: string) => {
        const res = await getResourceListFilteredAndPaginated<Account>(
            "accounts",
            getAuthHeader(),
            [{ field: "name", value: input }],
            [],
            { field: "name", isAscending: true }
        );
        return res.data.map((c) => ({
            label: c.name,
            value: c.id,
        }));
    };

    const onChange = (
        client: SingleValue<{ label: string; value: number }>
    ) => {
        setter(client ? client.value : null);
    };

    return (
        <VStack w={"full"} alignItems={"flex-start"}>
            <Text>Account</Text>
            <AsyncSelect
                placeholder="Type for results..."
                cacheOptions
                loadOptions={getOptions}
                isClearable
                styles={{
                    container: (base) => ({
                        ...base,
                        width: "100%",
                    }),
                }}
                noOptionsMessage={(props) =>
                    props.inputValue !== ""
                        ? "No results found, try different keywords"
                        : "Start typing to search for accounts"
                }
                onChange={onChange}
            />
        </VStack>
    );
};

export default AccountFilter;
