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
  Select,
} from "@chakra-ui/react";
import * as Yup from "yup";
import { useAuthHeader } from "react-auth-kit";
import { useFormik } from "formik";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { Employee } from "../../../../api/types";
import {
  getCurrencies,
  getMedicalCoverages,
  patchResource,
} from "../../../../api/api";
import { postResource } from "../../../../api/api";
import { useAppSelector } from "../../../../redux/hooks";

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
  salaryCurrencyId: 0,
  medicalCoverageId: 0,
};

const editInitialValuesToFormikValues = (editInitialValues?: Employee) =>
  editInitialValues
    ? {
        ...editInitialValues,
        firstName: editInitialValues.firstName.replace(
          ` (${editInitialValues.id})`,
          ""
        ),
        salaryCurrencyId: editInitialValues?.salaryCurrency.id,
        medicalCoverageId: editInitialValues?.medicalCoverage.id,
        active: editInitialValues?.active,
      }
    : undefined;

const CreateEditEmployeeForm = ({
  onClose,
  editInitialValues,
  id,
  tabIndex,
  setTabIndex,
}: Props) => {
  const getAuthHeader = useAuthHeader();
  const queryClient = useQueryClient();
  const toast = useToast();
  const personalInfoState = useAppSelector((p) => p.hr.crtEmployeePersonalInfo);
  const locationInfoState = useAppSelector((l) => l.hr.crtEmployeeLocationInfo);
  const familyInfoState = useAppSelector((f) => f.hr.crtEmployeeFamilyInfo);

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
      () => postResource("employees", getAuthHeader(), {...formik.values, ...personalInfoState, ...locationInfoState, ...familyInfoState}),
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

  const { data: currencies, isSuccess: successCurrencies } = useQuery(
    "currency",
    () => getCurrencies()
  );

  const { data: medicalCoverages, isSuccess: successMedCoverages } = useQuery(
    "medicalCoverage",
    () => getMedicalCoverages()
  );

  return (
    <chakra.form w={"full"} onSubmit={formik.handleSubmit}>
      <SimpleGrid columns={{ base: 1, md: 2 }} spacing={4}>
        <GridItem colSpan={1}>
          <FormControl
            isInvalid={
              !!formik.errors.salaryCurrencyId &&
              !!formik.touched.salaryCurrencyId
            }
          >
            <FormLabel fontWeight={"bold"}>Salary Currency</FormLabel>
            <Select
              placeholder="Select option"
              name="salaryCurrencyId"
              id="salaryCurrencyId"
              value={formik.values.salaryCurrencyId}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            >
              {successCurrencies &&
                currencies.map((el) => <option key={el.id}>{el.code}</option>)}
            </Select>
            <FormErrorMessage>
              {formik.errors?.salaryCurrencyId}
            </FormErrorMessage>
          </FormControl>
        </GridItem>
        <GridItem colSpan={1}>
          <FormControl
            isInvalid={
              !!formik.errors.medicalCoverageId &&
              !!formik.touched.medicalCoverageId
            }
          >
            <FormLabel fontWeight={"bold"}>Medical Coverage</FormLabel>
            <Select
              placeholder="Select option"
              name="medicalCoverageId"
              id="medicalCoverageId"
              value={formik.values.medicalCoverageId}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            >
              {successMedCoverages &&
                medicalCoverages.map((el) => (
                  <option key={el.id}>{el.name}</option>
                ))}
            </Select>
            <FormErrorMessage>
              {formik.errors?.salaryCurrencyId}
            </FormErrorMessage>
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
              onClick={() => setTabIndex(tabIndex - 1)}
              variant="outline"
              colorScheme={"orange"}
              minWidth={"8rem"}
            >
              Back
            </Button>
            <Button
              type="submit"
              colorScheme={"orange"}
              isLoading={creationLoading || editLoading}
              isDisabled={creationLoading || editLoading}
              minWidth={"8rem"}
            >
              Save
            </Button>
          </HStack>
        </GridItem>
      </SimpleGrid>
    </chakra.form>
  );
};

export default CreateEditEmployeeForm;
