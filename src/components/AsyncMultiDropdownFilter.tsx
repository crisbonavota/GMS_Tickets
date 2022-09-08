import { VStack, Text } from "@chakra-ui/react";
import { useAuthHeader } from "react-auth-kit";
import { MultiValue } from "react-select";
import AsyncSelect from "react-select/async";
import { getResourceListFilteredAndPaginated } from "../api/api";

interface Props {
    setter: (value: number[]) => void;
    resource: string;
    nameProp: string;
    valueProp: string;
    label?: string;
    placeholder?: string;
}

const AsyncMultiDropdownFilter = ({
    setter,
    resource,
    nameProp,
    valueProp,
    label,
    placeholder,
}: Props) => {
    const getAuthHeader = useAuthHeader();
    const getOptions = async (input: string) => {
        const res = await getResourceListFilteredAndPaginated<any>(
            resource,
            getAuthHeader(),
            [{ field: nameProp, value: input }],
            [],
            { field: nameProp, isAscending: true }
        );
        return res.data.map((c) => ({
            label: c[nameProp],
            value: c[valueProp],
        }));
    };

    const onChange = (items: MultiValue<{ label: string; value: number }>) => {
        setter(items ? items.map((c) => c.value) : []);
    };

    return (
        <VStack w={"full"} alignItems={"flex-start"}>
            {label && <Text>{label}</Text>}
            <AsyncSelect
                placeholder={placeholder}
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
                        : "Start typing to search"
                }
                onChange={onChange}
                isMulti
            />
        </VStack>
    );
};

export default AsyncMultiDropdownFilter;
