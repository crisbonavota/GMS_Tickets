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
import * as Yup from "yup";
import { useFormik } from "formik";
import { useQuery } from "react-query";
import { Employee } from "../../../../api/types";
import { getGenders } from "../../../../api/api";
import { EmployeePersonalInfo } from "../../../../redux/slices/hr";
import { useAppDispatch } from "../../../../redux/hooks";
import moment from "moment";

interface Props {
  onClose: () => void;
  editInitialValues?: Employee;
  id?: number;
  tabIndex: number;
  setTabIndex: (tabIndex: number) => void;
}

const validationSchema = Yup.object().shape({
  firstName: Yup.string().required("First name is required"),
  lastName: Yup.string().required("Last name is required"),
  birthDate: Yup.string().required("Date of Birth is required"),
  gender: Yup.string().required("Gender is required"),
  email: Yup.string()
    .required("Email is required")
    .email("Invalid email format"),
  entryDate: Yup.string().nullable(),
  afipid: Yup.string().nullable(),
});

const initialValues = {
  fileNumber: "",
  firstName: "",
  lastName: "",
  email: "",
  afipId: "",
  entryDate: new Date().toISOString(),
  birthDate: new Date().toISOString(),
  gender: true,
  active: true,
};

const editInitialValuesToFormikValues = (editInitialValues?: Employee) =>
  editInitialValues
    ? {
        ...editInitialValues,
        firstName: editInitialValues.firstName.replace(
          ` (${editInitialValues.id})`,
          ""
        ),
        entryDate: moment(editInitialValues.entryDate).format("yyyy-MM-DD"),
        birthDate: moment(editInitialValues.birthDate).format("yyyy-MM-DD"),
        active: editInitialValues?.active,
      }
    : undefined;

const crtEditEmployeeFormPersonalInfo = ({
  onClose,
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
      if (editInitialValues) {
        dispatch({
          type: EmployeePersonalInfo,
          payload: { ...formik.values },
        });
        setTabIndex(tabIndex + 1);
      } else {
        dispatch({
          type: EmployeePersonalInfo,
          payload: { ...formik.values },
        });
        setTabIndex(tabIndex + 1);
      }
    },
  });

  const { data: gender, isSuccess } = useQuery("genders", () => getGenders());

  return (
    <chakra.form w={"full"} onSubmit={formik.handleSubmit}>
      <SimpleGrid columns={{ base: 1, md: 2 }} spacing={4}>
        {editInitialValues && (
          <GridItem colSpan={1}>
            <FormLabel fontWeight={"bold"}>File Number</FormLabel>
            <Input
              name="fileNumber"
              id="fileNUmber"
              value={editInitialValues?.fileNumber}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
          </GridItem>
        )}
        <GridItem colSpan={1}>
          <FormControl
            isRequired
            isInvalid={!!formik.errors.firstName && !!formik.touched.firstName}
          >
            <FormLabel fontWeight={"bold"}>First Name</FormLabel>
            <Input
              name="firstName"
              id="firstName"
              value={formik.values.firstName}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            <FormErrorMessage>{formik.errors?.firstName}</FormErrorMessage>
          </FormControl>
        </GridItem>
        <GridItem colSpan={1}>
          <FormControl
            isRequired
            isInvalid={!!formik.errors.lastName && !!formik.touched.lastName}
          >
            <FormLabel fontWeight={"bold"}>Last Name</FormLabel>
            <Input
              name="lastName"
              id="lastName"
              value={formik.values.lastName}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            <FormErrorMessage>{formik.errors?.lastName}</FormErrorMessage>
          </FormControl>
        </GridItem>
        <GridItem colSpan={1}>
          <FormControl
            isRequired
            isInvalid={!!formik.errors.email && !!formik.touched.email}
          >
            <FormLabel fontWeight={"bold"}>Email</FormLabel>
            <Input
              name="email"
              id="email"
              value={formik.values.email}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            <FormErrorMessage>{formik.errors?.email}</FormErrorMessage>
          </FormControl>
        </GridItem>
        <GridItem colSpan={1}>
          <FormLabel fontWeight={"bold"}>Date of Admission</FormLabel>
          <Input
            type="date"
            name="entryDate"
            id="entryDate"
            value={formik.values.entryDate}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
        </GridItem>
        <GridItem colSpan={1}>
          <FormLabel fontWeight={"bold"}>Status</FormLabel>
          <Select>
            <option>Active</option>
            <option>Inactive</option>
          </Select>
        </GridItem>
        <GridItem colSpan={1}>
          <FormControl
            isInvalid={!!formik.errors.afipId && !!formik.touched.afipId}
          >
            <FormLabel fontWeight={"bold"} fontSize={"sm"}>
              Social/CUIL/Mexico/Spain/Brazil/Uru
            </FormLabel>
            <Input
              name="afipId"
              id="afipId"
              value={formik.values.afipId}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
          </FormControl>
        </GridItem>
        <GridItem colSpan={1}>
          <FormControl
            isRequired
            isInvalid={!!formik.errors.gender && !!formik.touched.gender}
          >
            <FormLabel fontWeight={"bold"}>Gender</FormLabel>
            <Select
              name="gender"
              id="gender"
              value={formik.values.gender.toString()}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            >
              {isSuccess &&
                gender.map((el) => (
                  <option key={el.label} value={el.value.toString()}>
                    {el.label}
                  </option>
                ))}
            </Select>
            <FormErrorMessage>{formik.errors?.gender}</FormErrorMessage>
          </FormControl>
        </GridItem>
        <GridItem colSpan={1}>
          <FormControl
            isRequired
            isInvalid={!!formik.errors.birthDate && !!formik.touched.birthDate}
          >
            <FormLabel fontWeight={"bold"}>Date of Birth</FormLabel>
            <Input
              type="date"
              name="birthDate"
              id="birthDate"
              value={formik.values.birthDate}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            <FormErrorMessage>{formik.errors?.birthDate}</FormErrorMessage>
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
              onClick={onClose}
              variant="outline"
              colorScheme={"orange"}
              minWidth={"8rem"}
            >
              Cancel
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

export default crtEditEmployeeFormPersonalInfo;
