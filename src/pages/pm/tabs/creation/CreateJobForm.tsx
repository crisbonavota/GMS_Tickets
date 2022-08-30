import {
    chakra,
    SimpleGrid,
    useToast,
    GridItem,
    Text,
    HStack,
    Icon,
    VStack,
    Button,
} from "@chakra-ui/react";
import * as Yup from "yup";
import { useAuthHeader } from "react-auth-kit";
import { useFormik } from "formik";
import { useMutation, useQueryClient } from "react-query";
import FormikTextInput from "./FormikTextInput";
import { IoIosRocket } from "react-icons/io";
import { RiSendBackward } from "react-icons/ri";
import { Tooltip } from "@chakra-ui/react";
import AccountField from "./AccountField";
import LeadField from "./LeadField";
import FormikSelectInput from "./FormikSelectInput";
import StatusField from "./StatusField";
import SoldField from "./SoldField";
import BusinessUnitField from "./BusinessUnitField";
import {
    postResource,
    getContractTypes,
    getCurrencies,
} from "../../../../api/api";

interface Props {
    onClose: () => void;
}

const validationSchema = Yup.object().shape({
    name: Yup.string().required("Name is required"),
    contractType: Yup.number(),
    hours: Yup.number().min(0, "Hours must be greater than 0"),
    currencyId: Yup.number(),
    sold: Yup.boolean(),
    startDate: Yup.date(),
    endDate: Yup.date(),
    notes: Yup.string(),
    active: Yup.bool(),
    accountId: Yup.number().nullable().required("Account is required"),
    leaderLegacyUserId: Yup.number().nullable().required("Lead is required"),
    businessUnitId: Yup.number()
        .nullable()
        .required("Business Unit is required"),
});

const initialValues = {
    name: "",
    contractType: 1,
    hours: 0,
    currencyId: 1,
    sold: false,
    startDate: new Date().toISOString(),
    endDate: new Date().toISOString(),
    notes: "",
    accountId: null,
    leaderLegacyUserId: null,
    active: true,
    businessUnitId: null,
};

const CreateJobForm = ({ onClose }: Props) => {
    const getAuthHeader = useAuthHeader();
    const queryClient = useQueryClient();
    const toast = useToast();

    const formik = useFormik({
        initialValues,
        validationSchema,
        onSubmit: async () => {
            await createJob();
        },
    });

    const { mutateAsync: createJob, isLoading } = useMutation(
        () => postResource("projects", getAuthHeader(), formik.values),
        {
            onSuccess: () => {
                queryClient.resetQueries("projects");
                toast({
                    title: "Job created",
                    status: "success",
                    isClosable: true,
                });
                onClose();
            },
            onError: (error) => {
                console.log(error);
                toast({
                    title: "Error creating job",
                    description: "Try again later",
                    status: "error",
                });
            },
        }
    );

    return (
        <chakra.form w={"full"} onSubmit={formik.handleSubmit}>
            <SimpleGrid columns={{ base: 1, md: 2 }} spacing={4}>
                <GridItem colSpan={1}>
                    <FormikTextInput
                        name="name"
                        id="name"
                        value={formik.values.name}
                        onChange={formik.handleChange}
                        error={formik.errors.name}
                        touched={formik.touched.name}
                        label="Name"
                    />
                </GridItem>
                <GridItem colSpan={1}>
                    <VStack alignItems={"flex-start"}>
                        <Text>Type</Text>
                        <HStack spacing={1} alignItems={"center"} fontSize="xl">
                            <Icon
                                as={
                                    formik.values.sold
                                        ? IoIosRocket
                                        : RiSendBackward
                                }
                                color={"#3B8A7F"}
                            />
                            <Tooltip label="This value is determined by SOLD property">
                                <Text>
                                    {formik.values.sold
                                        ? "Project"
                                        : "Proposal"}
                                </Text>
                            </Tooltip>
                        </HStack>
                    </VStack>
                </GridItem>
                <GridItem colSpan={1}>
                    <AccountField
                        setter={(value: number | null) =>
                            formik.setFieldValue("accountId", value, true)
                        }
                        error={formik.errors.accountId}
                        touched={formik.touched.accountId}
                        name="accountId"
                    />
                </GridItem>
                <GridItem colSpan={1}>
                    <LeadField
                        setter={(value: number | null) =>
                            formik.setFieldValue(
                                "leaderLegacyUserId",
                                value,
                                true
                            )
                        }
                        error={formik.errors.leaderLegacyUserId}
                        touched={formik.touched.leaderLegacyUserId}
                        name="leaderLegacyUserId"
                    />
                </GridItem>
                <GridItem colSpan={1}>
                    <BusinessUnitField
                        setter={(value: number | null) =>
                            formik.setFieldValue("businessUnitId", value, true)
                        }
                        error={formik.errors.businessUnitId}
                        touched={formik.touched.businessUnitId}
                    />
                </GridItem>
                <GridItem colSpan={1}>
                    <FormikSelectInput
                        name="contractType"
                        id="contractType"
                        value={formik.values.contractType}
                        onChange={formik.handleChange}
                        error={formik.errors.contractType}
                        touched={formik.touched.contractType}
                        label="Contract type"
                        children={getContractTypes().map((ct) => (
                            <option key={ct.value} value={ct.value}>
                                {ct.label}
                            </option>
                        ))}
                    />
                </GridItem>
                <GridItem colSpan={1}>
                    <FormikTextInput
                        name="hours"
                        id="hours"
                        value={formik.values.hours}
                        onChange={formik.handleChange}
                        error={formik.errors.hours}
                        touched={formik.touched.hours}
                        label="Hours"
                        type="number"
                    />
                </GridItem>
                <GridItem colSpan={1}>
                    <HStack alignItems={"center"} spacing={5}>
                        <FormikSelectInput
                            name="currencyId"
                            id="currencyId"
                            value={formik.values.currencyId}
                            onChange={formik.handleChange}
                            error={formik.errors.currencyId}
                            touched={formik.touched.currencyId}
                            label="Currency"
                            children={getCurrencies().map((ct) => (
                                <option key={ct.id} value={ct.id}>
                                    {ct.code}
                                </option>
                            ))}
                        />
                        <SoldField
                            value={formik.values.sold}
                            setter={(value: boolean) =>
                                formik.setFieldValue("sold", value, true)
                            }
                        />
                    </HStack>
                </GridItem>
                <GridItem colSpan={1}>
                    <FormikTextInput
                        name="startDate"
                        id="startDate"
                        value={formik.values.startDate}
                        onChange={formik.handleChange}
                        error={formik.errors.startDate}
                        touched={formik.touched.startDate}
                        label="Start date"
                        type="date"
                    />
                </GridItem>
                <GridItem colSpan={1}>
                    <FormikTextInput
                        name="endDate"
                        id="endDate"
                        value={formik.values.endDate}
                        onChange={formik.handleChange}
                        error={formik.errors.endDate}
                        touched={formik.touched.endDate}
                        label="End date"
                        type="date"
                    />
                </GridItem>
                <GridItem colSpan={1}>
                    <StatusField
                        setter={(value: boolean) =>
                            formik.setFieldValue("active", value, true)
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
                            isLoading={isLoading}
                        >
                            Create Job
                        </Button>
                    </HStack>
                </GridItem>
            </SimpleGrid>
        </chakra.form>
    );
};

export default CreateJobForm;
