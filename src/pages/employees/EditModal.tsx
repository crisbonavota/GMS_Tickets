import {
    useDisclosure,
    IconButton,
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalCloseButton,
    ModalBody,
    ModalFooter,
    Button,
    VStack,
    FormControl,
    FormErrorMessage,
    FormLabel,
    Input,
} from "@chakra-ui/react";
import { MdModeEditOutline } from "react-icons/md";
import { useMemo } from "react";
import { ErrorMessage, Field, Form, Formik } from "formik";
import { buildYup } from "schema-to-yup";
import { useMutation, useQueryClient } from "react-query";
import { useAuthHeader } from "react-auth-kit";
import { useToast } from "@chakra-ui/react";
import { Employee, KeyValuePair } from "../../api/types";
import { patchResource } from "../../api/api";

// TODO: Replace formik + Yup current implementation with modern one (Yup object shape + Formik as hook)

const validationSchema = {
    type: "object",
    properties: {
        fileNumber: {
            type: "number",
            required: true,
        },
    },
};

const validationConfig = {
    errMessages: {
        fileNumber: {
            required: "Employee is required",
        },
    },
};

type Props = {
    employee: Employee;
};

const EditModal = ({ employee }: Props) => {
    const { isOpen, onOpen, onClose } = useDisclosure();
    const getAuthHeader = useAuthHeader();
    const queryClient = useQueryClient();
    const toast = useToast();

    const initialValues = useMemo(() => {
        return {
            fileNumber: employee.fileNumber,
        };
    }, []);

    const editMutation = useMutation(
        async (newValues: KeyValuePair) =>
            await patchResource(
                "employees",
                employee.id,
                getAuthHeader(),
                initialValues,
                newValues
            ),
        {
            onMutate: () => {
                queryClient.cancelQueries(["employees"]);
            },
            onSuccess: () => {
                queryClient.resetQueries(["employees"]);
                toast({
                    title: "Employee updated",
                    status: "success",
                    position: "top",
                    duration: 2000,
                });
            },
            onError: (err: any) => {
                toast({
                    title: "Error updating the employee, try again later",
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
            <IconButton
                icon={<MdModeEditOutline />}
                aria-label="Edit"
                onClick={onOpen}
            />

            <Modal isOpen={isOpen} onClose={onClose}>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>
                        {employee.firstName} {employee.lastName}
                    </ModalHeader>
                    <ModalCloseButton />
                    <ModalBody w={"full"}>
                        <Formik
                            initialValues={initialValues}
                            onSubmit={async (values, { setSubmitting }) => {
                                await editMutation.mutateAsync(values);
                                setSubmitting(false);
                                onClose();
                            }}
                            validationSchema={buildYup(
                                validationSchema,
                                validationConfig
                            )}
                        >
                            {({ errors, handleSubmit, isSubmitting }) => (
                                <Form onSubmit={handleSubmit}>
                                    <VStack spacing={4}>
                                        <FormControl
                                            isInvalid={
                                                errors.fileNumber !== undefined
                                            }
                                        >
                                            <FormLabel htmlFor={"fileNumber"}>
                                                File number
                                            </FormLabel>
                                            <Field
                                                as={Input}
                                                type="number"
                                                id={"fileNumber"}
                                                name="fileNumber"
                                            />
                                            <ErrorMessage
                                                name="fileNumber"
                                                component={FormErrorMessage}
                                            />
                                        </FormControl>
                                        <ModalFooter w={"full"}>
                                            <Button
                                                colorScheme="green"
                                                mr={3}
                                                type={"submit"}
                                                isLoading={isSubmitting}
                                            >
                                                Save
                                            </Button>
                                            <Button
                                                variant="ghost"
                                                onClick={onClose}
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

export default EditModal;