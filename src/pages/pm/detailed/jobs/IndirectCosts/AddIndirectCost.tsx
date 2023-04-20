import {
    Button,
    Popover,
    PopoverArrow,
    PopoverBody,
    PopoverCloseButton,
    PopoverContent,
    PopoverHeader,
    PopoverTrigger,
    chakra,
} from "@chakra-ui/react";
import * as Yup from "yup";
import { useFormik } from "formik";
import FormikInput from "../../../../../components/FormikInput";
import { getCurrencies, postResource } from "../../../../../api/api";
import { VStack, useToast } from "@chakra-ui/react";
import { useMutation, useQueryClient } from "react-query";
import { useAuthHeader } from "react-auth-kit";
import moment from "moment";
import { AxiosError } from "axios";
import LabeledReactSelectInput from "../../../../../components/LabeledReactSelectInput";

const validationSchema = Yup.object().shape({
    description: Yup.string().required("Description is required"),
    amount: Yup.number()
        .required("Amount is required")
        .min(0, "Amount must be greater than 0"),
    currencyId: Yup.number().required("Currency is required"),
    date: Yup.date().required("Date is required"),
});

const initialValues = {
    description: "",
    amount: 0,
    currencyId: 1,
    date: moment().format("YYYY-MM-DD"),
};

interface Props {
    projectId: number;
}

const AddIndirectCost = ({ projectId }: Props) => {
    const formik = useFormik({
        initialValues,
        validationSchema,
        onSubmit: async () => {
            await createIndirectCost();
        },
    });

    const queryClient = useQueryClient();
    const toast = useToast();

    const getAuthHeader = useAuthHeader();

    const { isLoading, mutateAsync: createIndirectCost } = useMutation(
        () =>
            postResource("indirectCosts", getAuthHeader(), {
                ...formik.values,
                projectId,
            }),
        {
            onSuccess: () => {
                queryClient.resetQueries(["indirect-costs", projectId]);
                toast({
                    title: "Indirect cost created",
                    status: "success",
                    duration: 3000,
                    isClosable: true,
                });
                formik.resetForm();
            },
            onError: (err: AxiosError) => {
                toast({
                    title: "Error creating indirect cost",
                    description: err.code,
                    status: "error",
                    duration: 3000,
                    isClosable: true,
                });
            },
        }
    );

    return (
        <Popover>
            <PopoverTrigger>
                <Button colorScheme={"green"}>New</Button>
            </PopoverTrigger>
            <PopoverContent>
                <PopoverArrow />
                <PopoverCloseButton />
                <PopoverHeader>Add indirect cost</PopoverHeader>
                <PopoverBody>
                    <chakra.form onSubmit={formik.handleSubmit}>
                        <VStack spacing={5}>
                            <FormikInput
                                name="description"
                                label="Description"
                                value={formik.values.description}
                                type={"text"}
                                onChange={formik.handleChange}
                                error={formik.errors.description}
                                touched={formik.touched.description}
                            />
                            <FormikInput
                                name="date"
                                label="Date"
                                value={formik.values.date}
                                type={"date"}
                                onChange={formik.handleChange}
                                error={formik.errors.date}
                                touched={formik.touched.date}
                            />
                            <FormikInput
                                name="amount"
                                label="Amount"
                                value={formik.values.amount}
                                type={"number"}
                                onChange={formik.handleChange}
                                error={formik.errors.amount}
                                touched={formik.touched.amount}
                            />
                            <LabeledReactSelectInput
                                label="Currency"
                                name="currencyId"
                                value={formik.values.currencyId}
                                error={formik.errors.currencyId}
                                touched={formik.touched.currencyId}
                                isClearable={false}
                                options={getCurrencies().map((c) => ({
                                    value: c.id,
                                    label: c.code,
                                }))}
                                setter={(value: any) =>
                                    formik.setFieldValue(
                                        "currencyId",
                                        value,
                                        true
                                    )
                                }
                                placeholder=""
                            />
                            <Button
                                colorScheme="green"
                                type="submit"
                                w="full"
                                isLoading={isLoading}
                                isDisabled={isLoading}
                            >
                                Submit
                            </Button>
                        </VStack>
                    </chakra.form>
                </PopoverBody>
            </PopoverContent>
        </Popover>
    );
};

export default AddIndirectCost;
