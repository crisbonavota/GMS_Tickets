import {
    FormControl,
    FormLabel,
    Input,
    FormErrorMessage,
} from '@chakra-ui/react';
import { ProjectCreation } from '@gms-micro/api-utils';
import { ErrorMessage, Field, FormikErrors } from 'formik';

interface Props {
    errors: FormikErrors<ProjectCreation>;
}

const HoursInput = ({ errors }: Props) => {
    return (
        <FormControl isInvalid={errors.hours !== undefined}>
            <FormLabel htmlFor={'hours'}>Estimated hours</FormLabel>
            <Field id="hours" name="hours" as={Input} type="number" step={1} />
            <ErrorMessage name="hours" component={FormErrorMessage} />
        </FormControl>
    );
};
export default HoursInput;
