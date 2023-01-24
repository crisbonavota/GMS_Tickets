import {
    chakra,
    SimpleGrid,
    useToast,
    GridItem,
    HStack,
    Button,
    FormControl,
    Input,
    FormLabel,
    FormErrorMessage,
} from "@chakra-ui/react";
import * as Yup from "yup";
import { useAuthHeader } from "react-auth-kit";
import { useFormik } from "formik";
import { useMutation, useQueryClient } from "react-query";
import { Provider } from "../../../api/types";
import { patchResource } from "../../../api/api";
import { postResource } from "../../../api/api";
import StatusField from "../../pm/creation-edition/StatusField";
import BusinessUnitField from "../../pm/creation-edition/BusinessUnitField";
import FormikInput from "../../../components/FormikInput";

interface Props {
    onClose: () => void;
    editInitialValues?: Provider;
    id?: number;
}

const validationSchema = Yup.object().shape({
    firstName: Yup.string().required("First name is required"),
    lastName: Yup.string().required("Last name is required"),
    email: Yup.string()
        .required("Email is required")
        .email("Invalid email format"),
    businessUnitId: Yup.number().required("Business unit is required"),
    afipId: Yup.string().nullable(),
    businessName: Yup.string().nullable(),
    phone: Yup.string().nullable(),
    address: Yup.string().nullable(),
    city: Yup.string().nullable(),
    active: Yup.bool(),
});

const initialValues = {
    fileNumber: 0,
    firstName: "",
    lastName: "",
    afipId: "",
    businessName: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    businessUnitId: null,
    active: true,
};

const editInitialValuesToFormikValues = (editInitialValues?: Provider) =>
    editInitialValues
        ? {
              ...editInitialValues,
              firstName: editInitialValues.firstName.replace(
                  ` (${editInitialValues.id})`,
                  ""
              ),
              businessUnitId: editInitialValues?.legacyUser?.businessUnit?.id,
              active: editInitialValues?.active,
          }
        : undefined;

const CreateEditProviderForm = ({ onClose, editInitialValues, id }: Props) => {
    const getAuthHeader = useAuthHeader();
    const queryClient = useQueryClient();
    const toast = useToast();

    const formik = useFormik({
        initialValues:
            editInitialValuesToFormikValues(editInitialValues) || initialValues,
        validationSchema,
        onSubmit: async () => {
            if (editInitialValues) await editProvider();
            else await createProvider();
        },
    });

    const onSuccess = () => {
        queryClient.resetQueries("providers");
        queryClient.resetQueries(`provider-${id}`);
        toast({
            title: editInitialValues ? "Provider updated" : "Provider created",
            status: "success",
            isClosable: true,
        });
        onClose();
    };

    const onError = (err: unknown) => {
        console.log(err);
        toast({
            title: "Error",
            description: "Try again later",
            status: "error",
        });
    };

    const { mutateAsync: createProvider, isLoading: creationLoading } =
        useMutation(
            () => postResource("providers", getAuthHeader(), formik.values),
            {
                onSuccess: onSuccess,
                onError: onError,
            }
        );

    const { mutateAsync: editProvider, isLoading: editLoading } = useMutation(
        () =>
            patchResource(
                "providers",
                id || 0,
                getAuthHeader(),
                editInitialValuesToFormikValues(editInitialValues) || {},
                formik.values
            ),
        {
            onSuccess: onSuccess,
            onError: onError,
        }
    );

    return (
        <chakra.form w={"full"} onSubmit={formik.handleSubmit}>
            <SimpleGrid columns={{ base: 1, md: 2 }} spacing={4}>
                {editInitialValues && (
                    <GridItem colSpan={1}>
                        <FormControl
                            isRequired
                            isInvalid={
                                !!formik.errors.fileNumber &&
                                !!formik.touched.fileNumber
                            }
                        >
                            <FormLabel fontWeight={"bold"}>
                                File Number
                            </FormLabel>
                            <Input
                                name="fileNumber"
                                id="fileNumber"
                                value={formik.values.fileNumber}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                            />
                            <FormErrorMessage>
                                {formik.errors?.fileNumber}
                            </FormErrorMessage>
                        </FormControl>
                    </GridItem>
                )}
                <GridItem colSpan={1}>
                    <FormikInput
                        name="firstName"
                        id="firstName"
                        value={formik.values.firstName}
                        onChange={formik.handleChange}
                        error={formik.errors.firstName}
                        touched={formik.touched.firstName}
                        label="First name"
                    />
                </GridItem>
                <GridItem colSpan={1}>
                    <FormikInput
                        name="lastName"
                        id="lastName"
                        value={formik.values.lastName}
                        onChange={formik.handleChange}
                        error={formik.errors.lastName}
                        touched={formik.touched.lastName}
                        label="Last name"
                    />
                </GridItem>
                <GridItem colSpan={1}>
                    <FormikInput
                        name="afipId"
                        id="afipId"
                        value={formik.values.afipId}
                        onChange={formik.handleChange}
                        error={formik.errors.afipId}
                        touched={formik.touched.afipId}
                        label="DNI/CUIT/BRA/USA"
                    />
                </GridItem>
                <GridItem colSpan={1}>
                    <FormikInput
                        name="businessName"
                        id="businessName"
                        value={formik.values.businessName}
                        onChange={formik.handleChange}
                        error={formik.errors.businessName}
                        touched={formik.touched.businessName}
                        label="Business name"
                    />
                </GridItem>
                <GridItem colSpan={1}>
                    <FormikInput
                        name="email"
                        id="email"
                        value={formik.values.email}
                        onChange={formik.handleChange}
                        error={formik.errors.email}
                        touched={formik.touched.email}
                        label="Email"
                    />
                </GridItem>
                <GridItem colSpan={1}>
                    <FormikInput
                        name="phone"
                        id="phone"
                        value={formik.values.phone}
                        onChange={formik.handleChange}
                        error={formik.errors.phone}
                        touched={formik.touched.phone}
                        label="Phone"
                    />
                </GridItem>
                <GridItem colSpan={1}>
                    <FormikInput
                        name="address"
                        id="address"
                        value={formik.values.address}
                        onChange={formik.handleChange}
                        error={formik.errors.address}
                        touched={formik.touched.address}
                        label="Address"
                    />
                </GridItem>
                <GridItem colSpan={1}>
                    <FormikInput
                        name="city"
                        id="city"
                        value={formik.values.city}
                        onChange={formik.handleChange}
                        error={formik.errors.city}
                        touched={formik.touched.city}
                        label="City"
                    />
                </GridItem>
                <GridItem colSpan={1}>
                    <BusinessUnitField
                        setter={(value: number | null) =>
                            formik.setFieldValue("businessUnitId", value, true)
                        }
                        error={formik.errors.businessUnitId}
                        touched={formik.touched.businessUnitId}
                        defaultValue={
                            editInitialValues
                                ? {
                                      value: editInitialValues.legacyUser
                                          .businessUnit.id,
                                      label: editInitialValues.legacyUser
                                          .businessUnit.name,
                                  }
                                : undefined
                        }
                    />
                </GridItem>
                <GridItem colSpan={1}>
                    <StatusField
                        setter={(value: boolean) =>
                            formik.setFieldValue("active", value, true)
                        }
                        value={
                            formik.values.active === true
                                ? "active"
                                : "inactive"
                        }
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

export default CreateEditProviderForm;
