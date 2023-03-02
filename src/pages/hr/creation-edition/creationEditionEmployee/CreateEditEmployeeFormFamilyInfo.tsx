import {
    chakra,
    SimpleGrid,
    GridItem,
    HStack,
    Button,
    VStack,
    FormLabel,
    Text,
} from "@chakra-ui/react";
import { ChildCreation, Employee } from "../../../../api/types";
import { EmployeeFamilyValues } from "../../../../redux/slices/hr";
import ChildItem from "./ChildItem";
import AddChildPopover from "./AddChildPopover";
import { FormikProps } from "formik";
import { getMaritalStatus } from "../../../../api/api";
import LabeledReactSelectInput from "../../../../components/LabeledReactSelectInput";

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
                    <LabeledReactSelectInput
                        label="Marital Status"
                        name="maritalStatus"
                        value={formikFamilyInfo.values.maritalStatus}
                        error={formikFamilyInfo.errors.maritalStatus}
                        touched={formikFamilyInfo.touched.maritalStatus}
                        options={getMaritalStatus().map((c) => ({
                            value: c.value,
                            label: c.label,
                        }))}
                        setter={(value: number | string | null) =>
                            formikFamilyInfo.setFieldValue(
                                "maritalStatus",
                                value,
                                true
                            )
                        }
                        placeholder=""
                    />
                </GridItem>
                <GridItem colSpan={1}>
                    <VStack alignItems={"flex-start"} spacing={1}>
                        <HStack alignItems={"flex-start"} spacing={1}>
                            <FormLabel>Children</FormLabel>
                            <AddChildPopover
                                addChild={(c: ChildCreation) =>
                                    formik.setFieldValue("children", [
                                        ...formik.values.children,
                                        c,
                                    ])
                                }
                            />
                        </HStack>
                        {formikFamilyInfo.values.children.length < 1 && (
                            <Text color="gray.500">
                                No childrens in database
                            </Text>
                        )}
                        <VStack alignItems={"flex-start"} spacing={3}>
                            {formikFamilyInfo.values.children.map((c, _i) => (
                                <ChildItem
                                    key={_i}
                                    child={c}
                                    removeChild={() =>
                                        formik.setFieldValue(
                                            "children",
                                            formik.values.children.filter(
                                                (c, i) => i !== _i
                                            )
                                        )
                                    }
                                />
                            ))}
                        </VStack>
                    </VStack>
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

export default CrtEditEmployeeFormFamilyInfo;
