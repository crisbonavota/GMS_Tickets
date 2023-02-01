import { FormErrorMessage, FormControl } from "@chakra-ui/react";
import SyncSingleValueDropdownFilter from "../../../components/SyncSingleValueDropdownFilter";

interface Props {
    setter: (value: number | null) => void;
    error?: string;
    touched?: boolean;
    defaultValue?: { label: string; value: number };
}

const BusinessUnitField = ({ setter, error, touched, defaultValue }: Props) => {
    return (
        <FormControl isInvalid={Boolean(error) && touched}>
            <SyncSingleValueDropdownFilter
                resource="businessUnits"
                title="Business units"
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

export default BusinessUnitField;
