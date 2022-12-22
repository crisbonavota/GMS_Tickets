import { Tabs, TabPanels, TabPanel } from "@chakra-ui/react";
import CreateEditEmployeeForm from "./CreateEditEmployeeForm";

interface Props {
  tabIndex: number;
  setTabIndex: (tabIndex: number) => void;
  onClose: () => void;
}

const TabsContent = ({ tabIndex, setTabIndex, onClose }: Props) => {
  localStorage.setItem("tabIndexHR", JSON.stringify(tabIndex));
  return (
    <Tabs
      index={tabIndex}
      onChange={setTabIndex}
      w={{ base: "full", md: "100%" }}
    >
      <TabPanels
        // bgColor={'gray.200'}
        // rounded={10}
        // borderWidth={1}
        // borderColor={'lightgray'}
        // borderStyle={'solid'}
        p={1}
        w={"full"}
      >
        <TabPanel w={"full"}>
          <CreateEditEmployeeForm onClose={onClose} />
        </TabPanel>
        <TabPanel>
          <CreateEditEmployeeForm onClose={onClose} />{" "}
        </TabPanel>
        <TabPanel>
          <CreateEditEmployeeForm onClose={onClose} />{" "}
        </TabPanel>
        <TabPanel>
          <CreateEditEmployeeForm onClose={onClose} />
        </TabPanel>
      </TabPanels>
    </Tabs>
  );
};
export default TabsContent;
