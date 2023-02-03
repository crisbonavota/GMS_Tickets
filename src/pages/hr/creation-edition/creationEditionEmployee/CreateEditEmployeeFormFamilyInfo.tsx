import {
    chakra,
    SimpleGrid,
    GridItem,
    HStack,
    Button,
    FormControl,
    FormErrorMessage,
    Input,
    FormLabel,
} from "@chakra-ui/react";
import * as Yup from "yup";
import { useFormik } from "formik";
import { Employee } from "../../../../api/types";
import { employeeFamilyInfo } from "../../../../redux/slices/hr";
import { useAppDispatch } from "../../../../redux/hooks";
import { useEffect } from "react";
import FormikInput from "../../../../components/FormikInput";

interface Props {
    onClose: () => void;
    editInitialValues?: Employee;
    tabIndex: number;
    setTabIndex: (tabIndex: number) => void;
}

const validationSchema = Yup.object().shape({
    childs: Yup.number().nullable().typeError("Must be a number type"),
    maritalStatus: Yup.string().nullable(),
});

const initialValues = {
    childs: 0,
    maritalStatus: "",
};

const editInitialValuesToFormikValues = (editInitialValues?: Employee) =>
    editInitialValues
        ? {
              childs: editInitialValues.childs || "",
              maritalStatus: editInitialValues.maritalStatus || "",
          }
        : undefined;

const CrtEditEmployeeFormFamilyInfo = ({
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
                type: employeeFamilyInfo,
                payload: { ...formik.values },
            });
            setTabIndex(tabIndex + 1);
        },
    });

    useEffect(() => {
        if (tabIndex !== 2) {
            dispatch({
                type: employeeFamilyInfo,
                payload: { ...formik.values },
            });
        }
    }, [tabIndex]);

    return (
        <chakra.form w={"full"} onSubmit={formik.handleSubmit}>
            <SimpleGrid columns={{ base: 1, md: 2 }} spacing={4}>
                <GridItem colSpan={1}>
                    <FormikInput
                        label="Marital Status"
                        isRequired={false}
                        name={"maritalStatus"}
                        id={"maritalStatus"}
                        value={formik.values.maritalStatus}
                        onChange={formik.handleChange}
                        touched={formik.touched.maritalStatus}
                        error={formik.errors.maritalStatus}
                    />
                </GridItem>
                <GridItem colSpan={1}>
                    <FormikInput
                        label="Children"
                        isRequired={false}
                        name={"childs"}
                        id={"childs"}
                        value={formik.values.childs}
                        onChange={formik.handleChange}
                        touched={formik.touched.childs}
                        error={formik.errors.childs}
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
                            onClick={() => setTabIndex(tabIndex - 1)}
                            variant="outline"
                            colorScheme={"orange"}
                            minWidth={"8rem"}
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
