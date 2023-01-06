import { Tabs, TabPanels, TabPanel } from "@chakra-ui/react";
import CreateEditEmployeeFormFirst from "./CreateEditEmployeeFormFirst";
import CreateEditEmployeeFormSecond from "./CreateEditEmployeeFormSecond";
import CreateEditEmployeeFormThird from "./CreateEditEmployeeFormThird";
import CreateEditEmployeeFormFourth from "./CreateEditEmployeeFormFourth";
import { Employee } from "../../../../api/types";

interface Props {
  tabIndex: number;
  setTabIndex: (tabIndex: number) => void;
  onClose: () => void;
  editInitialValues?: Employee;
  id?: number;
}

const TabsContent = ({ tabIndex, setTabIndex, onClose, editInitialValues, id }: Props) => {
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
          <CreateEditEmployeeFormFirst onClose={onClose} tabIndex={tabIndex} setTabIndex={setTabIndex} editInitialValues={editInitialValues} id={id} />
        </TabPanel>
        <TabPanel>
          <CreateEditEmployeeFormSecond onClose={onClose} tabIndex={tabIndex} setTabIndex={setTabIndex} editInitialValues={editInitialValues} id={id}/>{" "}
        </TabPanel>
        <TabPanel>
          <CreateEditEmployeeFormThird onClose={onClose} tabIndex={tabIndex} setTabIndex={setTabIndex} editInitialValues={editInitialValues} id={id}/>{" "}
        </TabPanel>
        <TabPanel>
          <CreateEditEmployeeFormFourth onClose={onClose} tabIndex={tabIndex} setTabIndex={setTabIndex} editInitialValues={editInitialValues} id={id}/>
        </TabPanel>
      </TabPanels>
    </Tabs>
  );
};
export default TabsContent;
