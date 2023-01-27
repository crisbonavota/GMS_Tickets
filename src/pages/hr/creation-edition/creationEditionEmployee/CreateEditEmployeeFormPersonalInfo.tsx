import {
    chakra,
    SimpleGrid,
    GridItem,
    HStack,
    Button,
    Select,
    FormControl,
    FormErrorMessage,
    Input,
    FormLabel,
} from "@chakra-ui/react";
import * as Yup from "yup";
import { useFormik } from "formik";
import { useQuery } from "react-query";
import { Employee } from "../../../../api/types";
import { getGenders, getStatus } from "../../../../api/api";
import { employeePersonalInfo } from "../../../../redux/slices/hr";
import { useAppDispatch } from "../../../../redux/hooks";
import moment from "moment";
import { useEffect } from "react";
import FormikInput from "../../../../components/FormikInput";

interface Props {
    onClose: () => void;
    editInitialValues?: Employee;
    tabIndex: number;
    setTabIndex: (tabIndex: number) => void;
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


    useEffect(() => {
        if (tabIndex !== 0) {
            dispatch({
                type: employeePersonalInfo,
                payload: { ...formik.values },
            });
        }
    }, [tabIndex]);

    return (
        <chakra.form w={"full"} onSubmit={formik.handleSubmit}>
            <SimpleGrid columns={{ base: 1, md: 2 }} spacing={4}>
                <GridItem colSpan={1}>
                    <FormikInput
                        label="File Number"
                        isRequired={true}
                        name={"fileNumber"}
                        id={"fileNumber"}
                        value={formik.values.fileNumber}
                        onChange={formik.handleChange}
                        touched={formik.touched.fileNumber}
                        error={formik.errors.fileNumber}
                    />
                </GridItem>

                <GridItem colSpan={1}>
                    <FormikInput
                        label={"Name(s)"}
                        isRequired={true}
                        name="firstName"
                        id="firstName"
                        value={formik.values.firstName}
                        onChange={formik.handleChange}
                        touched={formik.touched.firstName}
                        error={formik.errors.firstName}
                    />
                </GridItem>
                <GridItem colSpan={1}>
                    <FormikInput
                        label={"Last Name(s)"}
                        isRequired={true}
                        name="lastName"
                        id="lastName"
                        value={formik.values.lastName}
                        onChange={formik.handleChange}
                        touched={formik.touched.lastName}
                        error={formik.errors.lastName}
                    />
                </GridItem>
                <GridItem colSpan={1}>
                    <FormikInput
                        label={"Email"}
                        isRequired={true}
                        name="email"
                        id="email"
                        value={formik.values.email}
                        onChange={formik.handleChange}
                        touched={formik.touched.email}
                        error={formik.errors.email}
                    />
                </GridItem>
                <GridItem colSpan={1}>
                    <FormLabel>Date of Admission</FormLabel>
                    <Input
                        type="date"
                        name="entryDate"
                        id="entryDate"
                        value={formik.values.entryDate}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                    />
                </GridItem>
                <GridItem colSpan={1}>
                    <FormControl
                        isInvalid={
                            !!formik.errors.active && !!formik.touched.active
                        }
                    >
                        <FormLabel>Status</FormLabel>
                        <Select
                            name="active"
                            id="active"
                            value={formik.values.active.toString()}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                        >
                            {status &&
                                status.map((el) => (
                                    <option
                                        key={el.label}
                                        value={el.value.toString()}
                                    >
                                        {el.label}
                                    </option>
                                ))}
                        </Select>
                        <FormErrorMessage>
                            {formik.errors?.gender}
                        </FormErrorMessage>
                    </FormControl>
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
                    <FormControl
                        isRequired
                        isInvalid={
                            !!formik.errors.gender && !!formik.touched.gender
                        }
                    >
                        <FormLabel>Gender</FormLabel>
                        <Select
                            name="gender"
                            id="gender"
                            value={formik.values.gender.toString()}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                        >
                            {genders &&
                                genders.map((el) => (
                                    <option
                                        key={el.label}
                                        value={el.value.toString()}
                                    >
                                        {el.label}
                                    </option>
                                ))}
                        </Select>
                        <FormErrorMessage>
                            {formik.errors?.gender}
                        </FormErrorMessage>
                    </FormControl>
                </GridItem>
                <GridItem colSpan={1}>
                    <FormControl
                        isRequired
                        isInvalid={
                            !!formik.errors.birthDate &&
                            !!formik.touched.birthDate
                        }
                    >
                        <FormLabel>Date of Birth</FormLabel>
                        <Input
                            type="date"
                            name="birthDate"
                            id="birthDate"
                            value={formik.values.birthDate}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                        />
                        <FormErrorMessage>
                            {formik.errors?.birthDate}
                        </FormErrorMessage>
                    </FormControl>
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
                            type="submit"
                            colorScheme={"orange"}
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

export default CrtEditEmployeeFormPersonalInfo;
