import {
    chakra,
    SimpleGrid,
    useToast,
    GridItem,
    HStack,
    Button,
    FormControl,
} from "@chakra-ui/react";
import * as Yup from "yup";
import { useAuthHeader } from "react-auth-kit";
import { useFormik } from "formik";
import { useMutation, useQueryClient } from "react-query";
import { Training } from "../../../api/types";
import {
    getSatisfactionLevels,
    getTrainingsStates,
    patchResource,
} from "../../../api/api";
import { postResource } from "../../../api/api";
import FormikInput from "../../../components/FormikInput";
import { AxiosError } from "axios";
import moment from "moment";
import FormikSelectInput from "../../pm/creation-edition/FormikSelectInput";
import TrainingUserField from "./TrainingUsersField";

interface Props {
    onClose: () => void;
    editInitialValues?: Training;
    id?: number;
}

const validationSchema = Yup.object().shape({
    name: Yup.string().required("Name is required"),
    companyName: Yup.string().required("Company name is required"),
    numberOfHours: Yup.number().nullable(),
    startDate: Yup.date(),
    endDate: Yup.date().nullable(),
    status: Yup.number().required("Status is required"),
    satisfactionLevel: Yup.string().nullable(),
    legacyUserId: Yup.number().nullable().required("Employee/Provider is required"),
});

const initialValues = {
    name: "",
    companyName: "",
    numberOfHours: 0,
    startDate: moment().format("yyyy-MM-DD"),
    endDate: "",
    status: 0,
    satisfactionLevel: "",
    legacyUserId: null,
};

const editInitialValuesToFormikValues = (editInitialValues?: Training) =>
    editInitialValues
        ? {
              ...editInitialValues,
              startDate: moment
                  .utc(editInitialValues.startDate)
                  .format("yyyy-MM-DD"),
              endDate: moment
                  .utc(editInitialValues.endDate)
                  .format("yyyy-MM-DD"),
          }
        : undefined;

const CreateEditTrainingForm = ({ onClose, editInitialValues, id }: Props) => {
    const getAuthHeader = useAuthHeader();
    const queryClient = useQueryClient();
    const toast = useToast();

    const formik = useFormik({
        initialValues:
            editInitialValuesToFormikValues(editInitialValues) || initialValues,
        validationSchema,
        onSubmit: async () => {
            if (editInitialValues) await editTraining();
            else await createTraining();
        },
    });

    const onSuccess = () => {
        queryClient.resetQueries("trainings");
        queryClient.resetQueries("training");
        // queryClient.resetQueries(`provider-${id}`);
        toast({
            title: editInitialValues ? "Training updated" : "Training created",
            status: "success",
            isClosable: true,
        });
        onClose();
    };

    const onError = (err: AxiosError) => {
        console.log(err);
        toast({
            title: "Error",
            description: <>{err?.response?.data || "Try again later"}</>,
            status: "error",
        });
    };

    const { mutateAsync: createTraining, isLoading: creationLoading } =
        useMutation(
            () => postResource("trainings", getAuthHeader(), formik.values),
            {
                onSuccess: onSuccess,
                onError: onError,
            }
        );

    const { mutateAsync: editTraining, isLoading: editLoading } = useMutation(
        () =>
            patchResource(
                "trainings",
                id || 0,
                getAuthHeader(),
                editInitialValuesToFormikValues(editInitialValues) || {},
                formik.values
            ),
        {
            onSuccess: onSuccess,
            onError: onError,
        }
    );

    return (
        <chakra.form w={"full"} onSubmit={formik.handleSubmit}>
            <SimpleGrid columns={{ base: 1, md: 2 }} spacing={4}>
                <GridItem colSpan={1}>
                    <FormikInput
                        label="Name"
                        isRequired={true}
                        name={"name"}
                        id={"name"}
                        value={formik.values.name}
                        onChange={formik.handleChange}
                        touched={formik.touched.name}
                        error={formik.errors.name}
                    />
                </GridItem>
                <GridItem colSpan={1}>
                    <FormikInput
                        name="companyName"
                        id="companyName"
                        isRequired={true}
                        value={formik.values.companyName}
                        onChange={formik.handleChange}
                        error={formik.errors.companyName}
                        touched={formik.touched.companyName}
                        label="Company Name"
                    />
                </GridItem>
                <GridItem colSpan={1}>
                    <FormikInput
                        type="date"
                        name="startDate"
                        id="startDate"
                        isRequired={true}
                        value={formik.values.startDate}
                        onChange={formik.handleChange}
                        error={formik.errors.startDate}
                        touched={formik.touched.startDate}
                        label="Start Date"
                    />
                </GridItem>
                <GridItem colSpan={1}>
                    <FormikInput
                        type="date"
                        name="endDate"
                        id="endDate"
                        value={formik.values.endDate}
                        onChange={formik.handleChange}
                        error={formik.errors.endDate}
                        touched={formik.touched.endDate}
                        label="End Date"
                    />
                </GridItem>
                <GridItem colSpan={1}>
                    <FormikInput
                        name="numberOfHours"
                        id="numberOfHours"
                        value={formik.values.numberOfHours}
                        onChange={formik.handleChange}
                        error={formik.errors.numberOfHours}
                        touched={formik.touched.numberOfHours}
                        label="Number of Hours"
                    />
                </GridItem>
                <GridItem colSpan={1}>
                    <FormControl isInvalid={!formik.errors.status}>
                        <FormikSelectInput
                            isRequired={true}
                            label="Status"
                            name="status"
                            value={formik.values.status}
                            error={formik.errors.status}
                            touched={formik.touched.status}
                            onChange={(v) =>
                                formik.setFieldValue("status", v.target.value)
                            }
                            children={getTrainingsStates.map((s) => (
                                <option
                                    key={s.label}
                                    value={s.value.toString()}
                                >
                                    {s.label}
                                </option>
                            ))}
                        />
                    </FormControl>
                </GridItem>
                <GridItem colSpan={1}>
                    <FormControl isInvalid={!formik.errors.status}>
                        <FormikSelectInput
                            label="Stisfaction Level"
                            name="satisfactionLevel"
                            value={formik.values.satisfactionLevel}
                            error={formik.errors.satisfactionLevel}
                            touched={formik.touched.satisfactionLevel}
                            onChange={(v) =>
                                formik.setFieldValue(
                                    "satisfactionLevel",
                                    v.target.value
                                )
                            }
                            children={getSatisfactionLevels.map((s) => (
                                <option
                                    key={s.label}
                                    value={s.value.toString()}
                                >
                                    {s.label}
                                </option>
                            ))}
                        />
                    </FormControl>
                </GridItem>
                <GridItem colSpan={1}>
                    <TrainingUserField
                        setter={(value: number | null) =>
                            formik.setFieldValue("legacyUserId", value, true)
                        }
                        error={formik.errors.legacyUserId}
                        touched={formik.touched.legacyUserId}
                        defaultValue={
                            editInitialValues
                                ? {
                                      value: editInitialValues?.legacyUser?.id,
                                      label: editInitialValues?.legacyUser
                                          ?.fullName,
                                  }
                                : undefined
                        }
                    />
                </GridItem>
                <GridItem colSpan={{ base: 1, md: 2 }}>
                    <HStack
                        w="full"
                        justifyContent={"flex-end"}
                        spacing={5}
                        p={5}
                    >
                        <Button type="button" onClick={onClose} variant="ghost">
                            Cancel
                        </Button>
                        <Button
                            type="submit"
                            colorScheme={"orange"}
                            isLoading={creationLoading || editLoading}
                            isDisabled={creationLoading || editLoading}
                        >
                            Submit
                        </Button>
                    </HStack>
                </GridItem>
            </SimpleGrid>
        </chakra.form>
    );
};

export default CreateEditTrainingForm;
