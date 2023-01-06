import {
    chakra,
    SimpleGrid,
    useToast,
    GridItem,
    HStack,
    Button,
} from "@chakra-ui/react";
import * as Yup from "yup";
import { useAuthHeader } from "react-auth-kit";
import { useFormik } from "formik";
import { useMutation, useQueryClient } from "react-query";
import { Provider } from "../../../api/types";
import { patchResource } from "../../../api/api";
import {
    postResource,
} from "../../../api/api";
import StatusField from "../../pm/creation-edition/StatusField";
import FormikTextInput from "../../pm/creation-edition/FormikTextInput";

interface Props {
    onClose: () => void;
    editInitialValues?: Provider;
    id?: number;
}

const validationSchema = Yup.object().shape({
    firstName: Yup.string().required("First name is required"),
    active: Yup.bool(),
});

const initialValues = {
    firstName: "",
    active: true,
};

const editInitialValuesToFormikValues = (editInitialValues?: Provider) =>
    editInitialValues
        ? {
              ...editInitialValues,
              firstName: editInitialValues.firstName.replace(` (${editInitialValues.id})`, ""),
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

    const { mutateAsync: createProvider, isLoading: creationLoading } = useMutation(
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
                <GridItem colSpan={1}>
                    <FormikTextInput
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
                    <StatusField
                        setter={(value: boolean) =>
                            formik.setFieldValue("active", value, true)
                        }
                        value={formik.values.active === true ? 'active' : 'inactive'}
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
