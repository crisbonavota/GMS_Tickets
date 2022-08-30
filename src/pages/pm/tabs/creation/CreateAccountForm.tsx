import {
    Button,
    chakra,
    GridItem,
    HStack,
    SimpleGrid,
    useToast,
} from "@chakra-ui/react";
import { useFormik } from "formik";
import * as Yup from "yup";
import FormikTextInput from "./FormikTextInput";
import ClientField from "./ClientField";
import CountryField from "./CountryField";
import LeadField from "./LeadField";
import { useMutation, useQueryClient } from "react-query";
import { useAuthHeader } from "react-auth-kit";
import { postResource } from "../../../../api/api";

interface Props {
    onClose: () => void;
}

const validationSchema = Yup.object().shape({
    name: Yup.string().required("Name is required"),
    countryId: Yup.number(),
    notes: Yup.string(),
    companyId: Yup.number().nullable().required("Client is required"),
    responsibleLegacyUserId: Yup.number()
        .nullable()
        .required("Leader is required"),
});

const initialValues = {
    name: "",
    countryId: 0,
    notes: "",
    companyId: null,
    responsibleLegacyUserId: null,
};

const CreateAccountForm = ({ onClose }: Props) => {
    const getAuthHeader = useAuthHeader();
    const queryClient = useQueryClient();
    const toast = useToast();
    const formik = useFormik({
        initialValues,
        validationSchema,
        onSubmit: async () => {
            await createAccount();
        },
    });

    const { mutateAsync: createAccount, isLoading } = useMutation(
        () => postResource("accounts", getAuthHeader(), formik.values),
        {
            onSuccess: () => {
                queryClient.resetQueries("clients");
                toast({
                    title: "Account created",
                    status: "success",
                    isClosable: true,
                });
                onClose();
            },
            onError: (error) => {
                console.log(error);
                toast({
                    title: "Error creating account",
                    description: "Try again later",
                    status: "error",
                });
            },
        }
    );

    return (
        <chakra.form onSubmit={formik.handleSubmit} w={"full"}>
            <SimpleGrid columns={{ base: 1, md: 2 }} spacing={4}>
                <GridItem colSpan={1}>
                    <FormikTextInput
                        name="name"
                        id="name"
                        value={formik.values.name}
                        onChange={formik.handleChange}
                        label="Name"
                        error={formik.errors.name}
                        touched={formik.touched.name}
                    />
                </GridItem>
                <GridItem colSpan={1}>
                    <ClientField
                        setter={(value: number | null) =>
                            formik.setFieldValue("companyId", value, true)
                        }
                        value={formik.values.companyId}
                        error={formik.errors.companyId}
                        touched={formik.touched.companyId}
                        name="companyId"
                    />
                </GridItem>
                <GridItem colSpan={1}>
                    <CountryField
                        label="Country"
                        name="countryId"
                        value={formik.values.countryId}
                        error={formik.errors.countryId}
                        touched={formik.touched.countryId}
                        onChange={formik.handleChange}
                        id="countryId"
                    />
                </GridItem>
                <GridItem colSpan={1}>
                    <LeadField
                        setter={(value: number | null) =>
                            formik.setFieldValue(
                                "responsibleLegacyUserId",
                                value,
                                true
                            )
                        }
                        error={formik.errors.responsibleLegacyUserId}
                        touched={formik.touched.responsibleLegacyUserId}
                        name="responsibleLegacyUserId"
                    />
                </GridItem>
                <GridItem colSpan={{ base: 1, md: 2 }}>
                    <FormikTextInput
                        name="notes"
                        id="notes"
                        value={formik.values.notes}
                        onChange={formik.handleChange}
                        label="Notes"
                        error={formik.errors.notes}
                        touched={formik.touched.notes}
                    />
                </GridItem>
                <GridItem colSpan={{ base: 1, md: 2 }}>
                    <HStack
                        w="full"
                        justifyContent={"flex-end"}
                        spacing={5}
                        p={5}
                    >
                        <Button type="button" onClick={onClose} variant="ghost">
                            Cancel
                        </Button>
                        <Button
                            type="submit"
                            colorScheme={"orange"}
                            isLoading={isLoading}
                            disabled={isLoading}
                        >
                            Create Account
                        </Button>
                    </HStack>
                </GridItem>
            </SimpleGrid>
        </chakra.form>
    );
};
export default CreateAccountForm;
