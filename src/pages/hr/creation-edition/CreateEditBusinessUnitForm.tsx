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
import { BusinessUnit } from "../../../api/types";
import { patchResource } from "../../../api/api";
import { postResource } from "../../../api/api";
import StatusField from "../../pm/creation-edition/StatusField";
import FormikInput from "../../../components/FormikInput";

interface Props {
    onClose: () => void;
    editInitialValues?: BusinessUnit;
    id?: number;
}

const validationSchema = Yup.object().shape({
    name: Yup.string().required("Name is required"),
    active: Yup.bool(),
});

const initialValues = {
    name: "",
    active: true,
};

const editInitialValuesToFormikValues = (editInitialValues?: BusinessUnit) =>
    editInitialValues
        ? {
              ...editInitialValues,
              name: editInitialValues.name.replace(
                  ` (${editInitialValues.id})`,
                  ""
              ),
              active: editInitialValues?.active,
          }
        : undefined;

const CreateEditBusinessUnitForm = ({
    onClose,
    editInitialValues,
    id,
}: Props) => {
    const getAuthHeader = useAuthHeader();
    const queryClient = useQueryClient();
    const toast = useToast();

    const formik = useFormik({
        initialValues:
            editInitialValuesToFormikValues(editInitialValues) || initialValues,
        validationSchema,
        onSubmit: async () => {
            if (editInitialValues) await editBU();
            else await createBU();
        },
    });

    const onSuccess = () => {
        queryClient.resetQueries("businessUnits");
        queryClient.resetQueries(`businessUnit-${id}`);
        toast({
            title: editInitialValues
                ? "Business unit updated"
                : "Business unit created",
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

    const { mutateAsync: createBU, isLoading: creationLoading } = useMutation(
        () => postResource("businessUnits", getAuthHeader(), formik.values),
        {
            onSuccess: onSuccess,
            onError: onError,
        }
    );

    const { mutateAsync: editBU, isLoading: editLoading } = useMutation(
        () =>
            patchResource(
                "businessUnits",
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
                    <FormikInput
                        name="name"
                        id="name"
                        value={formik.values.name}
                        onChange={formik.handleChange}
                        error={formik.errors.name}
                        touched={formik.touched.name}
                        label="Name"
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

export default CreateEditBusinessUnitForm;
