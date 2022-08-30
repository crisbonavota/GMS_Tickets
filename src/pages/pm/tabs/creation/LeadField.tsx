import AsyncSelect from "react-select/async";
import { useAuthHeader } from "react-auth-kit";
import { FormControl, FormErrorMessage, FormLabel } from "@chakra-ui/react";
import { SingleValue } from "react-select";
import { getResourceListFilteredAndPaginated } from "../../../../api/api";
import { LegacyUserPublic } from "../../../../api/types";

interface Props {
    setter: (value: number | null) => void;
    error?: string;
    touched?: boolean;
    name: string;
}

const LeadField = ({ setter, error, touched, name }: Props) => {
    const getAuthHeader = useAuthHeader();
    const getOptions = async (input: string) => {
        const res = await getResourceListFilteredAndPaginated<LegacyUserPublic>(
            "users/legacy",
            getAuthHeader(),
            [{ field: "fullName", value: input }],
            [],
            { field: "fullName", isAscending: true }
        );
        return res.data.map((c) => ({
            label: c.fullName,
            value: c.id,
        }));
    };

    const onChange = (
        client: SingleValue<{ label: string; value: number }>
    ) => {
        setter(client ? client.value : null);
    };

    return (
        <FormControl isInvalid={Boolean(error) && touched}>
            <FormLabel htmlFor={name}>Lead</FormLabel>
            <AsyncSelect
                id={name}
                name={name}
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
                        : "Start typing to search for users"
                }
                onChange={onChange}
            />
            <FormErrorMessage>{error}</FormErrorMessage>
        </FormControl>
    );
};

export default LeadField;
