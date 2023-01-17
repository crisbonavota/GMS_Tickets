import {
  chakra,
  SimpleGrid,
  useToast,
  GridItem,
  HStack,
  Button,
  FormControl,
  FormErrorMessage,
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
import BusinessUnitField from "../../../pm/creation-edition/BusinessUnitField";

interface Props {
  onClose: () => void;
  editInitialValues?: Employee;
  id?: number;
  tabIndex: number;
  setTabIndex: (tabIndex: number) => void;
}

const validationSchema = Yup.object().shape({
  salaryCurrencyId: Yup.number().nullable(),
  medicalCoverageId: Yup.number().nullable(),
  businessUnitId: Yup.number().required("Business unit is required"),
});

const initialValues = {
  salaryCurrencyId: 0,
  medicalCoverageId: 0,
  businessUnitId: null,
};

const editInitialValuesToFormikValues = (editInitialValues?: Employee) =>
  editInitialValues
    ? {
        salaryCurrencyId: editInitialValues?.salaryCurrency?.id,
        medicalCoverageId: editInitialValues?.medicalCoverage?.id,
        businessUnitId: editInitialValues?.legacyUser?.businessUnit?.id,
      }
    : undefined;

const CrtEditEmployeeFormEmploymentInfo = ({
  onClose,
  editInitialValues,
  id,
  tabIndex,
  setTabIndex,
}: Props) => {
  const getAuthHeader = useAuthHeader();
  const queryClient = useQueryClient();
  const toast = useToast();
  const personalInfoState = useAppSelector((p) => p.humanResources.crtEmployeePersonalInfo);
  const locationInfoState = useAppSelector((l) => l.humanResources.crtEmployeeLocationInfo);
  const familyInfoState = useAppSelector((f) => f.humanResources.crtEmployeeFamilyInfo);

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
    queryClient.resetQueries("getEmployeeById");
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
      () =>
        postResource("employees", getAuthHeader(), {
          ...formik.values,
          ...personalInfoState,
          ...locationInfoState,
          ...familyInfoState,
        }),
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
        editInitialValuesToFormikValues(editInitialValues)!,
        {
          ...formik.values,
          ...personalInfoState,
          ...locationInfoState,
          ...familyInfoState,
        }
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
    () => getMedicalCoverages(),
    { select: (m) => m }
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
              onChange={(event) => {
                formik.setFieldValue("salaryCurrencyId", event.target.value);
              }}
              onBlur={formik.handleBlur}
            >
              {successCurrencies &&
                currencies.map((el) => (
                  <chakra.option key={el.id} value={el.id}>
                    {el.code}
                  </chakra.option>
                ))}
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
              onChange={(event) => {
                formik.setFieldValue("medicalCoverageId", event.target.value);
              }}
              onBlur={formik.handleBlur}
            >
              {successMedCoverages &&
                medicalCoverages.map((el) => (
                  <chakra.option key={el.id} value={el.id}>
                    {el.name}
                  </chakra.option>
                ))}
            </Select>
            <FormErrorMessage>
              {formik.errors?.medicalCoverageId}
            </FormErrorMessage>
          </FormControl>
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
                  value: editInitialValues.legacyUser.businessUnit.id,
                  label: editInitialValues.legacyUser.businessUnit.name,
                }
              : undefined
            }
          />
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

export default CrtEditEmployeeFormEmploymentInfo;
