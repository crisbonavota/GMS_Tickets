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
  birthCountryId: Yup.number().nullable(),
  countryId: Yup.number().nullable(),
});

const initialValues = {
  countryId: 0,
  birthCountryId: 0,
  address: null,
  city: "",
};

let editInitialValuesToFormikValues = (editInitialValues?: Employee) =>
  editInitialValues
    ? {
        birthCountryId: editInitialValues?.birthCountry?.id,
        countryId: editInitialValues?.country?.id,
        address: editInitialValues.address,
        city: editInitialValues.city,
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
          <FormLabel fontWeight={"bold"}>Nationality</FormLabel>
          <Select
            name="birthCountryId"
            id="birthCountryId"
            value={formik.values.birthCountryId}
            onChange={(event) => {
              formik.setFieldValue("birthCountryId", event.target.value);
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
          <FormLabel fontWeight={"bold"}>Country of Residence</FormLabel>
          <Select
            name="countryId"
            id="countryId"
            value={formik.values.countryId.toString()}
            onChange={(event) => {
              formik.setFieldValue("countryId", event.target.value);
            }}
            onBlur={formik.handleBlur}
          >
            {isSuccess &&
              countries.map((el) => (
                <option key={el.id} value={el.id.toString()}>
                  {el.name}
                </option>
              ))}
          </Select>
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
            <Button type="submit" colorScheme={"orange"} minWidth={"8rem"}>
              Next
            </Button>
          </HStack>
        </GridItem>
      </SimpleGrid>
    </chakra.form>
  );
};

export default CrtEditEmployeeFormLocationInfo;


