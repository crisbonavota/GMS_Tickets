import { useBoolean, VStack, Button, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, MenuItem } from '@chakra-ui/react';
import { KeyValuePair, UpdateType, updateTypesIds, postResource, getUpdateResourceFromType } from '@gms-micro/api-utils';
import { Formik, Form } from 'formik';
import { useEffect, useState } from 'react';
import { useQueryClient } from 'react-query';
import FormCommonFields from '../form-common-fields/form-common-fields';
import FormConditionalFields from '../form-conditional-fields/form-conditional-fields';
import { generateDinamicYupSchema } from '../helpers';

type CreateModalProps = {
    authHeader: string,
    updateType: UpdateType
}

const CreateModal = ({ authHeader, updateType }: CreateModalProps) => {
    const [open, setOpen] = useBoolean();
    const queryClient = useQueryClient();
    const [initialValues, setInitialValues] = useState<KeyValuePair>({});

    useEffect(() => {
        setInitialValues(renderInitialValues(initialValues, updateType));
    }, []);

    return (
        <>
            <MenuItem onClick={setOpen.on}>{updateType.caption}</MenuItem>
            <Modal isOpen={open} onClose={setOpen.off}>
                <ModalOverlay />
                <ModalContent w={'full'}>
                    <ModalHeader>New update</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody w={'full'}>
                        <Formik
                            initialValues={initialValues}
                            onSubmit={async (values, { setSubmitting }) => {
                                await postResource(getUpdateResourceFromType(updateType.id), authHeader, values);
                                setSubmitting(false);
                                setOpen.off();
                                queryClient.resetQueries(['updates']);
                                queryClient.resetQueries(['updatesReport']);
                            }}
                            validationSchema={generateDinamicYupSchema(updateType.id, true)}
                        >
                            {({ errors, handleSubmit, isSubmitting }) => (
                                <Form onSubmit={handleSubmit}>
                                    <VStack spacing={4}>
                                        <FormCommonFields authHeader={authHeader} errors={errors} updateType={updateType} />
                                        <FormConditionalFields errors={errors} updateTypeId={updateType.id} />
                                        <ModalFooter w={'full'}>
                                            <Button
                                                colorScheme='green'
                                                mr={3}
                                                type={"submit"}
                                                isLoading={isSubmitting}
                                                disabled={!updateType}
                                            >
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
    )
}

const renderInitialValues = (initialValues: KeyValuePair, updateType: UpdateType) => {
    initialValues.legacyUserId = 0;
    initialValues.date = new Date(Date.now()).toISOString().split("T")[0]; // The date is before the T (format ISO 8601)
    initialValues.notes = "";
    initialValues.updateTypeId = updateType.id;

    if (updateTypesIds.periodUpdateTypes.includes(updateType.id))
        initialValues.endDate = "";

    if (updateTypesIds.dateChangeUpdateTypes.includes(updateType.id))
        initialValues.newDate = "";

    if (updateTypesIds.monetaryUpdateTypes.includes(updateType.id)) {
        initialValues.amount = 0;
        initialValues.amountCurrencyId = 1; // ARS
    }

    if (updateTypesIds.resignationUpdateTypes.includes(updateType.id))
        initialValues.dateTelegram = "";

    if (updateTypesIds.workAccidentUpdateTypes.includes(updateType.id)) {
        initialValues.reportNumber = 0;
        initialValues.endDate = "";
    }

    return initialValues;
}

export default CreateModal;
