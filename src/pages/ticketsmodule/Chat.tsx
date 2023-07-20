import { useEffect } from "react";
import {
  Avatar,
  Box,
  Button,
  FormControl,
  HStack,
  IconButton,
  Text,
  Textarea,
  VStack,
  chakra,
  useToast,
} from "@chakra-ui/react";
import { useAuthHeader } from "react-auth-kit";
import { useMutation, useQuery, useQueryClient } from "react-query";
import {
  MessageView,
  MessageCreation,
  TicketView,
  TicketRoles,
} from "../../api/types";
import clienteAxios from "../../services/Axios";
import { useFormik } from "formik";
import { AiOutlineSend } from "react-icons/ai";
import { BsPersonCircle } from "react-icons/bs";
import { mapEnumToName } from "../../api/utils";
import chatCornerMessageReceived from "../../assets/chatCornerMessageReceived.svg";
import chatCornerMessageSent from "../../assets/chatCornerMessageSent.svg";
import { format } from "date-fns";

interface Props {
  ticket: TicketView;
}

const Chat = ({ ticket }: Props) => {
  const getAuthHeader = useAuthHeader();
  const toast = useToast();
  const queryClient = useQueryClient();

  const formik = useFormik({
    initialValues: {
      message: "",
    },
    onSubmit: () => {
      console.log("submit");
      createMessage();
    },
  });

  const { data: messagesRes, isSuccess } = useQuery(
    ["messages", ticket],
    () =>
      clienteAxios.get<MessageView[]>(`/ticket/messagesByTicket/${ticket.id}`, {
        headers: { Authorization: getAuthHeader() },
      }),
    {
      select: (messagesRes) => messagesRes.data,
      refetchOnWindowFocus: false,
    }
  );

  const { mutate: createMessage } = useMutation(
    () =>
      clienteAxios.post<MessageCreation>(
        `/ticket/message`,
        {
          ticketId: ticket.id,
          content: formik.values.message,
        },
        {
          headers: {
            Authorization: getAuthHeader(),
          },
        }
      ),
    {
      onSuccess: () => {
        formik.resetForm(); // Reset the form after successful message creation
        queryClient.resetQueries(["messages", ticket]);
        toast({
          title: "Message sent",
          status: "success",
        });
      },
      onError: (e) => {
        console.log("Unable to send message", e);
      },
    }
  );

  useEffect(() => {
    //   // Scroll to the bottom of the chat messages when new messages are fetched
    const chatContainer = document.getElementById("chat-container");
    if (chatContainer) {
      chatContainer.scrollTop = chatContainer.scrollHeight;
    }
  }, [messagesRes]);

  return (
    <chakra.form
      onSubmit={formik.handleSubmit}
      w="full"
      bg={"white"}
      borderRadius={20}
    >
      <Box boxShadow="2xl" borderRadius={20}>
        <VStack>
          <VStack
            spacing={0}
            id="chat-container"
            overflowY="auto"
            w={"99%"}
            h={"60vh"}
            css={{
              "&::-webkit-scrollbar": {
                width: "10px",
              },
              "&::-webkit-scrollbar-track": {
                width: "6px",
              },
              "&::-webkit-scrollbar-thumb": {
                background: "#F5F5F5",
                borderRadius: "24px",
              },
            }}
          >
            {isSuccess &&
              messagesRes?.map((message, index) => (
                <Box
                  key={index}
                  w="full"
                  display="flex"
                  justifyContent={
                    message.author.id === ticket.currentUserId
                      ? "flex-end"
                      : "flex-start"
                  }
                >
                  <Box w="fit-content">
                    <HStack p={3} spacing={0} alignItems="flex-start">
                      {message.author.id !== ticket.currentUserId && (
                        <img src={chatCornerMessageReceived} width="23rem" />
                      )}
                      <Box
                        p={0}
                        borderTopLeftRadius={
                          message.author.id === ticket.currentUserId
                            ? "14"
                            : "0"
                        }
                        borderTopRightRadius={
                          message.author.id === ticket.currentUserId
                            ? "0"
                            : "14"
                        }
                        borderBottomRadius={14}
                        maxW="40rem"
                        bg="#F5F5F5"
                        paddingLeft={7}
                        paddingRight={7}
                      >
                        <VStack p={3} alignItems="flex-start">
                          <HStack>
                            <Avatar
                              variant="circle"
                              size="md"
                              name={message.author.name}
                            />
                            <VStack
                              spacing={0}
                              alignItems="flex-start"
                              paddingLeft={1}
                            >
                              <Text
                                fontSize="lg"
                                fontWeight="semibold"
                                textColor="#1A202C"
                              >
                                {message.author.name}
                              </Text>
                              <Text
                                fontSize="sm"
                                fontWeight="light"
                                textColor="#EF810E"
                              >
                                {message.author.id === ticket.requester.id
                                  ? "Requester"
                                  : ticket.followers.some(
                                      (follower) =>
                                        follower.id === message.author.id
                                    )
                                  ? "Follower"
                                  : ticket.assignees.some(
                                      (assignee) =>
                                        assignee.id === message.author.id
                                    )
                                  ? "Assignee"
                                  : "Not Related"}
                              </Text>
                            </VStack>
                          </HStack>
                          <Text>{message.content}</Text>
                          <Box w="full" textAlign="right">
                            <Text color={"#A2A4A9"} fontSize={"sm"}>
                              {format(
                                new Date(message.date),
                                "MMMM dd, yyyy HH:mm"
                              )}
                            </Text>
                          </Box>
                        </VStack>
                      </Box>
                      {message.author.id === ticket.currentUserId && (
                        <img src={chatCornerMessageSent} width="23rem" />
                      )}
                    </HStack>
                  </Box>
                </Box>
              ))}
          </VStack>

          <HStack
            borderBottomRadius={20}
            boxShadow="2xl"
            w={"full"}
            borderLeft={0}
            borderRight={0}
            borderTopColor="gray.300"
            borderBottomColor="gray.300"
            p={3}
            alignItems={"center"}
          >
            <Textarea
              boxShadow="2xl"
              boxShadow={"none !important"}
              borderLeft={0}
              borderRight={0}
              border={0}
              placeholder="Type a message..."
              id="message"
              name="message"
              value={formik.values.message}
              onChange={formik.handleChange}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  formik.submitForm();
                }
              }}
              rows={1}
              resize={"none"}
            />
            <IconButton
              icon={<AiOutlineSend />}
              type="submit"
              aria-label="Submit"
              bg="transparent"
              textColor="gray.600"
              _hover={{ bg: "gray.300" }}
            />
          </HStack>
        </VStack>
      </Box>
    </chakra.form>
  );
};

export default Chat;
