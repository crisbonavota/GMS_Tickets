import { chakra, SimpleGrid, GridItem, HStack, Button } from "@chakra-ui/react";
import { getGenders, getStatus } from "../../../../api/api";
import FormikInput from "../../../../components/FormikInput";
import { FormikProps } from "formik";
import { EmployeePersonalInfoValues } from "../../../../redux/slices/hr";
import LabeledReactSelectInput from "../../../../components/LabeledReactSelectInput";

interface Props {
    onClose: () => void;
    tabIndex: number;
    setTabIndex: (tabIndex: number) => void;
    formik: FormikProps<EmployeePersonalInfoValues>;
}

const CrtEditEmployeeFormPersonalInfo = ({
    onClose,
    tabIndex,
    setTabIndex,
    formik,
}: Props) => {
    const formikPersonalInfo = formik;

    return (
        <chakra.form w={"full"} onSubmit={formikPersonalInfo.handleSubmit}>
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
                    <FormikInput
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
                    <LabeledReactSelectInput
                        label="Status"
                        isRequired={true}
                        name="active"
                        value={formikPersonalInfo.values.active?.toString()}
                        touched={formikPersonalInfo.touched.active}
                        error={formikPersonalInfo.errors.active}
                        isClearable={false}
                        options={getStatus().map((c) => ({
                            value: c.value?.toString(),
                            label: c.label,
                        }))}
                        setter={(value: any) =>
                            formikPersonalInfo.setFieldValue(
                                "active",
                                value,
                                true
                            )
                        }
                        placeholder=""
                    />
                </GridItem>
                <GridItem colSpan={1}>
                    <FormikInput
                        label={"DNI/CUIT/CUIL/Social Nº"}
                        isRequired={false}
                        name="afipId"
                        id="afipId"
                        value={formikPersonalInfo.values.afipId}
                        onChange={formikPersonalInfo.handleChange}
                        touched={formikPersonalInfo.touched.afipId}
                        error={formikPersonalInfo.errors.afipId}
                    />
                </GridItem>
                <GridItem colSpan={1}>
                    <LabeledReactSelectInput
                        label="Gender"
                        isRequired={true}
                        name="gender"
                        value={formikPersonalInfo.values.gender?.toString()}
                        touched={formikPersonalInfo.touched.gender}
                        error={formikPersonalInfo.errors.gender}
                        isClearable={false}
                        options={getGenders().map((c) => ({
                            value: c.value?.toString(),
                            label: c.label,
                        }))}
                        setter={(value: any) =>
                            formikPersonalInfo.setFieldValue(
                                "gender",
                                value,
                                true
                            )
                        }
                        placeholder=""
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
                        value={formikPersonalInfo.values.mobilePhone}
                        onChange={formikPersonalInfo.handleChange}
                        touched={formikPersonalInfo.touched.mobilePhone}
                        error={formikPersonalInfo.errors.mobilePhone}
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
