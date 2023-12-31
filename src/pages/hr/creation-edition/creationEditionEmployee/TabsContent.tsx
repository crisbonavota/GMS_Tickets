import { Tabs, TabPanels, TabPanel } from "@chakra-ui/react";
import { Employee } from "../../../../api/types";
import CreateEditEmployeeFormEmploymentInfo from "./CreateEditEmployeeFormEmploymentInfo";
import CreateEditEmployeeFormFamilyInfo from "./CreateEditEmployeeFormFamilyInfo";
import CreateEditEmployeeFormLocationInfo from "./CreateEditEmployeeFormLocationInfo";
import CreateEditEmployeeFormPersonalInfo from "./CreateEditEmployeeFormPersonalInfo";
import * as Yup from "yup";
import { useFormik } from "formik";
import moment from "moment";
import { useAppDispatch } from "../../../../redux/hooks";
import { employeePersonalInfo } from "../../../../redux/slices/hr";
import { employeeLocationInfo } from "../../../../redux/slices/hr";
import { employeeFamilyInfo } from "../../../../redux/slices/hr";

interface Props {
    tabIndex: number;
    setTabIndex: (tabIndex: number) => void;
    onClose: () => void;
    editInitialValues?: Employee;
    id?: number;
}

const editInitialValuesToFormikPersonalInfoValues = (
    editInitialValues?: Employee
) =>
    editInitialValues
        ? {
              lastName: editInitialValues.lastName,
              firstName: editInitialValues.firstName.replace(
                  ` (${editInitialValues.id})`,
                  ""
              ),
              entryDate: moment
                  .utc(editInitialValues.entryDate)
                  .format("yyyy-MM-DD"),
              birthDate: moment
                  .utc(editInitialValues.birthDate)
                  .format("yyyy-MM-DD"),
              active: editInitialValues.active,
              email: editInitialValues.email,
              afipId: editInitialValues.afipId,
              gender: editInitialValues.gender,
              fileNumber: editInitialValues.fileNumber,
              mobilePhone: editInitialValues.mobilePhone,
          }
        : undefined;

const editInitialValuesToFormikLocationInfoValues = (
    editInitialValues?: Employee
) =>
    editInitialValues
        ? {
              birthCountryId: editInitialValues?.birthCountry?.id,
              countryId: editInitialValues?.country?.id,
              street: editInitialValues.address?.street,
              department: editInitialValues.address?.number,
              floor: editInitialValues.address?.floor,
              number: editInitialValues.address?.altura,
              city: editInitialValues.city || "",
              postalCode: editInitialValues.postalCode || "",
          }
        : undefined;

const editInitialValuesToFormikFamilyInfoValues = (
    editInitialValues?: Employee
) =>
    editInitialValues
        ? {
              children: editInitialValues.children,
              maritalStatus: editInitialValues.maritalStatus || 0,
          }
        : undefined;

const personalInfoInitialValues = {
    fileNumber: 0,
    firstName: "",
    lastName: "",
    email: "",
    afipId: "",
    entryDate: moment().format("yyyy-MM-DD"),
    birthDate: "",
    gender: true,
    active: true,
    mobilePhone: "",
};

const locationInfoInitialValues = {
    countryId: 1,
    birthCountryId: 1,
    street: "",
    department: "",
    floor: "",
    number: "",
    city: "",
    postalCode: "",
};

const familyInfoInitialValues = {
    children: [],
    maritalStatus: 0,
};

const TabsContent = ({
    tabIndex,
    setTabIndex,
    onClose,
    editInitialValues,
    id,
}: Props) => {
    const dispatch = useAppDispatch();

    const formikPersonalInfo = useFormik({
        initialValues:
            editInitialValuesToFormikPersonalInfoValues(editInitialValues) ||
            personalInfoInitialValues,
        validationSchema: Yup.object().shape({
            fileNumber: Yup.number()
                .typeError("Must be a number")
                .required("File number is required")
                .positive("Only positive numbers")
                .integer("Format not allowed"),
            firstName: Yup.string().required("First name is required"),
            lastName: Yup.string().required("Last name is required"),
            birthDate: Yup.date().required("Date of Birth is required"),
            gender: Yup.string().nullable().required("Gender is required"),
            active: Yup.string().nullable().required("Status is required"),
            email: Yup.string()
                .nullable()
                .required("Email is required")
                .email("Invalid email format"),
            entryDate: Yup.date().nullable(),
            afipid: Yup.string().nullable(),
        }),
        onSubmit: async () => {
            dispatch({
                type: employeePersonalInfo,
                payload: { ...formikPersonalInfo.values },
            });
        },
    });

    const formikLocationInfo = useFormik({
        initialValues:
            editInitialValuesToFormikLocationInfoValues(editInitialValues) ||
            locationInfoInitialValues,
        validationSchema: Yup.object().shape({
            address: Yup.string().nullable(),
            city: Yup.string().nullable(),
            birthCountryId: Yup.number().nullable(),
            countryId: Yup.number().nullable(),
            postalCode: Yup.string().nullable(),
            children: Yup.array().of(
                Yup.object().shape({
                    name: Yup.string().required("Name is required"),
                    birthDate: Yup.date().required("Birth date is required"),
                })
            ),
        }),
        onSubmit: async () => {
            dispatch({
                type: employeeLocationInfo,
                payload: { ...formikLocationInfo.values },
            });
        },
    });

    const formikFamilyInfo = useFormik({
        initialValues:
            editInitialValuesToFormikFamilyInfoValues(editInitialValues) ||
            familyInfoInitialValues,
        validationSchema: Yup.object().shape({
            maritalStatus: Yup.string().nullable(),
            children: Yup.array().of(
                Yup.object().shape({
                    birthDate: Yup.date().required("Birth date is required"),
                    name: Yup.string().required("Name is required"),
                })
            ),
        }),
        onSubmit: async () => {
            dispatch({
                type: employeeFamilyInfo,
                payload: { ...formikFamilyInfo.values },
            });
        },
    });

    return (
        <Tabs
            index={tabIndex}
            onChange={setTabIndex}
            w={{ base: "full", md: "100%" }}
        >
            <TabPanels p={1} w={"full"}>
                <TabPanel w={"full"}>
                    <CreateEditEmployeeFormPersonalInfo
                        onClose={onClose}
                        tabIndex={tabIndex}
                        setTabIndex={setTabIndex}
                        formik={formikPersonalInfo}
                    />
                </TabPanel>
                <TabPanel>
                    <CreateEditEmployeeFormLocationInfo
                        onClose={onClose}
                        tabIndex={tabIndex}
                        setTabIndex={setTabIndex}
                        formik={formikLocationInfo}
                    />
                </TabPanel>
                <TabPanel>
                    <CreateEditEmployeeFormFamilyInfo
                        onClose={onClose}
                        tabIndex={tabIndex}
                        setTabIndex={setTabIndex}
                        editInitialValues={editInitialValues}
                        formik={formikFamilyInfo}
                    />
                </TabPanel>
                <TabPanel>
                    <CreateEditEmployeeFormEmploymentInfo
                        onClose={onClose}
                        tabIndex={tabIndex}
                        setTabIndex={setTabIndex}
                        editInitialValues={editInitialValues}
                        id={id}
                        personalInfoForm={{
                            onSubmit: formikPersonalInfo.submitForm,
                            validateForm: formikPersonalInfo.validateForm,
                        }}
                        locationInfoForm={{
                            onSubmit: formikLocationInfo.submitForm,
                            validateForm: formikLocationInfo.validateForm,
                        }}
                        familyInfoForm={{
                            onSubmit: formikFamilyInfo.submitForm,
                            validateForm: formikFamilyInfo.validateForm,
                        }}
                    />
                </TabPanel>
            </TabPanels>
        </Tabs>
    );
};
export default TabsContent;
