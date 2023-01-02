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
} from "@chakra-ui/react";
import * as Yup from "yup";
import { useAuthHeader } from "react-auth-kit";
import { useFormik } from "formik";
import { useMutation, useQueryClient } from "react-query";
import { Employee } from "../../../../api/types";
import { patchResource } from "../../../../api/api";
import { postResource } from "../../../../api/api";
import CountryField from "../../../pm/creation-edition/CountryField";

interface Props {
  onClose: () => void;
  editInitialValues?: Employee;
  id?: number;
}

const validationSchema = Yup.object().shape({
  firstName: Yup.string().required("First name is required"),
  lastName: Yup.string().required("Last name is required"),
  birthDate: Yup.string().required("Date of Birth is required"),
  gender: Yup.string().required("Gender is required"),
  email: Yup.string()
    .required("Email is required")
    .email("Invalid email format"),
});

const initialValues = {
  countryId: 0,
  birthCountryId: null,
  address: null,
  city: "",
};

const editInitialValuesToFormikValues = (editInitialValues?: Employee) =>
  editInitialValues
    ? {
        ...editInitialValues,
        firstName: editInitialValues.firstName.replace(
          ` (${editInitialValues.id})`,
          ""
        ),
        active: editInitialValues?.active,
      }
    : undefined;

const CreateEditEmployeeForm = ({ onClose, editInitialValues, id }: Props) => {
  const getAuthHeader = useAuthHeader();
  const queryClient = useQueryClient();
  const toast = useToast();

  const formik = useFormik({
    initialValues:
      editInitialValuesToFormikValues(editInitialValues) || initialValues,
    validationSchema,
    onSubmit: async () => {
      if (editInitialValues) await editEmployee();
      else await createEmployee();
    },
  });

  const onSuccess = () => {
    queryClient.resetQueries("employees");
    queryClient.resetQueries(`employee-${id}`);
    toast({
      title: editInitialValues ? "Employee updated" : "Employee created",
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

  const { mutateAsync: createEmployee, isLoading: creationLoading } =
    useMutation(
      () => postResource("employees", getAuthHeader(), formik.values),
      {
        onSuccess: onSuccess,
        onError: onError,
      }
    );

  const { mutateAsync: editEmployee, isLoading: editLoading } = useMutation(
    () =>
      patchResource(
        "employees",
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
        <FormLabel fontWeight={"bold"}>Nationality</FormLabel>
          <CountryField
            name="birthCountryId"
            id="birthCountryId"
            value={formik.values.birthCountryId}
            error={formik.errors.birthCountryId}
            onChange={formik.handleChange}
          />
        </GridItem>
        <GridItem colSpan={1}>
        <FormLabel fontWeight={"bold"}>Country of Residence</FormLabel>
        <CountryField
            name="countryId"
            value={formik.values.countryId}
            error={formik.errors.countryId}
            onChange={formik.handleChange}
            id="countryId"
          />
        </GridItem>
        <GridItem colSpan={1}>
          <FormLabel fontWeight={"bold"}>Address Line 1</FormLabel>
          <Input
            name="address"
            id="address"
            value={formik.values.address?.street}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
        </GridItem>
        <GridItem colSpan={1}>
          <FormLabel fontWeight={"bold"}>Address Line 2/Apartment</FormLabel>
          <Input
            name="address"
            id="address"
            value={formik.values.address?.floor}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
        </GridItem>
        <GridItem colSpan={1}>
          <FormControl
            isInvalid={!!formik.errors.address && !!formik.touched.address}
          >
            <FormLabel fontWeight={"bold"} fontSize={"sm"}>
              City
            </FormLabel>
            <Input
              name="city"
              id="city"
              value={formik.values.city}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
          </FormControl>
        </GridItem>
        <GridItem colSpan={{ base: 1, md: 2 }}>
          <HStack
            w="full"
            justifyContent={"space-between"}
            spacing={5}
            marginTop={"1rem"}
          >
            <Button
              type="button"
              onClick={onClose}
              variant="outline"
              colorScheme={"orange"}
              minWidth={"8rem"}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              colorScheme={"orange"}
              isLoading={creationLoading || editLoading}
              isDisabled={creationLoading || editLoading}
              minWidth={"8rem"}
            >
              Next
            </Button>
          </HStack>
        </GridItem>
      </SimpleGrid>
    </chakra.form>
  );
};

export default CreateEditEmployeeForm;
