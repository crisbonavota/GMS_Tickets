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
import { Employee } from "../../../../api/types";
import { getGenders, getStatus } from "../../../../api/api";
import { useEffect } from "react";
import FormikInput from "../../../../components/FormikInput";
import { FormikProps } from "formik";
import { EmployeePersonalInfoValues } from "../../../../redux/slices/hr";

interface Props {
    onClose: () => void;
    editInitialValues?: Employee;
    tabIndex: number;
    setTabIndex: (tabIndex: number) => void;
    formik: FormikProps<EmployeePersonalInfoValues>;
}

const CrtEditEmployeeFormPersonalInfo = ({
    onClose,
    tabIndex,
    formik,
}: Props) => {
    const formikPersonalInfo = formik;

    const genders = getGenders();
    const status = getStatus();

    useEffect(() => {
        if (tabIndex !== 0 && !formikPersonalInfo.isValid) {
            formikPersonalInfo.handleSubmit();
        }
    }, [tabIndex]);

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
                        touched={formikPersonalInfo.touched.email}
                        error={formikPersonalInfo.errors.email}
                    />
                </GridItem>
                <GridItem colSpan={1}>
                    <FormLabel>Date of Admission</FormLabel>
                    <Input
                        type="date"
                        name="entryDate"
                        id="entryDate"
                        value={formikPersonalInfo.values.entryDate}
                        onChange={formikPersonalInfo.handleChange}
                        onBlur={formikPersonalInfo.handleBlur}
                    />
                </GridItem>
                <GridItem colSpan={1}>
                    <FormControl
                        isInvalid={
                            !!formikPersonalInfo.errors.active &&
                            !!formikPersonalInfo.touched.active
                        }
                    >
                        <FormLabel>Status</FormLabel>
                        <Select
                            name="active"
                            id="active"
                            value={formikPersonalInfo.values.active.toString()}
                            onChange={formikPersonalInfo.handleChange}
                            onBlur={formikPersonalInfo.handleBlur}
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
                            {formikPersonalInfo.errors?.gender}
                        </FormErrorMessage>
                    </FormControl>
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
                    <FormControl
                        isRequired
                        isInvalid={
                            !!formikPersonalInfo.errors.gender &&
                            !!formikPersonalInfo.touched.gender
                        }
                    >
                        <FormLabel>Gender</FormLabel>
                        <Select
                            name="gender"
                            id="gender"
                            value={formikPersonalInfo.values.gender.toString()}
                            onChange={formikPersonalInfo.handleChange}
                            onBlur={formikPersonalInfo.handleBlur}
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
                            {formikPersonalInfo.errors?.gender}
                        </FormErrorMessage>
                    </FormControl>
                </GridItem>
                <GridItem colSpan={1}>
                    <FormControl
                        isRequired
                        isInvalid={
                            !!formikPersonalInfo.errors.birthDate &&
                            !!formikPersonalInfo.touched.birthDate
                        }
                    >
                        <FormLabel>Date of Birth</FormLabel>
                        <Input
                            type="date"
                            name="birthDate"
                            id="birthDate"
                            value={formikPersonalInfo.values.birthDate}
                            onChange={formikPersonalInfo.handleChange}
                            onBlur={formikPersonalInfo.handleBlur}
                        />
                        <FormErrorMessage>
                            {formikPersonalInfo.errors?.birthDate}
                        </FormErrorMessage>
                    </FormControl>
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
