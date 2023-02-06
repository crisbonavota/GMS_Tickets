import { chakra, SimpleGrid, GridItem, HStack, Button } from "@chakra-ui/react";
import { Employee } from "../../../../api/types";
import { getGenders, getStatus } from "../../../../api/api";
import FormikInput from "../../../../components/FormikInput";

interface Props {
    onClose: () => void;
    editInitialValues?: Employee;
    tabIndex: number;
    setTabIndex: (tabIndex: number) => void;
    formik: FormikProps<EmployeePersonalInfoValues>;
}

const validationSchema = Yup.object().shape({
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
        .required("Email is required")
        .email("Invalid email format"),
    entryDate: Yup.date().nullable(),
    afipid: Yup.string().nullable(),
    mobilePhone: Yup.string().nullable(),
});

const initialValues = {
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

const editInitialValuesToFormikValues = (editInitialValues?: Employee) =>
    editInitialValues
        ? {
              lastName: editInitialValues.lastName,
              firstName: editInitialValues.firstName.replace(
                  ` (${editInitialValues.id})`,
                  ""
              ),
              entryDate: moment(editInitialValues.entryDate).format(
                  "yyyy-MM-DD"
              ),
              birthDate: moment(editInitialValues.birthDate).format(
                  "yyyy-MM-DD"
              ),
              active: editInitialValues?.active,
              email: editInitialValues.email,
              afipId: editInitialValues.afipId,
              gender: editInitialValues.gender,
              fileNumber: editInitialValues.fileNumber,
              mobilePhone: editInitialValues.mobilePhone,
          }
        : undefined;

const CrtEditEmployeeFormPersonalInfo = ({
    onClose,
    editInitialValues,
    tabIndex,
    setTabIndex,
    formik,
}: Props) => {
    const dispatch = useAppDispatch();

    const formik = useFormik({
        initialValues:
            editInitialValuesToFormikValues(editInitialValues) || initialValues,
        validationSchema,
        onSubmit: async () => {
            dispatch({
                type: employeePersonalInfo,
                payload: { ...formik.values },
            });
            setTabIndex(tabIndex + 1);
        },
    });

    const genders = getGenders();
    const status = getStatus();

    return (
        <chakra.form w={"full"} onSubmit={formik.handleSubmit}>
            <SimpleGrid columns={{ base: 1, md: 2 }} spacing={4}>
                <GridItem colSpan={1}>
                    <FormikInput
                        label="File Number"
                        isRequired={true}
                        name={"fileNumber"}
                        id={"fileNumber"}
                        value={formikPersonalInfo.values.fileNumber}
                        onChange={formikPersonalInfo.handleChange}
                        onBlur={formikPersonalInfo.handleBlur}
                        touched={formikPersonalInfo.touched.fileNumber}
                        error={formikPersonalInfo.errors.fileNumber}
                    />
                </GridItem>

                <GridItem colSpan={1}>
                    <FormikInput
                        label={"Name(s)"}
                        isRequired={true}
                        name="firstName"
                        id="firstName"
                        value={formikPersonalInfo.values.firstName}
                        onChange={formikPersonalInfo.handleChange}
                        onBlur={formikPersonalInfo.handleBlur}
                        touched={formikPersonalInfo.touched.firstName}
                        error={formikPersonalInfo.errors.firstName}
                    />
                </GridItem>
                <GridItem colSpan={1}>
                    <FormikInput
                        label={"Last Name(s)"}
                        isRequired={true}
                        name="lastName"
                        id="lastName"
                        value={formikPersonalInfo.values.lastName}
                        onChange={formikPersonalInfo.handleChange}
                        onBlur={formikPersonalInfo.handleBlur}
                        touched={formikPersonalInfo.touched.lastName}
                        error={formikPersonalInfo.errors.lastName}
                    />
                </GridItem>
                <GridItem colSpan={1}>
                    <FormikInput
                        label={"Email"}
                        isRequired={true}
                        name="email"
                        id="email"
                        value={formikPersonalInfo.values.email}
                        onChange={formikPersonalInfo.handleChange}
                        onBlur={formikPersonalInfo.handleBlur}
                        touched={formikPersonalInfo.touched.email}
                        error={formikPersonalInfo.errors.email}
                    />
                </GridItem>
                <GridItem colSpan={1}>
                    <FormLabel>Date of Admission</FormLabel>
                    <Input
                        type="date"
                        label={"Date of Admission"}
                        name="entryDate"
                        id="entryDate"
                        value={formikPersonalInfo.values.entryDate}
                        onChange={formikPersonalInfo.handleChange}
                        touched={formikPersonalInfo.touched.entryDate}
                        error={formikPersonalInfo.errors.entryDate}
                    />
                </GridItem>
                <GridItem colSpan={1}>
                    <FormikSelectInput
                        label={"Status"}
                        isRequired={true}
                        name="active"
                        id="active"
                        value={formikPersonalInfo.values.active.toString()}
                        touched={formikPersonalInfo.touched.active}
                        error={formikPersonalInfo.errors.active}
                        onChange={(v) =>
                            formik.setFieldValue("active", v.target.value)
                        }
                        children={status.map((s) => (
                            <option key={s.label} value={s.value.toString()}>
                                {s.label}
                            </option>
                        ))}
                    />
                </GridItem>
                <GridItem colSpan={1}>
                    <FormikInput
                        label={"DNI/CUIT/CUIL/Social Nº"}
                        isRequired={false}
                        name="afipId"
                        id="afipId"
                        value={formik.values.afipId}
                        onChange={formik.handleChange}
                        touched={formik.touched.afipId}
                        error={formik.errors.afipId}
                    />
                </GridItem>
                <GridItem colSpan={1}>
                    <FormikSelectInput
                        label={"Gender"}
                        isRequired={true}
                        name="gender"
                        id="gender"
                        value={formikPersonalInfo.values.gender.toString()}
                        touched={formikPersonalInfo.touched.gender}
                        error={formikPersonalInfo.errors.gender}
                        onChange={(v) =>
                            formik.setFieldValue("gender", v.target.value)
                        }
                        children={genders.map((s) => (
                            <option key={s.label} value={s.value.toString()}>
                                {s.label}
                            </option>
                        ))}
                    />
                </GridItem>
                <GridItem colSpan={1}>
                    <FormikInput
                        type="date"
                        name="birthDate"
                        id="birthDate"
                        isRequired={true}
                        value={formikPersonalInfo.values.birthDate}
                        onChange={formikPersonalInfo.handleChange}
                        onBlur={formikPersonalInfo.handleBlur}
                        touched={formikPersonalInfo.touched.birthDate}
                        error={formikPersonalInfo.errors.birthDate}
                        label={"Birth Date"}
                    />
                </GridItem>
                <GridItem colSpan={1}>
                    <FormikInput
                        label={"Mobile Phone"}
                        isRequired={false}
                        name="mobilePhone"
                        id="mobilePhone"
                        value={formik.values.mobilePhone}
                        onChange={formik.handleChange}
                        touched={formik.touched.mobilePhone}
                        error={formik.errors.mobilePhone}
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
                            onClick={onClose}
                            variant="outline"
                            colorScheme={"orange"}
                            minWidth={"8rem"}
                        >
                            Cancel
                        </Button>
                        <Button
                            type="button"
                            colorScheme={"orange"}
                            minWidth={"8rem"}
                            onClick={() => setTabIndex(tabIndex + 1)}
                        >
                            Next
                        </Button>
                    </HStack>
                </GridItem>
            </SimpleGrid>
        </chakra.form>
    );
};

export default CrtEditEmployeeFormPersonalInfo;
