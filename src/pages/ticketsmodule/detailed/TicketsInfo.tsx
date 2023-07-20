import { SimpleGrid, HStack } from "@chakra-ui/react";
import { Priorities, Status, TicketView, Tipo } from "../../../api/types";
import UserDetailedViewBodyComponent from "../../hr/detailed/UserDetailedViewBodyComponent";
import { mapEnumToName } from "../../../api/utils";
import EmployeeDetailedViewBodyComponentPerson from "./UserDetailedBodyComponentPerson";

interface Props {
  ticket: TicketView;
}

const TicketsInfo = ({ ticket }: Props) => {
  return (
    <HStack
      align={"center"}
      justify={"center"}
      bgColor={"#FFFFFF"}
      borderBottomLeftRadius={"1.18rem"}
      borderBottomRightRadius={"1.18rem"}
      boxShadow={"2xl"}
      padding={"2rem"}
      alignItems={"center"}
      marginTop={"0 !important"}
    >
      <SimpleGrid columns={{ base: 1, md: 2 }} spacing={5} width={"80%"}>
        <EmployeeDetailedViewBodyComponentPerson
          resource={ticket.requester.name}
          label={"Requester"}
        />
        <UserDetailedViewBodyComponent
          resource={mapEnumToName(ticket.priority, Priorities)}
          label={"Priority"}
        />
        <UserDetailedViewBodyComponent
          resource={mapEnumToName(ticket.tipo, Tipo)}
          label={"Type"}
        />

        <UserDetailedViewBodyComponent
          resource={mapEnumToName(ticket.status, Status)}
          label={"Status"}
        />
        <EmployeeDetailedViewBodyComponentPerson
          resource={ticket.assignees.map((assignee) => assignee.name)}
          label={"Assignees"}
        />
        <EmployeeDetailedViewBodyComponentPerson
          resource={ticket.followers.map((followers) => followers.name)}
          label={"Followers"}
        />
      </SimpleGrid>
    </HStack>
  );
};

export default TicketsInfo;
