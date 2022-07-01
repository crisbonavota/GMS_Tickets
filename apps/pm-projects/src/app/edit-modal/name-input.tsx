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

const NameInput = ({ errors }: Props) => {
    return (
        <FormControl isInvalid={errors.name !== undefined}>
            <FormLabel htmlFor={'name'}>Name</FormLabel>
            <Field id="name" name="name" as={Input} type="text" />
            <ErrorMessage name="name" component={FormErrorMessage} />
        </FormControl>
    );
};
export default NameInput;
