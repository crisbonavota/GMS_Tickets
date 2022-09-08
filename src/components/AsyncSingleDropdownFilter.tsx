import { VStack, Text } from "@chakra-ui/react";
import { useAuthHeader } from "react-auth-kit";
import { SingleValue } from "react-select";
import AsyncSelect from "react-select/async";
import { getResourceListFilteredAndPaginated } from "../api/api";
import { useState } from "react";

interface Props {
    setter: (value: number | null) => void;
    resource: string;
    nameProp: string;
    valueProp: string;
    label?: string;
    placeholder?: string;
}

const AsyncSingleDropdownFilter = ({
    setter,
    resource,
    nameProp,
    valueProp,
    label,
    placeholder,
}: Props) => {
    const [internalValue, setInternalValue] = useState<{
        label: string;
        value: number;
    } | null>(null);

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

    const onChange = (item: SingleValue<{ label: string; value: number }>) => {
        setInternalValue(item ? item : null);
        setter(item ? item.value : null);
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
                value={internalValue}
            />
        </VStack>
    );
};

export default AsyncSingleDropdownFilter;
