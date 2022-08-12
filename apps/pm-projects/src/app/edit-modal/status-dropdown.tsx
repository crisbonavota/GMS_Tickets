import {
    FormControl,
    FormLabel,
    FormErrorMessage,
    Select,
} from '@chakra-ui/react';
import { getProjectStatus, ProjectCreation } from '@gms-micro/api-utils';
import { Field, ErrorMessage, FormikErrors } from 'formik';

interface Props {
    errors: FormikErrors<ProjectCreation>;
}

const StatusDropdown = ({ errors }: Props) => {
    return (
        <FormControl isInvalid={errors.status !== undefined}>
            <FormLabel htmlFor={'status'}>Status</FormLabel>
            <Field id="status" name="status" as={Select} type="number">
                {getProjectStatus().map((status) => (
                    <option key={status.value} value={status.value}>
                        {status.label}
                    </option>
                ))}
            </Field>
            <ErrorMessage name="status" component={FormErrorMessage} />
        </FormControl>
    );
};
export default StatusDropdown;
