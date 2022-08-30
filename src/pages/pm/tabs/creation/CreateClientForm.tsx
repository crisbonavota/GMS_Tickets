import {
    Button,
    chakra,
    GridItem,
    HStack,
    SimpleGrid,
    useToast,
} from "@chakra-ui/react";
import * as Yup from "yup";
import FormikTextInput from "./FormikTextInput";
import { useFormik } from "formik";
import FormikSelectInput from "./FormikSelectInput";
import { useMutation, useQueryClient } from "react-query";
import CountryField from "./CountryField";
import { useAuthHeader } from "react-auth-kit";
import { postResource } from "../../../../api/api";

const validationSchema = Yup.object().shape({
    name: Yup.string().required("Name is required"),
    address: Yup.string(),
    city: Yup.string(),
    countryId: Yup.number(),
    fiscalId: Yup.string(),
    afipId: Yup.string(),
    IVAType: Yup.string(),
});

const initialValues = {
    name: "",
    address: "",
    city: "",
    countryId: 0,
    fiscalId: "",
    afipId: "",
    IVAType: 0,
};

interface Props {
    onClose: () => void;
}

const CreateClientForm = ({ onClose }: Props) => {
    const getAuthHeader = useAuthHeader();
    const toast = useToast();
    const queryClient = useQueryClient();

    const { mutateAsync: createClient, isLoading } = useMutation(
        () => postResource("companies", getAuthHeader(), formik.values),
        {
            onSuccess: () => {
                queryClient.resetQueries("clients");
                toast({
                    title: "Client created",
                    status: "success",
                    isClosable: true,
                });
                onClose();
            },
            onError: (error) => {
                console.log(error);
                toast({
                    title: "There was an error creating the client",
                    description: "Try again later",
                    status: "error",
                    isClosable: true,
                });
            },
        }
    );

    const formik = useFormik({
        initialValues,
        validationSchema,
        onSubmit: async (values) => {
            await createClient();
        },
    });

    return (
        <chakra.form w={"full"} onSubmit={formik.handleSubmit}>
            <SimpleGrid columns={{ base: 1, md: 2 }} spacing={4}>
                <GridItem colSpan={{ base: 1, md: 2 }}>
                    <FormikTextInput
                        id={"name"}
                        label={"Name"}
                        name={"name"}
                        value={formik.values.name}
                        error={formik.errors.name}
                        touched={formik.touched.name}
                        onChange={formik.handleChange}
                    />
                </GridItem>
                <GridItem colSpan={1}>
                    <FormikTextInput
                        id={"address"}
                        label={"Address"}
                        name={"address"}
                        value={formik.values.address}
                        error={formik.errors.address}
                        touched={formik.touched.address}
                        onChange={formik.handleChange}
                    />
                </GridItem>
                <GridItem colSpan={1}>
                    <FormikTextInput
                        id={"city"}
                        label={"City"}
                        name={"city"}
                        value={formik.values.city}
                        error={formik.errors.city}
                        touched={formik.touched.city}
                        onChange={formik.handleChange}
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
                    <FormikTextInput
                        label="Fiscal ID"
                        name="fiscalId"
                        value={formik.values.fiscalId}
                        error={formik.errors.fiscalId}
                        touched={formik.touched.fiscalId}
                        onChange={formik.handleChange}
                        id="fiscalId"
                    />
                </GridItem>
                <GridItem colSpan={1}>
                    <FormikTextInput
                        label="CUIT/CUIL"
                        name="afipId"
                        value={formik.values.afipId}
                        error={formik.errors.afipId}
                        touched={formik.touched.afipId}
                        onChange={formik.handleChange}
                        id="afipId"
                    />
                </GridItem>
                <GridItem colSpan={1}>
                    <FormikSelectInput
                        label="IVA Type"
                        name="IVAType"
                        value={formik.values.IVAType}
                        error={formik.errors.IVAType}
                        touched={formik.touched.IVAType}
                        onChange={formik.handleChange}
                        id="IVAType"
                        children={[
                            <option value={0}>Select an IVA type</option>,
                        ].concat(
                            [
                                "IVA Responsable Inscripto",
                                "IVA Responsable no Inscripto",
                                "IVA Exento",
                            ].map((t, i) => (
                                <chakra.option value={i + 1} key={t}>
                                    {t}
                                </chakra.option>
                            ))
                        )}
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
                        >
                            Create Client
                        </Button>
                    </HStack>
                </GridItem>
            </SimpleGrid>
        </chakra.form>
    );
};

export default CreateClientForm;
