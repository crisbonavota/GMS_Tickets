import { chakra, SimpleGrid, GridItem, HStack, Button } from "@chakra-ui/react";
import { FormikProps } from "formik";
import { Employee } from "../../../../api/types";
import FormikInput from "../../../../components/FormikInput";
import { EmployeeFamilyValues } from "../../../../redux/slices/hr";
import AddChildInFormButton from "./AddChildInFormButton";

interface Props {
    onClose: () => void;
    editInitialValues?: Employee;
    tabIndex: number;
    setTabIndex: (tabIndex: number) => void;
    formik: FormikProps<EmployeeFamilyValues>;
}

const CrtEditEmployeeFormFamilyInfo = ({
    tabIndex,
    setTabIndex,
    formik,
}: Props) => {
    const formikFamilyInfo = formik;

    return (
        <chakra.form w={"full"} onSubmit={formikFamilyInfo.handleSubmit}>
            <SimpleGrid columns={{ base: 1, md: 2 }} spacing={4}>
                <GridItem colSpan={1}>
                    <FormikInput
                        label="Marital Status"
                        isRequired={false}
                        name={"maritalStatus"}
                        id={"maritalStatus"}
                        value={formikFamilyInfo.values.maritalStatus}
                        onChange={formikFamilyInfo.handleChange}
                        touched={formikFamilyInfo.touched.maritalStatus}
                        error={formikFamilyInfo.errors.maritalStatus}
                    />
                </GridItem>
                    <AddChildInFormButton 
                        value={formikFamilyInfo.values.childs}
                        onChange={formikFamilyInfo.handleChange}
                        touched={formikFamilyInfo.touched.childs}
                        error={formikFamilyInfo.errors.childs}
                    />
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
                            onClick={() => setTabIndex(tabIndex - 1)}
                        >
                            Next
                        </Button>
                    </HStack>
                </GridItem>
            </SimpleGrid>
        </chakra.form>
    );
};

export default CrtEditEmployeeFormFamilyInfo;
