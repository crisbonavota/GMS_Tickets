import AsyncSelect from "react-select/async";
import { useAuthHeader } from "react-auth-kit";
import {
    FormErrorMessage,
    FormControl,
    FormLabel,
    HStack,
} from "@chakra-ui/react";
import { SingleValue } from "react-select";
import { getResourceListFilteredAndPaginated } from "../../../api/api";
import { BusinessUnit } from "../../../api/types";

interface Props {
    setter: (value: number | null) => void;
    error?: string;
    touched?: boolean;
}

const BusinessUnitField = ({ setter, error, touched }: Props) => {
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

    const onChange = (bu: SingleValue<{ label: string; value: number }>) => {
        setter(bu ? bu.value : null);
    };

    return (
        <FormControl isInvalid={Boolean(error) && touched}>
            <FormLabel htmlFor={"businessUnitId"}>Business Unit</FormLabel>
            <HStack spacing={1}>
                <AsyncSelect
                    id="businessUnitId"
                    name="businessUnitId"
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
            </HStack>
            <FormErrorMessage>{error}</FormErrorMessage>
        </FormControl>
    );
};

export default BusinessUnitField;
