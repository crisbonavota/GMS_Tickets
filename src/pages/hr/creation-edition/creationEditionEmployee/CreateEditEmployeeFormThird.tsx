import {
  chakra,
  SimpleGrid,
  useToast,
  GridItem,
  HStack,
  Button,
  FormControl,
  FormErrorMessage,
  Input,
  FormLabel,
} from "@chakra-ui/react";
import * as Yup from "yup";
import { useAuthHeader } from "react-auth-kit";
import { useFormik } from "formik";
import { useMutation, useQueryClient } from "react-query";
import { Employee } from "../../../../api/types";
import { patchResource } from "../../../../api/api";



interface Props {
  onClose: () => void;
  editInitialValues?: Employee;
  id?: number;
  tabIndex: number;
  setTabIndex: (tabIndex: number) => void;
}

const validationSchema = Yup.object().shape({
  childs: Yup.number().typeError("Must be a number type"),
});

const initialValues = {
  childs: "",
  maritalStatus: "",
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

const CreateEditEmployeeForm = ({ onClose, editInitialValues, id, tabIndex, setTabIndex }: Props) => {
  const getAuthHeader = useAuthHeader();
  const queryClient = useQueryClient();
  const toast = useToast();
  // const { values, setValues } = useContext(EmployeeContext);

  const formik = useFormik({
    initialValues:
      editInitialValuesToFormikValues(editInitialValues) || initialValues,
    validationSchema,
    onSubmit: async () => {
      if (editInitialValues) await editEmployee();
      else {
        // setValues(formik.values)
        setTabIndex(tabIndex + 1)
      }
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
          <FormControl
            isInvalid={!!formik.errors.maritalStatus && !!formik.touched.maritalStatus}
          >
            <FormLabel fontWeight={"bold"}>Marital Status</FormLabel>
            <Input
              name="maritalStatus"
              id="maritalStatus"
              value={formik.values.maritalStatus}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            <FormErrorMessage>{formik.errors?.maritalStatus}</FormErrorMessage>
          </FormControl>
        </GridItem>
        <GridItem colSpan={1}>
        <FormControl
            isInvalid={!!formik.errors.childs && !!formik.touched.childs}
          >
          <FormLabel fontWeight={"bold"}>Children</FormLabel>
          <Input
            name="childs"
            id="childs"
            value={formik.values.childs}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
            <FormErrorMessage>{formik.errors?.childs}</FormErrorMessage>
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
              onClick={() => setTabIndex(tabIndex -1)}
              variant="outline"
              colorScheme={"orange"}
              minWidth={"8rem"}
            >
              Back
            </Button>
            <Button
              type="submit"
              colorScheme={"orange"}
              isLoading={editLoading}
              isDisabled={editLoading}
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
