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
import { useFormik, FormikErrors } from "formik";
import { useMutation, useQueryClient } from "react-query";
import { Employee } from "../../../../api/types";
import {
    getCurrencies,
    getMedicalCoverages,
    patchResource,
} from "../../../../api/api";
import { postResource } from "../../../../api/api";
import { useAppSelector } from "../../../../redux/hooks";
import BusinessUnitField from "../../../pm/creation-edition/BusinessUnitField";
import PositionField from "./PositionField";
import { AxiosError } from "axios";

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
    businessUnitId: Yup.number()
        .nullable()
        .required("Business unit is required"),
    positionId: Yup.number().nullable(),
});

const initialValues = {
    salaryCurrencyId: 0,
    medicalCoverageId: 0,
    businessUnitId: null,
    positionId: null,
};

const editInitialValuesToFormikValues = (editInitialValues?: Employee) =>
    editInitialValues
        ? {
              salaryCurrencyId: editInitialValues?.salaryCurrency?.id,
              medicalCoverageId: editInitialValues?.medicalCoverage?.id,
              businessUnitId: editInitialValues?.legacyUser?.businessUnit?.id,
              positionId: editInitialValues?.position?.id,
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
    const personalInfoState = useAppSelector(
        (p) => p.humanResources.crtEmployeePersonalInfo
    );
    const locationInfoState = useAppSelector(
        (l) => l.humanResources.crtEmployeeLocationInfo
    );
    const familyInfoState = useAppSelector(
        (f) => f.humanResources.crtEmployeeFamilyInfo
    );

    const formik = useFormik({
        initialValues:
            editInitialValuesToFormikValues(editInitialValues) || initialValues,
        validationSchema,
        onSubmit: async () => {
            const personalInfoFormErrors =
                await personalInfoForm.validateForm();
            const personalInfoFormValid =
                Object.keys(personalInfoFormErrors).length === 0;

            const locationInfoFormErrors =
                await locationInfoForm.validateForm();
            const locationInfoFormValid =
                Object.keys(locationInfoFormErrors).length === 0;

            const familyInfoFormErrors = await familyInfoForm.validateForm();
            const familyInfoFormValid =
                Object.keys(familyInfoFormErrors).length === 0;

            personalInfoForm.onSubmit();
            locationInfoForm.onSubmit();
            familyInfoForm.onSubmit();

            if (!personalInfoFormValid) {
                setTabIndex(0);
                return;
            }
            if (!locationInfoFormValid) {
                setTabIndex(1);
                return;
            }
            if (!familyInfoFormValid) {
                setTabIndex(2);
                return;
            }
            if (editInitialValues) {
                editEmployee();
            } else {
                createEmployee();
            }
        },
    });

    const onSuccess = () => {
        queryClient.resetQueries("employees");
        queryClient.resetQueries("employee");
        queryClient.resetQueries(`employee-${id}`);
        toast({
            title: editInitialValues ? "Employee updated" : "Employee created",
            status: "success",
            isClosable: true,
        });
        onClose();
    };

    const onError = (err: AxiosError) => {
        console.log(err);
        toast({
            title: "Error",
            description: <>{err?.response?.data || "Try again later"}</>,
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
                        <FormLabel>Salary Currency</FormLabel>
                        <Select
                            placeholder="Select option"
                            name="salaryCurrencyId"
                            id="salaryCurrencyId"
                            value={formik.values.salaryCurrencyId}
                            onChange={(event) => {
                                formik.setFieldValue(
                                    "salaryCurrencyId",
                                    event.target.value
                                );
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
                        <FormLabel>Medical Coverage</FormLabel>
                        <Select
                            placeholder="Select option"
                            name="medicalCoverageId"
                            id="medicalCoverageId"
                            value={formik.values.medicalCoverageId}
                            onChange={(event) => {
                                formik.setFieldValue(
                                    "medicalCoverageId",
                                    event.target.value
                                );
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
                        error={formikEmploymentInfo.errors.businessUnitId}
                        touched={formikEmploymentInfo.touched.businessUnitId}
                        isRequired={true}
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
                    <PositionField
                        setter={(value: number | null) =>
                            formik.setFieldValue("positionId", value, true)
                        }
                        error={formik.errors.positionId}
                        touched={formik.touched.positionId}
                        defaultValue={
                            editInitialValues
                                ? {
                                      value: editInitialValues?.position?.id,
                                      label: editInitialValues?.position?.name,
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
