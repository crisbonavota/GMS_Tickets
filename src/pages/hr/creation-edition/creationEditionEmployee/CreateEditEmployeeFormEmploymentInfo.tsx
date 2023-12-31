import {
    chakra,
    SimpleGrid,
    useToast,
    GridItem,
    HStack,
    Button,
} from "@chakra-ui/react";
import * as Yup from "yup";
import { useAuthHeader, useAuthUser } from "react-auth-kit";
import { FormikErrors, useFormik } from "formik";
import { useMutation, useQueryClient } from "react-query";
import { ApplicationUserPrivate, Employee } from "../../../../api/types";
import {
    getCurrencies,
    getEmployers,
    getMedicalCoverages,
    getWorkTime,
    patchResource,
} from "../../../../api/api";
import { postResource } from "../../../../api/api";
import { useAppSelector } from "../../../../redux/hooks";
import BusinessUnitField from "../../../pm/creation-edition/BusinessUnitField";
import PositionField from "./PositionField";
import { AxiosError } from "axios";
import {
    EmployeePersonalInfoValues,
    EmployeeLocationValues,
    EmployeeFamilyValues,
} from "../../../../redux/slices/hr";
import LabeledReactSelectInput from "../../../../components/LabeledReactSelectInput";
import FormikInput from "../../../../components/FormikInput";

interface Props {
    onClose: () => void;
    editInitialValues?: Employee;
    id?: number;
    tabIndex: number;
    setTabIndex: (tabIndex: number) => void;
    personalInfoForm: {
        onSubmit: () => Promise<any>;
        validateForm: () => Promise<FormikErrors<EmployeePersonalInfoValues>>;
    };
    locationInfoForm: {
        onSubmit: () => Promise<any>;
        validateForm: () => Promise<FormikErrors<EmployeeLocationValues>>;
    };
    familyInfoForm: {
        onSubmit: () => Promise<any>;
        validateForm: () => Promise<FormikErrors<EmployeeFamilyValues>>;
    };
}

const validationSchema = Yup.object().shape({
    salaryCurrencyId: Yup.number().nullable(),
    medicalCoverageId: Yup.number().nullable(),
    businessUnitId: Yup.number()
        .nullable()
        .required("Business unit is required"),
    positionId: Yup.number().nullable(),
    salaryAmount: Yup.number()
        .min(0, "Salary amount must be greater than 0")
        .nullable(),
    workTime: Yup.number().nullable().required("Work time is required"),
    employer: Yup.number().nullable().required("Employer is required"),
});

const initialValues = {
    salaryCurrencyId: 0,
    medicalCoverageId: 0,
    businessUnitId: null,
    positionId: null,
    salaryAmount: 0,
    workTime: 0,
    employer: 0,
};

const editInitialValuesToFormikValues = (editInitialValues?: Employee) =>
    editInitialValues
        ? {
              salaryCurrencyId: editInitialValues?.salaryCurrency?.id,
              medicalCoverageId: editInitialValues?.medicalCoverage?.id,
              businessUnitId: editInitialValues?.legacyUser?.businessUnit?.id,
              positionId: editInitialValues?.position?.id,
              salaryAmount: editInitialValues?.salaryAmount,
              workTime: editInitialValues?.workTime || 0,
              employer: editInitialValues?.employer || 0,
          }
        : undefined;

const CrtEditEmployeeFormEmploymentInfo = ({
    onClose,
    editInitialValues,
    id,
    tabIndex,
    setTabIndex,
    personalInfoForm,
    locationInfoForm,
    familyInfoForm,
}: Props) => {
    const authUser = useAuthUser()() as ApplicationUserPrivate;
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

    const formikEmploymentInfo = useFormik({
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

            await personalInfoForm.onSubmit();
            await locationInfoForm.onSubmit();
            await familyInfoForm.onSubmit();

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
                await editEmployee();
            } else {
                await createEmployee();
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
        setTabIndex(0);
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
                    ...formikEmploymentInfo.values,
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
                    ...formikEmploymentInfo.values,
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

    return (
        <chakra.form w={"full"} onSubmit={formikEmploymentInfo.handleSubmit}>
            <SimpleGrid columns={{ base: 1, md: 2 }} spacing={4}>
                <GridItem colSpan={1}>
                    <LabeledReactSelectInput
                        label="Salary Currency"
                        name="salaryCurrencyId"
                        value={formikEmploymentInfo.values.salaryCurrencyId}
                        error={formikEmploymentInfo.errors.salaryCurrencyId}
                        touched={formikEmploymentInfo.touched.salaryCurrencyId}
                        isClearable={true}
                        options={getCurrencies().map((c) => ({
                            value: c.id,
                            label: c.code,
                        }))}
                        setter={(value: any) =>
                            formikEmploymentInfo.setFieldValue(
                                "salaryCurrencyId",
                                value,
                                true
                            )
                        }
                        placeholder=""
                    />
                </GridItem>
                <GridItem colSpan={1}>
                    <LabeledReactSelectInput
                        label="Medical Coverage"
                        name="medicalCoverageId"
                        value={formikEmploymentInfo.values.medicalCoverageId}
                        error={formikEmploymentInfo.errors.medicalCoverageId}
                        touched={formikEmploymentInfo.touched.medicalCoverageId}
                        isClearable={true}
                        options={getMedicalCoverages().map((c) => ({
                            value: c.id,
                            label: c.name,
                        }))}
                        setter={(value: any) =>
                            formikEmploymentInfo.setFieldValue(
                                "medicalCoverageId",
                                value,
                                true
                            )
                        }
                        placeholder=""
                    />
                </GridItem>
                <GridItem colSpan={1}>
                    <BusinessUnitField
                        setter={(value: number | null) =>
                            formikEmploymentInfo.setFieldValue(
                                "businessUnitId",
                                value,
                                true
                            )
                        }
                        error={formikEmploymentInfo.errors.businessUnitId}
                        touched={formikEmploymentInfo.touched.businessUnitId}
                        isRequired
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
                            formikEmploymentInfo.setFieldValue(
                                "positionId",
                                value,
                                true
                            )
                        }
                        error={formikEmploymentInfo.errors.positionId}
                        touched={formikEmploymentInfo.touched.positionId}
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
                {!authUser.roles.includes("hr-limited") &&
                    <GridItem colSpan={1}>
                        <FormikInput
                            label="Salary Amount"
                            isRequired={false}
                            name={"salaryAmount"}
                            id={"salaryAmount"}
                            value={formikEmploymentInfo.values.salaryAmount}
                            onChange={formikEmploymentInfo.handleChange}
                            touched={formikEmploymentInfo.touched.salaryAmount}
                            error={formikEmploymentInfo.errors.salaryAmount}
                        />
                    </GridItem>
                }
                <GridItem colSpan={1}>
                    <LabeledReactSelectInput
                        label="WorkTime"
                        name="workTime"
                        value={formikEmploymentInfo.values.workTime}
                        error={formikEmploymentInfo.errors.workTime}
                        touched={formikEmploymentInfo.touched.workTime}
                        isClearable={false}
                        options={getWorkTime().map((c) => ({
                            value: c.value,
                            label: c.label,
                        }))}
                        setter={(value: any) =>
                            formikEmploymentInfo.setFieldValue(
                                "workTime",
                                value,
                                true
                            )
                        }
                        placeholder=""
                    />
                </GridItem>
                <GridItem colSpan={1}>
                    <LabeledReactSelectInput
                        label="Employer"
                        name="employer"
                        value={formikEmploymentInfo.values.employer}
                        error={formikEmploymentInfo.errors.employer}
                        touched={formikEmploymentInfo.touched.employer}
                        isClearable={false}
                        options={getEmployers().map((c) => ({
                            value: c.value,
                            label: c.label,
                        }))}
                        setter={(value: any) =>
                            formikEmploymentInfo.setFieldValue(
                                "employer",
                                value,
                                true
                            )
                        }
                        placeholder=""
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
