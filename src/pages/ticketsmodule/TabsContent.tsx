import { Tabs, TabPanels, TabPanel, Text } from "@chakra-ui/react";
import Tickets from "./Tickets";

interface Props {
  tabIndex: number;
  setTabIndex: (tabIndex: number) => void;
}

const TabsContent = ({ tabIndex, setTabIndex }: Props) => {
  localStorage.setItem("tabIndexTicket", JSON.stringify(tabIndex));
  return (
    <Tabs
      index={tabIndex}
      onChange={setTabIndex}
      w={{ base: "full", md: "80%" }}
    >
      <TabPanels
        bgColor={"gray.200"}
        rounded={10}
        borderWidth={1}
        borderColor={"lightgray"}
        borderStyle={"solid"}
        p={5}
        w={"full"}
      >
        <TabPanel w={"full"}>
          <Tickets resource="ticket/requested" />
        </TabPanel>
        <TabPanel>
          <Tickets resource="ticket/assigned" />
        </TabPanel>
        <TabPanel>
          <Tickets resource="ticket/followed" />
        </TabPanel>
      </TabPanels>
    </Tabs>
  );
};
export default TabsContent;
