import {
    chakra,
    SimpleGrid,
    GridItem,
    HStack,
    Button,
    Input,
    FormLabel,
    Select,
} from "@chakra-ui/react";
import * as Yup from "yup";
import { useFormik } from "formik";
import { Country, Employee } from "../../../../api/types";
import { useAuthHeader } from "react-auth-kit";
import { employeeLocationInfo } from "../../../../redux/slices/hr";
import { useAppDispatch } from "../../../../redux/hooks";
import { useQuery } from "react-query";
import { getResourceList } from "../../../../api/api";
import { useEffect } from "react";
import FormikInput from "../../../../components/FormikInput";

interface Props {
    onClose: () => void;
    editInitialValues?: Employee;
    tabIndex: number;
    setTabIndex: (tabIndex: number) => void;
}

const validationSchema = Yup.object().shape({
    address: Yup.string().nullable(),
    city: Yup.string().nullable(),
    birthCountryId: Yup.number().nullable(),
    countryId: Yup.number().nullable(),
    postalCode: Yup.string().nullable(),
});

const initialValues = {
    countryId: 1,
    birthCountryId: 1,
    street: "",
    department: "",
    floor: "",
    number: "",
    city: "",
    postalCode: "",
};

let editInitialValuesToFormikValues = (editInitialValues?: Employee) =>
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

const CrtEditEmployeeFormLocationInfo = ({
    editInitialValues,
    tabIndex,
    setTabIndex,
}: Props) => {
    const dispatch = useAppDispatch();
    const getAuthHeader = useAuthHeader();

    const formik = useFormik({
        initialValues:
            editInitialValuesToFormikValues(editInitialValues) || initialValues,
        validationSchema,
        onSubmit: async () => {
            dispatch({
                type: employeeLocationInfo,
                payload: { ...formik.values },
            });
            setTabIndex(tabIndex + 1);
        },
    });

    const { data: countries, isSuccess } = useQuery(
        "countries",
        () => getResourceList<Country>("employees/countries", getAuthHeader()),
        { select: (r) => r.data }
    );

    useEffect(() => {
        if (tabIndex !== 1) {
            dispatch({
                type: employeeLocationInfo,
                payload: { ...formik.values },
            });
        }
    }, [tabIndex]);

    return (
        <chakra.form w={"full"} onSubmit={formik.handleSubmit}>
            <SimpleGrid columns={{ base: 1, md: 2 }} spacing={4}>
                <GridItem colSpan={1}>
                    <FormLabel>Nationality</FormLabel>
                    <Select
                        name="birthCountryId"
                        id="birthCountryId"
                        value={formik.values.birthCountryId}
                        onChange={(event) => {
                            formik.setFieldValue(
                                "birthCountryId",
                                event.target.value
                            );
                        }}
                        onBlur={formik.handleBlur}
                    >
                        {isSuccess &&
                            countries.map((el) => (
                                <option key={el.id} value={el.id}>
                                    {el.name}
                                </option>
                            ))}
                    </Select>
                </GridItem>
                <GridItem colSpan={1}>
                    <FormLabel>Country of Residence</FormLabel>
                    <Select
                        name="countryId"
                        id="countryId"
                        value={formik.values.countryId}
                        onChange={(event) => {
                            formik.setFieldValue(
                                "countryId",
                                event.target.value
                            );
                        }}
                        onBlur={formik.handleBlur}
                    >
                        {isSuccess &&
                            countries.map((el) => (
                                <option key={el.id} value={el.id}>
                                    {el.name}
                                </option>
                            ))}
                    </Select>
                </GridItem>
                <GridItem colSpan={1}>
                    <FormikInput
                        label="Address Line 1 / Street"
                        isRequired={false}
                        name={"street"}
                        id={"street"}
                        value={formik.values.street}
                        onChange={formik.handleChange}
                        touched={formik.touched.street}
                        error={formik.errors.street}
                    />
                </GridItem>
                <GridItem colSpan={1}>
                    <FormikInput
                        label="Address Line 2 / Number"
                        isRequired={false}
                        name={"number"}
                        id={"number"}
                        value={formik.values.number}
                        onChange={formik.handleChange}
                        touched={formik.touched.number}
                        error={formik.errors.number}
                    />
                </GridItem>
                <GridItem colSpan={1}>
                    <FormikInput
                        label="Address Line 3 / Floor"
                        isRequired={false}
                        name={"floor"}
                        id={"floor"}
                        value={formik.values.floor}
                        onChange={formik.handleChange}
                        touched={formik.touched.floor}
                        error={formik.errors.floor}
                    />
                </GridItem>
                <GridItem colSpan={1}>
                    <FormikInput
                        label="Address Line 4 / Department"
                        isRequired={false}
                        name={"department"}
                        id={"department"}
                        value={formik.values.department}
                        onChange={formik.handleChange}
                        touched={formik.touched.department}
                        error={formik.errors.department}
                    />
                </GridItem>
                <GridItem colSpan={1}>
                    <FormikInput
                        label="City"
                        isRequired={false}
                        name={"city"}
                        id={"city"}
                        value={formik.values.city}
                        onChange={formik.handleChange}
                        touched={formik.touched.city}
                        error={formik.errors.city}
                    />
                </GridItem>
                <GridItem colSpan={1}>
                    <FormikInput
                        label="Zip Code"
                        isRequired={false}
                        name={"postalCode"}
                        id={"postalCode"}
                        value={formik.values.postalCode}
                        onChange={formik.handleChange}
                        touched={formik.touched.postalCode}
                        error={formik.errors.postalCode}
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
                            variant="outline"
                            colorScheme={"orange"}
                            minWidth={"8rem"}
                            onClick={() => setTabIndex(tabIndex - 1)}
                        >
                            Back
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

export default CrtEditEmployeeFormLocationInfo;
