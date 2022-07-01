import { FormControl, FormLabel, Select, FormErrorMessage, Input, Heading, Textarea } from '@chakra-ui/react';
import { getResourceList, KeyValuePair, UpdateType } from '@gms-micro/api-utils';
import { LegacyUserPublic } from '@gms-micro/auth-types';
import { Field, ErrorMessage, FormikErrors } from 'formik';
import { useAuthHeader } from 'react-auth-kit';
import { useQuery } from 'react-query';

interface FormCommonFieldsProps {
    errors: FormikErrors<KeyValuePair>,
    updateType: UpdateType
}

const FormCommonFields = ({ errors, updateType }: FormCommonFieldsProps) => {
    const getAuthHeader = useAuthHeader();
    const employeesQuery = useQuery(['legacyUsers'], () => getResourceList<LegacyUserPublic>('users/legacy', getAuthHeader()));

    return (
        <>
            <FormControl isInvalid={errors.legacyUserId !== undefined}>
                <FormLabel htmlFor={"legacyUserId"}>Employee</FormLabel>
                <Field id="legacyUserId" name="legacyUserId" as={Select} type="number">
                    {employeesQuery.data?.data?.map(employee =>
                        <option key={employee.id} value={employee.id}>{employee.fullName}</option>)}
                </Field>
                <ErrorMessage name='legacyUserId' component={FormErrorMessage} />
            </FormControl>

            <FormControl>
                <FormLabel htmlFor='updateTypeId'>Update Type</FormLabel>
                <Heading fontSize={'md'}>{updateType.caption}</Heading>
            </FormControl>

            <FormControl isInvalid={errors.date !== undefined}>
                <FormLabel htmlFor="date">Date</FormLabel>
                <Field as={Input} type="date" id={"date"} name="date" />
                <ErrorMessage name='date' component={FormErrorMessage} />
            </FormControl>

            <FormControl isInvalid={errors.notes !== undefined}>
                <FormLabel htmlFor='notes'>Notes</FormLabel>
                <Field as={Textarea} id={"notes"} name="notes" />
                <ErrorMessage name='notes' component={FormErrorMessage} />
            </FormControl>
        </>
    )
}

export default FormCommonFields;
