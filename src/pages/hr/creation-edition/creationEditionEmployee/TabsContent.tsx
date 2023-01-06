import { Tabs, TabPanels, TabPanel } from "@chakra-ui/react";
import CreateEditEmployeeFormFirst from "./CreateEditEmployeeFormFirst";
import CreateEditEmployeeFormSecond from "./CreateEditEmployeeFormSecond";
import CreateEditEmployeeFormThird from "./CreateEditEmployeeFormThird";
import CreateEditEmployeeFormFourth from "./CreateEditEmployeeFormFourth";

interface Props {
  tabIndex: number;
  setTabIndex: (tabIndex: number) => void;
  onClose: () => void;
}

const TabsContent = ({ tabIndex, setTabIndex, onClose }: Props) => {
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
          <CreateEditEmployeeFormFirst onClose={onClose} tabIndex={tabIndex} setTabIndex={setTabIndex}/>
        </TabPanel>
        <TabPanel>
          <CreateEditEmployeeFormSecond onClose={onClose} tabIndex={tabIndex} setTabIndex={setTabIndex}/>{" "}
        </TabPanel>
        <TabPanel>
          <CreateEditEmployeeFormThird onClose={onClose} tabIndex={tabIndex} setTabIndex={setTabIndex}/>{" "}
        </TabPanel>
        <TabPanel>
          <CreateEditEmployeeFormFourth onClose={onClose} tabIndex={tabIndex} setTabIndex={setTabIndex}/>
        </TabPanel>
      </TabPanels>
    </Tabs>
  );
};
export default TabsContent;
