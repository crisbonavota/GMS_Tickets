import {
  chakra,
  SimpleGrid,
  GridItem,
  HStack,
  Button,
  Input,
  FormLabel,
} from "@chakra-ui/react";
import * as Yup from "yup";
import { useFormik } from "formik";
import { Employee } from "../../../../api/types";
import CountryField from "../../../pm/creation-edition/CountryField";
import { EmployeeLocationInfo } from "../../../../redux/slices/hr";
import { useAppDispatch } from "../../../../redux/hooks";

interface Props {
  onClose: () => void;
  editInitialValues?: Employee;
  id?: number;
  tabIndex: number;
  setTabIndex: (tabIndex: number) => void;
}

const validationSchema = Yup.object().shape({
  address: Yup.string().nullable(),
  city: Yup.string().nullable(),
  birthCountryId: Yup.string().nullable(),
  countryId: Yup.string().nullable(),
});

const initialValues = {
  countryId: 0,
  birthCountryId: 0,
  address: null,
  city: "",
};

const editInitialValuesToFormikValues = (editInitialValues?: Employee) =>
  editInitialValues
    ? {
        ...editInitialValues,
        birthCountryId: editInitialValues?.birthCountry?.id,
        countryId: editInitialValues?.country?.id,
      }
    : undefined;

const crtEditEmployeeFormLocationInfo = ({
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
        type: EmployeeLocationInfo,
        payload: { ...formik.values },
      });
      setTabIndex(tabIndex + 1);
  },
  });

  return (
    <chakra.form w={"full"} onSubmit={formik.handleSubmit}>
      <SimpleGrid columns={{ base: 1, md: 2 }} spacing={4}>
        <GridItem colSpan={1}>
          <FormLabel fontWeight={"bold"}>Nationality</FormLabel>
          <CountryField
            name="birthCountryId"
            id="birthCountryId"
            value={formik.values.birthCountryId}
            error={formik.errors.birthCountryId}
            onChange={formik.handleChange}
          />
        </GridItem>
        <GridItem colSpan={1}>
          <FormLabel fontWeight={"bold"}>Country of Residence</FormLabel>
          <CountryField
            name="countryId"
            value={formik.values.countryId}
            error={formik.errors.countryId}
            onChange={formik.handleChange}
            id="countryId"
          />
        </GridItem>
        <GridItem colSpan={1}>
          <FormLabel fontWeight={"bold"}>Address</FormLabel>
          <Input
            name="address"
            id="address"
            value={formik.values.address?.street}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
        </GridItem>
        <GridItem colSpan={1}>
          <FormLabel fontWeight={"bold"} fontSize={"sm"}>
            City
          </FormLabel>
          <Input
            name="city"
            id="city"
            value={formik.values.city}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
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

export default crtEditEmployeeFormLocationInfo;
