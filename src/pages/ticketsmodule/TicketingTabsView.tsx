import { Text, VStack, HStack, Flex, Button } from "@chakra-ui/react";
import { BiSupport } from "react-icons/bi";
import TabsSelector from "./TabsSelector";
import { useState } from "react";
import TabsContent from "./TabsContent";
import TicketsAddNewButton from "./detailed/TicketsAddNewButton";

const TicketingTabsView = () => {
  const [tabIndex, setTabIndex] = useState(
    +localStorage.getItem("tabIndexTicket")!
  );
  return (
    <VStack
      w={"full"}
      h={"full"}
      p={5}
      py={10}
      alignItems={"center"}
      spacing={8}
    >
      <Flex
        w={"full"}
        justifyContent={"space-evenly"}
        alignItems={{ base: "flex-start", md: "center" }}
        flexDir={{ base: "column", md: "row" }}
        gap={5}
      >
        <HStack alignItems={"center"} fontSize={"3xl"}>
          <BiSupport color={"orangered"} />
          <Text color={"#448F85"} fontWeight={"bold"}>
            TICKETING
          </Text>
        </HStack>
        <TabsSelector tabIndex={tabIndex} setTabIndex={setTabIndex} />
        <TicketsAddNewButton />
      </Flex>
      <TabsContent tabIndex={tabIndex} setTabIndex={setTabIndex} />
    </VStack>
  );
};

export default TicketingTabsView;
