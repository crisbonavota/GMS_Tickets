import { ImportUpdate } from "./ImportButton";
import {
    Button,
    chakra,
    HStack,
    IconButton,
    Modal,
    ModalBody,
    ModalCloseButton,
    ModalContent,
    ModalHeader,
    ModalOverlay,
    useDisclosure,
    VStack,
} from "@chakra-ui/react";
import { MdModeEditOutline } from "react-icons/md";
import * as Yup from "yup";
import {
    getCurrencies,
    getResourceListFilteredAndPaginated,
} from "../../../../api/api";
import FormikInput from "../../../../components/FormikInput";
import { useFormik } from "formik";
import { useAuthHeader } from "react-auth-kit";
import { Employee } from "../../../../api/types";
import { useQuery } from "react-query";
import moment from "moment";

interface Props {
    update: ImportUpdate;
    setUpdates: React.Dispatch<React.SetStateAction<ImportUpdate[]>>;
    updateType: "monetary" | "structure" | null;
}

const ImportPreviewEdit = ({ update, setUpdates, updateType }: Props) => {
    const getAuthHeader = useAuthHeader();

    const { data: employees, isSuccess } = useQuery(
        ["employees"],
        () =>
            getResourceListFilteredAndPaginated<Employee>(
                "employees",
                getAuthHeader(),
                [],
                [],
                { field: "legacyUser.fullName", isAscending: true },
                0,
                10000
            ),
        {
            select: (r) => r.data,
        }
    );
    const { isOpen, onOpen, onClose } = useDisclosure();

    const initialValues = {
        ...update,
        date: moment(update.date?.replaceAll("/", "-"), "DD-MM-YYYY").format(
            "YYYY-MM-DD"
        ),
    };

    const validationSchema = Yup.object().shape({
        filenumber: Yup.number().required("File number is required"),
        currency:
            updateType === "monetary"
                ? Yup.string()
                      .required("Currency is required")
                      .test("test-exists", "Currency does not exist", (value) =>
                          getCurrencies().find((c) => c.code === value)
                              ? true
                              : false
                      )
                : Yup.string().nullable(),
        date: Yup.date().required("Date is required"),
        amount: Yup.number().required("Amount is required"),
    });

    const formik = useFormik({
        initialValues,
        validationSchema,
        onSubmit: (values) => {
            setUpdates((prev) => {
                const newUpdates = [...prev];
                newUpdates[newUpdates.indexOf(update)] = {
                    ...values,
                    date: moment(values.date, "YYYY-MM-DD").format(
                        "DD/MM/YYYY"
                    ),
                };
                return newUpdates;
            });
            onClose();
        },
    });

    return (
        <>
            <IconButton
                onClick={onOpen}
                aria-label="edit update"
                icon={<MdModeEditOutline />}
                colorScheme="blue"
                size={"sm"}
            />

            <Modal isOpen={isOpen} onClose={onClose}>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>Edit update</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                        <chakra.form w={"full"} onSubmit={formik.handleSubmit}>
                            <VStack w={"full"} spacing={5}>
                                <FormikInput
                                    label="File Number"
                                    value={formik.values.filenumber}
                                    error={formik.errors.filenumber}
                                    onChange={formik.handleChange}
                                    name={"filenumber"}
                                    touched={formik.touched.filenumber}
                                    type={"number"}
                                />
                                {updateType === "monetary" && (
                                    <FormikInput
                                        label="Currency"
                                        value={formik.values.currency}
                                        error={formik.errors.currency}
                                        onChange={formik.handleChange}
                                        name={"currency"}
                                        touched={formik.touched.currency}
                                    />
                                )}
                                <FormikInput
                                    label="Date"
                                    value={formik.values.date}
                                    error={formik.errors.date}
                                    onChange={formik.handleChange}
                                    name={"date"}
                                    touched={formik.touched.date}
                                    type="date"
                                />
                                <FormikInput
                                    label="Amount"
                                    value={formik.values.amount}
                                    error={formik.errors.amount}
                                    onChange={formik.handleChange}
                                    name={"amount"}
                                    touched={formik.touched.amount}
                                    type="number"
                                />
                                <HStack
                                    w={"full"}
                                    justifyContent="flex-end"
                                    spacing={3}
                                >
                                    <Button colorScheme="blue" type="submit">
                                        Save
                                    </Button>
                                    <Button variant="ghost" onClick={onClose}>
                                        Cancel
                                    </Button>
                                </HStack>
                            </VStack>
                        </chakra.form>
                    </ModalBody>
                </ModalContent>
            </Modal>
        </>
    );
};

export default ImportPreviewEdit;
