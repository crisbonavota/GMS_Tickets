import { useParams } from "react-router-dom";
import { VStack, Text, HStack, Box } from "@chakra-ui/react";
import { IoTicketSharp } from "react-icons/io5";
import ProviderInfo from "./TicketsInfo";
import ProviderHeader from "./TicketsHeader";
import { getResource } from "../../../api/api";
import { Provider, TicketView } from "../../../api/types";
import clienteAxios from "../../../services/Axios";
import TicketsHeader from "./TicketsHeader";
import TicketsInfo from "./TicketsInfo";
import { useNavigate } from "react-router-dom";
import { useToast } from "@chakra-ui/react";
import { useState } from "react";
import { useQuery } from "react-query";
import { useAuthHeader } from "react-auth-kit";
import Chat from "../Chat";
import { HiChatAlt2 } from "react-icons/hi";

const TicketsDetailedView = () => {
  const [prueba, setPrueba] = useState("");
  const getAuthHeader = useAuthHeader();
  //const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const toast = useToast();
  const { id } = useParams();

  const { data: ticket, isSuccess } = useQuery(
    ["ticket", id],
    () =>
      clienteAxios.get<TicketView>(`/ticket/${id}`, {
        headers: { Authorization: getAuthHeader() },
      }),
    {
      select: (r) => r.data,
      refetchOnWindowFocus: false,
      //log in console the data fetched
    }
  );

  return (
    <VStack w={"full"} spacing={10}>
      <Box alignItems={"flex-start"} w={"full"}>
        <HStack
          alignItems={"center"}
          fontSize={"3xl"}
          p={1}
          marginLeft={"10%"}
          marginTop={"2rem"}
        >
          <IoTicketSharp color={"#3B8A7F"} />
          <Text color={"#448F85"} fontWeight={"bold"}>
            TICKET DETAILS
          </Text>
        </HStack>
      </Box>

      <Box alignItems={"center"} w={"80%"}>
        {isSuccess && <TicketsHeader ticket={ticket} />}
        {isSuccess && <TicketsInfo ticket={ticket} />}
      </Box>

      <Box alignItems={"flex-start"} w={"full"}>
        <HStack
          alignItems={"center"}
          fontSize={"3xl"}
          p={1}
          marginLeft={"10%"}
          marginTop={"2rem"}
        >
          <HiChatAlt2 color={"#3B8A7F"} />
          <Text color={"#448F85"} fontWeight={"bold"}>
            TICKET CHAT
          </Text>
        </HStack>
      </Box>

      <Box w={"80%"}>{isSuccess && <Chat ticket={ticket} />}</Box>

      {/* cajita para que me haga espacio al finaL */}
      <Box h={"10vh"}></Box>
    </VStack>
  );
};

export default TicketsDetailedView;
