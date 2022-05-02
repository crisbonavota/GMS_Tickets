import {
    Button,
    FormControl,
    FormErrorMessage,
    FormLabel,
    IconButton,
    Input,
    Modal,
    ModalBody,
    ModalCloseButton,
    ModalContent,
    ModalFooter,
    ModalHeader,
    ModalOverlay,
    Select,
    Textarea,
    useBoolean,
    VStack
} from '@chakra-ui/react';
import { Update, getResourceList, UpdateType, patchResource, getUpdateResourceFromType } from '@gms-micro/api-utils';
import { MdModeEditOutline } from 'react-icons/md';
import { useQuery } from 'react-query';
import { LegacyUserPublic } from '@gms-micro/auth-types';
import { ErrorMessage, Field, Form, Formik } from 'formik';
import * as Yup from 'yup';
import { useMemo } from 'react';

const formSchema = Yup.object().shape({
    legacyUserId: Yup.number().required("Required"),
    updateTypeId: Yup.number().required("Required"),
    date: Yup.date().required("Required"),
});

export interface EditModalProps {
    update: Update,
    authHeader: string,
}

export function EditModal({ update, authHeader }: EditModalProps) {
    const [open, setOpen] = useBoolean();
    const employeesQuery = useQuery(['editEmployee'], () => getResourceList<LegacyUserPublic>('users/legacy', authHeader));
    const updateTypesQuery = useQuery(['editUpdateType'], () => getResourceList<UpdateType>('updates/types', authHeader));

    const initialValues = useMemo(() => ({
        legacyUserId: update.legacyUser.id,
        updateTypeId: update.updateType.id,
        date: new Date(update.date).toISOString().split("T")[0], // The date is before the T (format ISO 8601)
        notes: update.notes
    }), [update]);

    return (
        <>
            <IconButton onClick={setOpen.on} size={'sm'} icon={<MdModeEditOutline />} aria-label="Edit" colorScheme={'blackAlpha'} />
            <Modal isOpen={open} onClose={setOpen.off}>
                <ModalOverlay />
                <ModalContent w={'full'}>
                    <ModalHeader>Edit update</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody w={'full'}>
                        <Formik
                            initialValues={initialValues}
                            onSubmit={async (values, { setSubmitting }) => {
                                await patchResource(
                                    getUpdateResourceFromType(values['updateTypeId']),
                                    update.id,
                                    authHeader,
                                    initialValues,
                                    values
                                );

                                setSubmitting(false);
                                setOpen.off();
                            }}
                            validationSchema={formSchema}
                        >
                            {({ isSubmitting, errors, handleSubmit }) => (
                                <Form onSubmit={handleSubmit}>
                                    <VStack spacing={4}>
                                        <FormControl isInvalid={errors.legacyUserId !== undefined}>
                                            <FormLabel htmlFor={"legacyUserId"}>Employee</FormLabel>
                                            <Field id="legacyUserId" name="legacyUserId" as={Select} >
                                                {employeesQuery.data?.data?.map(employee =>
                                                    <option key={employee.id} value={employee.id}>{employee.fullName}</option>)}
                                            </Field>
                                            <ErrorMessage name='legacyUserId' component={FormErrorMessage} />
                                        </FormControl>

                                        <FormControl isInvalid={errors.updateTypeId !== undefined}>
                                            <FormLabel htmlFor='updateTypeId'>Update Type</FormLabel>
                                            <Field id="updateTypeId" name="updateTypeId" as={Select} >
                                                {updateTypesQuery.data?.data?.map(type =>
                                                    <option key={type.id} value={type.id}>{type.caption}</option>)}
                                            </Field>
                                            <ErrorMessage name='updateTypeId' component={FormErrorMessage} />
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

                                        <ModalFooter w={'full'}>
                                            <Button colorScheme='green' mr={3} type={"submit"} isLoading={isSubmitting}>
                                                Save
                                            </Button>
                                            <Button variant='ghost' onClick={setOpen.off}>Cancel</Button>
                                        </ModalFooter>
                                    </VStack>
                                </Form>
                            )}
                        </Formik>
                    </ModalBody>
                </ModalContent>
            </Modal>
        </>

    );
}

export default EditModal;
