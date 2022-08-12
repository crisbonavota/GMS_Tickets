import {
    FormControl,
    FormErrorMessage,
    FormLabel,
    Input,
} from '@chakra-ui/react';
import { ProjectCreation } from '@gms-micro/api-utils';
import { ErrorMessage, Field, FormikErrors } from 'formik';

interface Props {
    errors: FormikErrors<ProjectCreation>;
}
const StartDateInput = ({ errors }: Props) => {
    return (
        <FormControl isInvalid={errors.startDate !== undefined}>
            <FormLabel htmlFor={'startDate'}>Start date</FormLabel>
            <Field id="startDate" name="startDate" as={Input} type="date" />
            <ErrorMessage name="startDate" component={FormErrorMessage} />
        </FormControl>
    );
};
export default StartDateInput;
