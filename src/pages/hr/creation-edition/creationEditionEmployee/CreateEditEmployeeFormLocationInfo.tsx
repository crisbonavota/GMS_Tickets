import {
    chakra,
    SimpleGrid,
    GridItem,
    HStack,
    Button,
    FormLabel,
    Select,
} from "@chakra-ui/react";
import { FormikProps } from "formik";
import { Country, Employee } from "../../../../api/types";
import { useAuthHeader } from "react-auth-kit";
import { useQuery } from "react-query";
import { getResourceList } from "../../../../api/api";
import { useEffect } from "react";
import FormikInput from "../../../../components/FormikInput";
import { EmployeeLocationValues } from "../../../../redux/slices/hr";

interface Props {
    onClose: () => void;
    editInitialValues?: Employee;
    tabIndex: number;
    setTabIndex: (tabIndex: number) => void;
    formik: FormikProps<EmployeeLocationValues>;
}

const CrtEditEmployeeFormLocationInfo = ({
    tabIndex,
    setTabIndex,
    formik,
}: Props) => {
    const getAuthHeader = useAuthHeader();

    const formikLocationInfo = formik;

    const { data: countries, isSuccess } = useQuery(
        "countries",
        () => getResourceList<Country>("employees/countries", getAuthHeader()),
        { select: (r) => r.data }
    );

    // useEffect(() => {
    //     if (tabIndex !== 1 && !formikLocationInfo.isValid) {
    //         formikLocationInfo.handleSubmit();
    //     }
    // }, [tabIndex]);

    return (
        <chakra.form w={"full"} onSubmit={formikLocationInfo.handleSubmit}>
            <SimpleGrid columns={{ base: 1, md: 2 }} spacing={4}>
                <GridItem colSpan={1}>
                    <FormLabel>Nationality</FormLabel>
                    <Select
                        name="birthCountryId"
                        id="birthCountryId"
                        value={formikLocationInfo.values.birthCountryId}
                        onChange={(event) => {
                            formikLocationInfo.setFieldValue(
                                "birthCountryId",
                                event.target.value
                            );
                        }}
                        onBlur={formikLocationInfo.handleBlur}
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
                        value={formikLocationInfo.values.countryId}
                        onChange={(event) => {
                            formikLocationInfo.setFieldValue(
                                "countryId",
                                event.target.value
                            );
                        }}
                        onBlur={formikLocationInfo.handleBlur}
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
                        value={formikLocationInfo.values.street}
                        onChange={formikLocationInfo.handleChange}
                        touched={formikLocationInfo.touched.street}
                        error={formikLocationInfo.errors.street}
                    />
                </GridItem>
                <GridItem colSpan={1}>
                    <FormikInput
                        label="Address Line 2 / Number"
                        isRequired={false}
                        name={"number"}
                        id={"number"}
                        value={formikLocationInfo.values.number}
                        onChange={formikLocationInfo.handleChange}
                        touched={formikLocationInfo.touched.number}
                        error={formikLocationInfo.errors.number}
                    />
                </GridItem>
                <GridItem colSpan={1}>
                    <FormikInput
                        label="Address Line 3 / Floor"
                        isRequired={false}
                        name={"floor"}
                        id={"floor"}
                        value={formikLocationInfo.values.floor}
                        onChange={formikLocationInfo.handleChange}
                        touched={formikLocationInfo.touched.floor}
                        error={formikLocationInfo.errors.floor}
                    />
                </GridItem>
                <GridItem colSpan={1}>
                    <FormikInput
                        label="Address Line 4 / Department"
                        isRequired={false}
                        name={"department"}
                        id={"department"}
                        value={formikLocationInfo.values.department}
                        onChange={formikLocationInfo.handleChange}
                        touched={formikLocationInfo.touched.department}
                        error={formikLocationInfo.errors.department}
                    />
                </GridItem>
                <GridItem colSpan={1}>
                    <FormikInput
                        label="City"
                        isRequired={false}
                        name={"city"}
                        id={"city"}
                        value={formikLocationInfo.values.city}
                        onChange={formikLocationInfo.handleChange}
                        touched={formikLocationInfo.touched.city}
                        error={formikLocationInfo.errors.city}
                    />
                </GridItem>
                <GridItem colSpan={1}>
                    <FormikInput
                        label="Zip Code"
                        isRequired={false}
                        name={"postalCode"}
                        id={"postalCode"}
                        value={formikLocationInfo.values.postalCode}
                        onChange={formikLocationInfo.handleChange}
                        touched={formikLocationInfo.touched.postalCode}
                        error={formikLocationInfo.errors.postalCode}
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
