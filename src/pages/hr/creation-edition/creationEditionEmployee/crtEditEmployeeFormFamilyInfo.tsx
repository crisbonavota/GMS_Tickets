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

interface Props {
  onClose: () => void;
  editInitialValues?: Employee;
  id?: number;
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
        childs: editInitialValues.childs,
        maritalStatus: editInitialValues.maritalStatus,
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

  return (
    <chakra.form w={"full"} onSubmit={formik.handleSubmit}>
      <SimpleGrid columns={{ base: 1, md: 2 }} spacing={4}>
        <GridItem colSpan={1}>
          <FormControl
            isInvalid={
              !!formik.errors.maritalStatus && !!formik.touched.maritalStatus
            }
          >
            <FormLabel fontWeight={"bold"}>Marital Status</FormLabel>
            <Input
              name="maritalStatus"
              id="maritalStatus"
              value={formik.values.maritalStatus}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            <FormErrorMessage>{formik.errors?.maritalStatus}</FormErrorMessage>
          </FormControl>
        </GridItem>
        <GridItem colSpan={1}>
          <FormControl
            isInvalid={!!formik.errors.childs && !!formik.touched.childs}
          >
            <FormLabel fontWeight={"bold"}>Children</FormLabel>
            <Input
              name="childs"
              id="childs"
              value={formik.values.childs}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            <FormErrorMessage>{formik.errors?.childs}</FormErrorMessage>
          </FormControl>
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

export default CrtEditEmployeeFormFamilyInfo;
