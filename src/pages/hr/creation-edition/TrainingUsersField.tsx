import { FormErrorMessage, FormControl } from "@chakra-ui/react";
import SyncSingleValueDropdownFilter from "../../../components/SyncSingleValueDropdownFilter";


interface Props {
    setter: (value: number | null) => void;
    error?: string;
    touched?: boolean;
    defaultValue?: { label: string; value: number };
    isRequired?: boolean;
}

const TrainingUserField = ({ setter, error, touched, defaultValue, isRequired }: Props) => {
    return (
        <FormControl isRequired={isRequired} isInvalid={Boolean(error) && touched}>
            <SyncSingleValueDropdownFilter
                resource="users/legacy"
                title="Employee / Provider"
                labelProp="fullName"
                valueProp="id"
                setter={setter}
                defaultValue={defaultValue}
                placeholder=""
            />
            <FormErrorMessage>{error}</FormErrorMessage>
        </FormControl>
    );
};

export default TrainingUserField;