import { HStack, Box, Avatar, Heading } from "@chakra-ui/react";
import { useQuery } from "react-query";
import { useAuthHeader } from "react-auth-kit";
import ProviderDetailedEditButton from "./TicketsDetailedEditButton";
import { Provider, TicketView } from "../../../api/types";
import { getResource } from "../../../api/api";
import { InfoTitle } from "../../pm/detailed/InfoBox";
import TicketsDetailedEditButton from "./TicketsDetailedEditButton";

type Props = {
  ticket: TicketView;
};

const TicketsHeader = ({ ticket }: Props) => {
  return (
    <Box>
      <HStack
        justifyContent={"space-evenly"}
        bgColor={"#4F968C"}
        borderTopLeftRadius={"1.18rem"}
        borderTopRightRadius={"1.18rem"}
        boxShadow={"2xl"}
        padding={"1.5rem"}
        width={"full"}
      >
        <Box width="60%">
          <Heading color={"white"} fontFamily={""} fontWeight={"light"}>
            {ticket.subject}
          </Heading>
        </Box>

        <TicketsDetailedEditButton />
      </HStack>
    </Box>
  );
};

export default TicketsHeader;
