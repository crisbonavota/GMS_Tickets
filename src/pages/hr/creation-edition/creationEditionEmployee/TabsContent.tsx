import { Tabs, TabPanels, TabPanel } from "@chakra-ui/react";
import { Employee } from "../../../../api/types";
import CreateEditEmployeeFormEmploymentInfo from "./CreateEditEmployeeFormEmploymentInfo";
import CreateEditEmployeeFormFamilyInfo from "./CreateEditEmployeeFormFamilyInfo";
import CreateEditEmployeeFormLocationInfo from "./CreateEditEmployeeFormLocationInfo";
import CreateEditEmployeeFormPersonalInfo from "./CreateEditEmployeeFormPersonalInfo";

interface Props {
    tabIndex: number;
    setTabIndex: (tabIndex: number) => void;
    onClose: () => void;
    editInitialValues?: Employee;
    id?: number;
}

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
            gender: Yup.string().required("Gender is required"),
            email: Yup.string()
                .nullable()
                .required("Email is required")
                .email("Invalid email format"),
            entryDate: Yup.date().nullable(),
            afipid: Yup.string().nullable(),
        }),
        onSubmit: () => {
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
        }),
        onSubmit: () => {
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
            childs: Yup.number().nullable().typeError("Must be a number type"),
            maritalStatus: Yup.string().nullable(),
        }),
        onSubmit: () => {
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
                        editInitialValues={editInitialValues}
                    />{" "}
                </TabPanel>
                <TabPanel>
                    <CreateEditEmployeeFormFamilyInfo
                        onClose={onClose}
                        tabIndex={tabIndex}
                        setTabIndex={setTabIndex}
                        editInitialValues={editInitialValues}
                    />{" "}
                </TabPanel>
                <TabPanel>
                    <CreateEditEmployeeFormEmploymentInfo
                        onClose={onClose}
                        tabIndex={tabIndex}
                        setTabIndex={setTabIndex}
                        editInitialValues={editInitialValues}
                        id={id}
                    />
                </TabPanel>
            </TabPanels>
        </Tabs>
    );
};
export default TabsContent;
