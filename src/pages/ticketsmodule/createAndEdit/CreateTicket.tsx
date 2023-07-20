import { useEffect, useState } from "react";
import * as Yup from "yup";
import {
  Button,
  FormControl,
  FormLabel,
  Input,
  VStack,
  chakra,
  useToast,
  Text,
  SimpleGrid,
  GridItem,
  FormErrorMessage,
  HStack,
  Textarea,
  Heading,
  Box,
} from "@chakra-ui/react";
import { useFormik } from "formik";
import { QueryClient, useMutation, useQuery } from "react-query";
import { useNavigate, useParams } from "react-router-dom";
import { TicketCreation, Tipo, Priorities, Status } from "../../../api/types";
import clienteAxios from "../../../services/axios";
import { useAuthHeader } from "react-auth-kit";
import MultiUserSelection from "../../../components/TicketsModule/MultiUserSelection";
import StaticSelection from "../../../components/TicketsModule/StaticSelection";
import { getOptionsFromEnum } from "../../../api/utils";
import { useQueryClient } from "react-query";

interface CreateTicketProps {
  close: () => void;
}

const CreateTicket = ({ close }: CreateTicketProps) => {
  const [prueba, setPrueba] = useState("");
  const getAuthHeader = useAuthHeader();
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const toast = useToast();
  const [formSubmitted, setFormSubmitted] = useState(false);
  const queryClient = useQueryClient();

  const validationSchema = Yup.object().shape({
    subject: Yup.string().required("Subject is required"),
    assigneesIds: Yup.array().min(1, "Assignees are required"),
    tipo: Yup.string().required("Type is required"),
    priorities: Yup.string().required("Priority is required"),
    status: Yup.string().required("Status is required"),
    description: Yup.string().required("Description is required"),
  });

  const initialValues = {
    followersIds: [] as string[],
    assigneesIds: [] as string[],
    tipo: "" as unknown as Tipo, // Assigning an initial value with the correct type
    priorities: "" as unknown as Priorities, // Assigning an initial value with the correct type
    subject: "",
    status: "" as unknown as Status, // Assigning an initial value with the correct type
    description: "",
  };

  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit: () => {
      setFormSubmitted(true);
      createTicket();
    },
  });

  const { mutate: createTicket } = useMutation(
    () =>
      clienteAxios.post<TicketCreation>(
        `/ticket/ticket`,
        {
          followersIds: formik.values.followersIds,
          assigneesIds: formik.values.assigneesIds,
          tipo: Number(formik.values.tipo),
          priority: Number(formik.values.priorities),
          subject: formik.values.subject,
          status: Number(formik.values.status),
          description: formik.values.description,
        },
        {
          headers: {
            Authorization: getAuthHeader(),
          },
        }
      ),
    {
      onSuccess: (r) => {
        toast({
          title: "Ticket created successfully",
          status: "success",
        });
        close();
        queryClient.resetQueries("tickets");
      },
      onError: (e) => {
        console.log("Unable to create ticket", e);
      },
    }
  );

  return (
    <chakra.form
      onSubmit={formik.handleSubmit}
      bgColor="transparent"
      p={5}
      rounded="xl"
      color="black"
    >
      <SimpleGrid spacing={8} columns={2}>
        <GridItem colSpan={2}>
          <VStack spacing={5} w="full" alignItems={"flex-start"}>
            <Box>
              <Heading fontFamily={""} size="md">
                General information{" "}
              </Heading>
              <Text>Some details about your request.</Text>
            </Box>
          </VStack>
        </GridItem>
        <GridItem colSpan={1}>
          <VStack alignItems={"flex-start"} spacing={2} w="full">
            <FormControl
              isInvalid={
                formik.errors.subject !== undefined && formik.touched.subject
              }
            >
              <FormLabel htmlFor="subject">Subject: </FormLabel>
              <Input
                errorBorderColor="none"
                placeholder="Type a subject..."
                borderColor={"gray.300"}
                type="subject"
                id="subject"
                name="subject"
                bg={"white"}
                value={formik.values.subject}
                onChange={formik.handleChange}
                textColor={
                  formik.values.subject === "" ? "gray.300" : "gray.700"
                }
              />
              <FormErrorMessage>{formik.errors.subject}</FormErrorMessage>
            </FormControl>
            <FormControl
              isInvalid={
                formik.errors.assigneesIds !== undefined &&
                formik.touched.assigneesIds
              }
            >
              <MultiUserSelection
                setter={(value: number[]) => {
                  formik.setFieldValue("assigneesIds", value);
                }}
                resource="/applicationUser"
                nameProp="name"
                valueProp="id"
                label="Assignees"
                placeholder="Select users"
              />
              <FormErrorMessage>{formik.errors.assigneesIds}</FormErrorMessage>
            </FormControl>
            <FormControl
              isInvalid={
                formik.errors.tipo !== undefined && formik.touched.tipo
              }
            >
              <FormLabel htmlFor="tipo">Tipo: </FormLabel>
              <StaticSelection
                setValue={(value: number) => {
                  formik.setFieldValue("tipo", value);
                }}
                value={formik.values.tipo}
                options={getOptionsFromEnum(Tipo)}
              />
              <FormErrorMessage>{formik.errors.tipo}</FormErrorMessage>
            </FormControl>
          </VStack>
        </GridItem>

        <GridItem colSpan={1}>
          <VStack alignItems={"flex-start"} spacing={2} w="full">
            <FormControl
              isInvalid={
                formik.errors.priorities !== undefined &&
                formik.touched.priorities
              }
            >
              <FormLabel htmlFor="priorities">Priority: </FormLabel>
              <StaticSelection
                setValue={(value: number) => {
                  formik.setFieldValue("priorities", value);
                }}
                value={formik.values.priorities}
                options={getOptionsFromEnum(Priorities)}
              />
              <FormErrorMessage>{formik.errors.priorities}</FormErrorMessage>
            </FormControl>

            <FormControl>
              <MultiUserSelection
                setter={(value: number[]) => {
                  formik.setFieldValue("followersIds", value);
                }}
                resource="/applicationUser"
                nameProp="name"
                valueProp="id"
                label="Followers"
                placeholder="Select users"
              />
            </FormControl>
            <FormControl
              isInvalid={
                formik.errors.status !== undefined && formik.touched.status
              }
            >
              <FormLabel htmlFor="status">Status: </FormLabel>
              <StaticSelection
                setValue={(value: number) => {
                  formik.setFieldValue("status", value);
                }}
                value={formik.values.status}
                options={getOptionsFromEnum(Status)}
              />
              <FormErrorMessage>{formik.errors.status}</FormErrorMessage>
            </FormControl>
          </VStack>
        </GridItem>

        <GridItem colSpan={2}>
          <VStack spacing={5} w="full" alignItems={"flex-start"}>
            <Box>
              <Heading fontFamily={""} size="md">
                Description{" "}
              </Heading>
              <Text>
                This will appear in the chat as your first message to the
                assignees.
              </Text>
            </Box>
            <FormControl
              isInvalid={
                formik.errors.description !== undefined &&
                formik.touched.description
              }
            >
              <Textarea
                errorBorderColor="none"
                placeholder="Type a description..."
                id="description"
                name="description"
                value={formik.values.description}
                onChange={formik.handleChange}
                rows={3}
                resize={"none"}
              />
              <FormErrorMessage>{formik.errors.description}</FormErrorMessage>
            </FormControl>
            <Box
              paddingTop={5}
              w={"full"}
              display={"flex"}
              justifyContent={"flex-end"}
            >
              <HStack spacing={3}>
                <Button bg={"transparent"} onClick={close} p={"5"}>
                  Cancel
                </Button>
                <Button colorScheme="orange" type="submit" p={"5"}>
                  Submit
                </Button>
              </HStack>
            </Box>
          </VStack>
        </GridItem>
      </SimpleGrid>
    </chakra.form>
  );
};

export default CreateTicket;
