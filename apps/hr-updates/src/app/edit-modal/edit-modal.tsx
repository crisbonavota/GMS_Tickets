import {
    Button,
    IconButton,
    Modal,
    ModalBody,
    ModalCloseButton,
    ModalContent,
    ModalFooter,
    ModalHeader,
    ModalOverlay,
    useBoolean,
    VStack,
} from '@chakra-ui/react';
import { Update, patchResource, getUpdateResourceFromType, KeyValuePair, updateTypesIds } from '@gms-micro/api-utils';
import { MdModeEditOutline } from 'react-icons/md';
import { useQueryClient } from 'react-query';
import { Form, Formik } from 'formik';
import { useState, useEffect } from 'react';
import FormCommonFields from '../form-common-fields/form-common-fields';
import FormConditionalFields from '../form-conditional-fields/form-conditional-fields';
import { generateDinamicYupSchema } from '../helpers';

export interface EditModalProps {
    update: Update,
    authHeader: string,
}

export function EditModal({ update, authHeader }: EditModalProps) {
    const [open, setOpen] = useBoolean();
    const queryClient = useQueryClient();
    const [initialValues, setInitialValues] = useState<KeyValuePair>({});

    useEffect(() => {
        setInitialValues(renderInitialValues(initialValues, update));
    }, []);

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
                                    getUpdateResourceFromType(update.updateType.id),
                                    update.id,
                                    authHeader,
                                    initialValues,
                                    values
                                );
                                setSubmitting(false);
                                setOpen.off();
                                queryClient.resetQueries(['updates']);
                                queryClient.resetQueries(['updatesReport']);
                            }}
                            validationSchema={generateDinamicYupSchema(update.updateType.id)}
                        >
                            {({ isSubmitting, errors, handleSubmit }) => (
                                <Form onSubmit={handleSubmit}>
                                    <VStack spacing={4}>
                                        <FormCommonFields authHeader={authHeader} errors={errors} updateType={update.updateType} />
                                        <FormConditionalFields errors={errors} updateTypeId={update.updateType.id} />
                                    </VStack>
                                    <ModalFooter w={'full'}>
                                        <Button
                                            colorScheme='green'
                                            mr={3}
                                            type={"submit"}
                                            isLoading={isSubmitting}
                                        >
                                            Save
                                        </Button>
                                        <Button variant='ghost' onClick={setOpen.off}>Cancel</Button>
                                    </ModalFooter>
                                </Form>
                            )}
                        </Formik>
                    </ModalBody>
                </ModalContent>
            </Modal>
        </>
    );
}

const renderInitialValues = (initialValues: KeyValuePair, update: Update) => {
    initialValues.legacyUserId = update.legacyUser.id;
    initialValues.date = update.date.split("T")[0]; // The date is before the T (format ISO 8601)
    initialValues.notes = update.notes ? update.notes : "";

    if (updateTypesIds.periodUpdateTypes.includes(update.updateType.id))
        initialValues.endDate = update.endDate ? new Date(update.endDate).toISOString().split("T")[0] : "";

    if (updateTypesIds.dateChangeUpdateTypes.includes(update.updateType.id))
        initialValues.newDate = update.newDate ? new Date(update.newDate).toISOString().split("T")[0] : "";

    if (updateTypesIds.monetaryUpdateTypes.includes(update.updateType.id)) {
        initialValues.amount = update.amount;
        initialValues.amountCurrencyId = update.amountCurrency?.id;
    }

    if (updateTypesIds.resignationUpdateTypes.includes(update.updateType.id))
        initialValues.dateTelegram = update.dateTelegram;

    if (updateTypesIds.workAccidentUpdateTypes.includes(update.updateType.id)) {
        initialValues.reportNumber = update.reportNumber;
        initialValues.endDate = update.endDate ? new Date(update.endDate).toISOString().split("T")[0] : "";
    }

    return initialValues;
}

export default EditModal;
