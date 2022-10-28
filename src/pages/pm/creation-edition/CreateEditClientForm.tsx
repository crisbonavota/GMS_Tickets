import {
    Button,
    chakra,
    GridItem,
    HStack,
    SimpleGrid,
    useToast,
    Text,
} from "@chakra-ui/react";
import * as Yup from "yup";
import FormikTextInput from "./FormikTextInput";
import { useFormik } from "formik";
import { useMutation, useQueryClient } from "react-query";
import CountryField from "./CountryField";
import { useAuthHeader } from "react-auth-kit";
import { postResource, patchResource } from "../../../api/api";
import LabeledReactSelectInput from "../../../components/LabeledReactSelectInput";
import StatusField from "./StatusField";

const validationSchema = Yup.object().shape({
    name: Yup.string().required("Name is required"),
    address: Yup.string().nullable(),
    city: Yup.string().nullable(),
    countryId: Yup.number(),
    fiscalId: Yup.string().nullable(),
    afipId: Yup.string().nullable(),
    ivaType: Yup.number().nullable(),
    active: Yup.bool(),
});

const initialValues = {
    name: "",
    address: "",
    city: "",
    countryId: 0,
    fiscalId: "",
    afipId: "",
    ivaType: 0,
    active: true,
};

interface Props {
    onClose: () => void;
    editInitialValues?: typeof initialValues;
    id?: number;
}

const CreateEditClientForm = ({ onClose, editInitialValues, id }: Props) => {
    const getAuthHeader = useAuthHeader();
    const toast = useToast();
    const queryClient = useQueryClient();

    const onSuccess = () => {
        queryClient.resetQueries("clients");
        queryClient.resetQueries(`client-${id}`);
        toast({
            title: `Client ${editInitialValues ? "updated" : "created"}`,
            status: "success",
            isClosable: true,
        });
        onClose();
    };

    const onError = (err: unknown) => {
        console.log(err);
        toast({
            title: "There was an error",
            description: "Try again later",
            status: "error",
            isClosable: true,
        });
    };

    const { mutateAsync: createClient, isLoading: creationLoading } =
        useMutation(
            () => postResource("companies", getAuthHeader(), formik.values),
            {
                onSuccess: onSuccess,
                onError: onError,
            }
        );

    const { mutateAsync: editClient, isLoading: editLoading } = useMutation(
        () =>
            // both id and editInitialValues won't be undefined if we're using this mutation
            patchResource(
                "companies",
                id || 0,
                getAuthHeader(),
                editInitialValues || {},
                formik.values
            ),
        {
            onSuccess: onSuccess,
            onError: onError,
        }
    );

    const formik = useFormik({
        initialValues: editInitialValues || initialValues,
        validationSchema,
        onSubmit: async () => {
            if (editInitialValues) await editClient();
            else await createClient();
        },
    });

    const alertText = "IMPORTANT: this will set inactive all accounts and jobs related to this client";

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
                    <LabeledReactSelectInput
                        label="IVA Type"
                        name="ivaType"
                        value={formik.values.ivaType}
                        error={formik.errors.ivaType}
                        touched={formik.touched.ivaType}
                        options={[
                            { value: 1, label: "Responsable Inscripto" },
                            { value: 2, label: "Reponsable No Inscripto" },
                            { value: 4, label: "Exento" },
                        ]}
                        setter={(value: number | null) =>
                            formik.setFieldValue("ivaType", value, true)
                        }
                        placeholder="IVA Type"
                    />
                </GridItem>
                <GridItem colSpan={1}>
                    <StatusField
                        setter={(value: boolean) =>
                            formik.setFieldValue("active", value, true)
                        }                     
                        value={formik.values.active === true ? 'active' : 'inactive'}
                        
                    />
                    <Text 
                        paddingTop={2} 
                        color={"red"}
                    >
                        {editInitialValues && formik.values.active === false ? alertText : ""}
                    </Text>
                </GridItem>
                <GridItem colSpan={{ base: 1, md: 2 }}>
                    <HStack
                        w="full"
                        justifyContent={"flex-end"}
                        p={5}
                    >
                        <Button type="button" onClick={onClose} variant="ghost">
                            Cancel
                        </Button>
                        <Button
                            type="submit"
                            colorScheme={"orange"}
                            isLoading={creationLoading || editLoading}
                            isDisabled={creationLoading || editLoading}
                        >
                            Submit
                        </Button>
                    </HStack>
                </GridItem>
            </SimpleGrid>
        </chakra.form>
    );
};

export default CreateEditClientForm;
