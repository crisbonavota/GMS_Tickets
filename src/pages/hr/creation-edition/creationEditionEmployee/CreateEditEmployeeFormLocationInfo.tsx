import { chakra, SimpleGrid, GridItem, HStack, Button } from "@chakra-ui/react";
import { FormikProps } from "formik";
import { Country } from "../../../../api/types";
import { useAuthHeader } from "react-auth-kit";
import { useQuery } from "react-query";
import { getResourceList } from "../../../../api/api";
import FormikInput from "../../../../components/FormikInput";
import { EmployeeLocationValues } from "../../../../redux/slices/hr";
import LabeledReactSelectInput from "../../../../components/LabeledReactSelectInput";

interface Props {
    onClose: () => void;
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

    return (
        <chakra.form w={"full"} onSubmit={formikLocationInfo.handleSubmit}>
            <SimpleGrid columns={{ base: 1, md: 2 }} spacing={4}>
                <GridItem colSpan={1}>
                    <LabeledReactSelectInput
                        label="Nationality"
                        name="birthCountryId"
                        value={formikLocationInfo.values.birthCountryId}
                        error={formikLocationInfo.errors.birthCountryId}
                        touched={formikLocationInfo.touched.birthCountryId}
                        isClearable={true}
                        options={
                            isSuccess
                                ? countries.map((c) => ({
                                      value: c.id,
                                      label: c.name,
                                  }))
                                : []
                        }
                        setter={(value: number | null) =>
                            formikLocationInfo.setFieldValue(
                                "birthCountryId",
                                value,
                                true
                            )
                        }
                        placeholder=""
                    />
                </GridItem>
                <GridItem colSpan={1}>
                    <LabeledReactSelectInput
                        label="Country of Residence"
                        name="countryId"
                        value={formikLocationInfo.values.countryId}
                        error={formikLocationInfo.errors.countryId}
                        touched={formikLocationInfo.touched.countryId}
                        isClearable={true}
                        options={
                            isSuccess
                                ? countries.map((c) => ({
                                      value: c.id,
                                      label: c.name,
                                  }))
                                : []
                        }
                        setter={(value: number | null) =>
                            formikLocationInfo.setFieldValue(
                                "countryId",
                                value,
                                true
                            )
                        }
                        placeholder=""
                    />
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

export default CrtEditEmployeeFormLocationInfo;
