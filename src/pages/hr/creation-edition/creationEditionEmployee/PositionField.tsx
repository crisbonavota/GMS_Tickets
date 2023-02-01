import AsyncSelect from "react-select/async";
import { useAuthHeader } from "react-auth-kit";
import {
    FormErrorMessage,
    FormControl,
    FormLabel,
    HStack,
} from "@chakra-ui/react";
import { SingleValue } from "react-select";
import { getResourceListFilteredAndPaginated } from "../../../../api/api";
import { Position } from "../../../../api/types";

interface Props {
    setter: (value: number | null) => void;
    error?: string;
    touched?: boolean;
    defaultValue?: { label: string; value: number };
}

const PositionField = ({ setter, error, touched, defaultValue }: Props) => {
    const getAuthHeader = useAuthHeader();
    const getOptions = async (input: string) => {
        const res = await getResourceListFilteredAndPaginated<Position>(
            "employees/positions",
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

    const onChange = (p: SingleValue<{ label: string; value: number }>) => {
        setter(p ? p.value : null);
    };

    return (
        <FormControl isInvalid={Boolean(error) && touched}>
            <FormLabel htmlFor={"positionId"}>Position</FormLabel>
            <HStack spacing={1}>
                <AsyncSelect
                    id="positionId"
                    name="positionId"
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
                            : "Start typing to search for positions"
                    }
                    onChange={onChange}
                    defaultValue={defaultValue}
                />
            </HStack>
            <FormErrorMessage>{error}</FormErrorMessage>
        </FormControl>
    );
};

export default PositionField;
