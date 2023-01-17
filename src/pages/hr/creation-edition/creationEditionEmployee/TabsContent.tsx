import { Tabs, TabPanels, TabPanel } from "@chakra-ui/react";
import { Employee } from "../../../../api/types";
import CrtEditEmployeeFormEmploymentInfo from "./crtEditEmployeeFormEmploymentInfo";
import CrtEditEmployeeFormFamilyInfo from "./CrtEditEmployeeFormFamilyInfo";
import CrtEditEmployeeFormLocationInfo from "./crtEditEmployeeFormLocationInfo";
import CrtEditEmployeeFormPersonalInfo from "./crtEditEmployeeFormPersonalInfo";

interface Props {
  tabIndex: number;
  setTabIndex: (tabIndex: number) => void;
  onClose: () => void;
  editInitialValues?: Employee;
  id?: number;
}

const TabsContent = ({ tabIndex, setTabIndex, onClose, editInitialValues, id}: Props) => {
  return (
    <Tabs
      index={tabIndex}
      onChange={setTabIndex}
      w={{ base: "full", md: "100%" }}
    >
      <TabPanels
        p={1}
        w={"full"}
      >
        <TabPanel w={"full"}>
          <CrtEditEmployeeFormPersonalInfo onClose={onClose} tabIndex={tabIndex} setTabIndex={setTabIndex} editInitialValues={editInitialValues} id={id} />
        </TabPanel>
        <TabPanel>
          <CrtEditEmployeeFormLocationInfo onClose={onClose} tabIndex={tabIndex} setTabIndex={setTabIndex} editInitialValues={editInitialValues} id={id}/>{" "}
        </TabPanel>
        <TabPanel>
          <CrtEditEmployeeFormFamilyInfo onClose={onClose} tabIndex={tabIndex} setTabIndex={setTabIndex} editInitialValues={editInitialValues} id={id}/>{" "}
        </TabPanel>
        <TabPanel>
          <CrtEditEmployeeFormEmploymentInfo onClose={onClose} tabIndex={tabIndex} setTabIndex={setTabIndex} editInitialValues={editInitialValues} id={id}/>
        </TabPanel>
      </TabPanels>
    </Tabs>
  );
};
export default TabsContent;
