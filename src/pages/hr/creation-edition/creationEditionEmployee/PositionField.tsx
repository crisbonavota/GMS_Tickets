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
    isRequired?: boolean;
}

const PositionField = ({ setter, error, touched, defaultValue, isRequired }: Props) => {
    return (
        <FormControl isRequired={isRequired} isInvalid={Boolean(error) && touched}>
            <SyncSingleValueDropdownFilter
                resource="employees/positions"
                title="Position"
                labelProp="name"
                valueProp="id"
                setter={setter}
                defaultValue={defaultValue}
                placeholder=""
            />
            <FormErrorMessage>{error}</FormErrorMessage>
        </FormControl>
    );
};

export default PositionField;
