import { FormControl, FormLabel, Select, FormErrorMessage, Input, Heading, Textarea } from '@chakra-ui/react';
import { getResourceList, KeyValuePair, Update, UpdateType } from '@gms-micro/api-utils';
import { LegacyUserPublic } from '@gms-micro/auth-types';
import { Field, ErrorMessage, FormikErrors } from 'formik';
import { useQuery } from 'react-query';

interface FormCommonFieldsProps {
    authHeader: string,
    errors: FormikErrors<KeyValuePair>,
    updateType: UpdateType
}

const FormCommonFields = ({ authHeader, errors, updateType }: FormCommonFieldsProps) => {
    const employeesQuery = useQuery(['editEmployee'], () => getResourceList<LegacyUserPublic>('users/legacy', authHeader));

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

export const renderCommonValues = (initialValues: KeyValuePair, update: Update) => {
    initialValues.legacyUserId = update.legacyUser.id;
    initialValues.date = new Date(update.date).toISOString().split("T")[0]; // The date is before the T (format ISO 8601)
    initialValues.notes = update.notes;

    return initialValues;
}

export default FormCommonFields;
