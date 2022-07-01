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
const EndDateInput = ({ errors }: Props) => {
    return (
        <FormControl isInvalid={errors.endDate !== undefined}>
            <FormLabel htmlFor={'endDate'}>End date</FormLabel>
            <Field id="endDate" name="endDate" as={Input} type="date" />
            <ErrorMessage name="endDate" component={FormErrorMessage} />
        </FormControl>
    );
};
export default EndDateInput;
