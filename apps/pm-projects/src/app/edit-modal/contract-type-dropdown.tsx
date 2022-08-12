import {
    FormControl,
    FormLabel,
    FormErrorMessage,
    Select,
} from '@chakra-ui/react';
import { getContractTypes, ProjectCreation } from '@gms-micro/api-utils';
import { Field, ErrorMessage, FormikErrors } from 'formik';

interface Props {
    errors: FormikErrors<ProjectCreation>;
}

const ContractTypeDropdown = ({ errors }: Props) => {
    return (
        <FormControl isInvalid={errors.contractType !== undefined}>
            <FormLabel htmlFor={'contractType'}>Contract Type</FormLabel>
            <Field
                id="contractType"
                name="contractType"
                as={Select}
                type="number"
            >
                {getContractTypes().map((ct) => (
                    <option key={ct.value} value={ct.value}>
                        {ct.label}
                    </option>
                ))}
            </Field>
            <ErrorMessage name="contractType" component={FormErrorMessage} />
        </FormControl>
    );
};
export default ContractTypeDropdown;
