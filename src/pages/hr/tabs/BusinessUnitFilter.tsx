import AsyncSelect from "react-select/async";
import { useAuthHeader } from "react-auth-kit";
import { VStack, Text } from "@chakra-ui/react";
import { SingleValue } from "react-select";
import { getResourceListFilteredAndPaginated } from "../../../api/api";
import { BusinessUnit } from "../../../api/types";

interface Props {
    setter: (value: number | null) => void;
}

const BusinessUnitFilter = ({ setter }: Props) => {
    const getAuthHeader = useAuthHeader();
    const getOptions = async (input: string) => {
        const res = await getResourceListFilteredAndPaginated<BusinessUnit>(
            "businessUnits",
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
        businessUnit: SingleValue<{ label: string; value: number }>
    ) => {
        setter(businessUnit ? businessUnit.value : null);
    };

    return (
        <VStack w={"full"} alignItems={"flex-start"}>
            <Text>Business Unit</Text>
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
                        : "Start typing to search for business units"
                }
                onChange={onChange}
            />
        </VStack>
    );
};

export default BusinessUnitFilter;