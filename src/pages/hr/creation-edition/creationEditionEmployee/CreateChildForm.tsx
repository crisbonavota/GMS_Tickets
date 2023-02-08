import {
    Button,
    chakra,
    GridItem,
    HStack,
    SimpleGrid,
    useToast,
} from "@chakra-ui/react";
import * as Yup from "yup";
import { useFormik } from "formik";
import { useMutation, useQueryClient } from "react-query";
import { useAuthHeader } from "react-auth-kit";
import moment from "moment";
import { postResource } from "../../../../api/api";
import FormikInput from "../../../../components/FormikInput";

interface Props {
    onClose: () => void;
    id?: number;
}

const validationSchema = Yup.object().shape({
    birthDate: Yup.date().required("Birth date is required"),
});

const CreateChildForm = ({ onClose, id }: Props) => {
    const initialValues = {
        birthDate: moment().format("yyyy-MM-DD"),
    };
    
    const getAuthHeader = useAuthHeader();
    const toast = useToast();
    const queryClient = useQueryClient();

    const formik = useFormik({
        initialValues: initialValues,
        validationSchema,
        onSubmit: async () => {
            await createClient();
        },
    });

    const onSuccess = () => {
        queryClient.resetQueries("childs");
        queryClient.resetQueries(`childs-${id}`);
        toast({
            title: "Child created",
            status: "success",
            isClosable: true,
        });
        onClose();
    };

    const onError = (err: unknown) => {
        console.log(err);
        toast({
            title: "There was an error",
            description: "Try again later",
            status: "error",
            isClosable: true,
        });
    };

    const { mutateAsync: createClient, isLoading: creationLoading } =
        useMutation(
            () => postResource("childs", getAuthHeader(), formik.values),
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
                        type="date"
                        id={"birthDate"}
                        label={"Birth Date"}
                        name={"birthDate"}
                        value={formik.values.birthDate}
                        error={formik.errors.birthDate}
                        touched={formik.touched.birthDate}
                        onChange={formik.handleChange}
                    />
                </GridItem>
                <GridItem colSpan={{ base: 1, md: 2 }}>
                    <HStack w="full" justifyContent={"flex-end"} p={5}>
                        <Button type="button" onClick={onClose} variant="ghost">
                            Cancel
                        </Button>
                        <Button
                            type="submit"
                            colorScheme={"orange"}
                            isLoading={creationLoading}
                            isDisabled={creationLoading}
                        >
                            Submit
                        </Button>
                    </HStack>
                </GridItem>
            </SimpleGrid>
        </chakra.form>
    );
};

export default CreateChildForm;
