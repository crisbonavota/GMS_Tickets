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
import { VStack, useToast } from "@chakra-ui/react";
import { useMutation, useQueryClient } from "react-query";
import { useAuthHeader } from "react-auth-kit";
import moment from "moment";
import { AxiosError } from "axios";
import { getCurrencies, postResource } from "../../../api/api";
import FormikSelectInput from "../../../pages/pm/creation-edition/FormikSelectInput";
import FormikInput from "../../FormikInput";

const validationSchema = Yup.object().shape({
    price: Yup.number()
        .required("Rate is required")
        .min(0, "Rate must be greater than 0"),
    targetCurrencyId: Yup.number().required("Currency is required"),
    date: Yup.date().required("Date is required"),
});

const initialValues = {
    price: 1,
    targetCurrencyId: 1,
    date: moment().format("YYYY-MM-DD"),
};

const AddCurrencyExchangeRate = () => {
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
            postResource("currencies/exchange", getAuthHeader(), {
                ...formik.values,
                baseCurrencyId: getCurrencies().find((c) => c.code === "USD")
                    ?.id,
            }),
        {
            onSuccess: () => {
                queryClient.resetQueries(["currencies-exchange"]);
                toast({
                    title: "Currency exchange rate added",
                    status: "success",
                    duration: 3000,
                    isClosable: true,
                });
                formik.resetForm();
            },
            onError: (err: AxiosError) => {
                toast({
                    title: "Error adding currency exchange rate",
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
                <PopoverHeader>Add currency exchange rate</PopoverHeader>
                <PopoverBody>
                    <chakra.form onSubmit={formik.handleSubmit}>
                        <VStack spacing={5}>
                            <FormikInput
                                name="price"
                                label="Rate (1 USD = ?)"
                                value={formik.values.price}
                                type={"number"}
                                onChange={formik.handleChange}
                                error={formik.errors.price}
                                touched={formik.touched.price}
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
                            <FormikSelectInput
                                name="targetCurrencyId"
                                id="targetCurrencyId"
                                value={formik.values.targetCurrencyId}
                                onChange={formik.handleChange}
                                error={formik.errors.targetCurrencyId}
                                touched={formik.touched.targetCurrencyId}
                                label="Target currency"
                                children={getCurrencies()
                                    .filter((c) => c.code !== "USD")
                                    .map((ct) => (
                                        <option key={ct.id} value={ct.id}>
                                            {ct.code}
                                        </option>
                                    ))}
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

export default AddCurrencyExchangeRate;
