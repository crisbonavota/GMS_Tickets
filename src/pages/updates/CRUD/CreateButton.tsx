import {
    useBoolean,
    VStack,
    Button,
    Modal,
    ModalBody,
    ModalCloseButton,
    ModalContent,
    ModalFooter,
    ModalHeader,
    ModalOverlay,
    MenuItem,
    useToast,
} from "@chakra-ui/react";
import { Formik, Form } from "formik";
import { useEffect, useState } from "react";
import { useAuthHeader } from "react-auth-kit";
import { useMutation, useQueryClient } from "react-query";
import {
    postResource,
    getUpdateResourceFromType,
    updateTypesIds,
} from "../../../api/api";
import { UpdateType, KeyValuePair } from "../../../api/types";
import { generateDinamicYupSchema } from "../../../utils/forms";
import FormCommonFields from "./FormCommonFields";
import FormConditionalFields from "./FormConditionalFields";

type CreateModalProps = {
    updateType: UpdateType;
};

const CreateButton = ({ updateType }: CreateModalProps) => {
    const [open, setOpen] = useBoolean();
    const queryClient = useQueryClient();
    const [initialValues, setInitialValues] = useState<KeyValuePair>({});
    const toast = useToast();
    const getAuthHeader = useAuthHeader();

    useEffect(() => {
        setInitialValues(renderInitialValues(initialValues, updateType));
    }, []);

    const createUpdateMutation = useMutation(
        async (values: KeyValuePair) =>
            await postResource(
                getUpdateResourceFromType(updateType.id),
                getAuthHeader(),
                values
            ),
        {
            onMutate: async () => {
                await queryClient.cancelQueries(["updates"]);
                await queryClient.cancelQueries(["updatesReport"]);
            },
            onSuccess: () => {
                queryClient.resetQueries(["updates"]);
                queryClient.resetQueries(["updatesReport"]);
                toast({
                    title: "Element created",
                    status: "success",
                    position: "top",
                    duration: 2000,
                });
            },
            onError: (err: any) => {
                toast({
                    title: "Error creating the element, try again later",
                    description: err.message || err,
                    status: "error",
                    position: "top",
                    duration: 2000,
                });
            },
        }
    );

    return (
        <>
            <MenuItem onClick={setOpen.on}>{updateType.caption}</MenuItem>
            <Modal isOpen={open} onClose={setOpen.off}>
                <ModalOverlay />
                <ModalContent w={"full"}>
                    <ModalHeader>New update</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody w={"full"}>
                        <Formik
                            initialValues={initialValues}
                            onSubmit={async (values, { setSubmitting }) => {
                                await createUpdateMutation.mutateAsync(values);
                                setSubmitting(false);
                                setOpen.off();
                            }}
                            validationSchema={generateDinamicYupSchema(
                                updateType.id,
                                true
                            )}
                        >
                            {({ errors, handleSubmit, isSubmitting }) => (
                                <Form onSubmit={handleSubmit}>
                                    <VStack spacing={4}>
                                        <FormCommonFields
                                            errors={errors}
                                            updateType={updateType}
                                        />
                                        <FormConditionalFields
                                            errors={errors}
                                            updateTypeId={updateType.id}
                                        />
                                        <ModalFooter w={"full"}>
                                            <Button
                                                colorScheme="green"
                                                mr={3}
                                                type={"submit"}
                                                isLoading={isSubmitting}
                                                disabled={!updateType}
                                            >
                                                Save
                                            </Button>
                                            <Button
                                                variant="ghost"
                                                onClick={setOpen.off}
                                            >
                                                Cancel
                                            </Button>
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
};

const renderInitialValues = (
    initialValues: KeyValuePair,
    updateType: UpdateType
) => {
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
};

export default CreateButton;
