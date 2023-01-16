import { Tabs, TabPanels, TabPanel } from "@chakra-ui/react";
import { Employee } from "../../../../api/types";
import CrtEditEmployeeFormEmploymentInfo from "./CrtEditEmployeeFormEmploymentInfo";
import CrtEditEmployeeFormFamilyInfo from "./CrtEditEmployeeFormFamilyInfo";
import CrtEditEmployeeFormLocationInfo from "./CrtEditEmployeeFormLocationInfo";
import CrtEditEmployeeFormPersonalInfo from "./CrtEditEmployeeFormPersonalInfo";

interface Props {
  tabIndex: number;
  setTabIndex: (tabIndex: number) => void;
  onClose: () => void;
  editInitialValues?: Employee;
  id?: number;
  tabIdx?: number;
}

const TabsContent = ({ tabIndex, setTabIndex, onClose, editInitialValues, id, tabIdx }: Props) => {
  return (
    <Tabs
      index={tabIdx ? tabIdx : tabIndex}
      onChange={setTabIndex}
      w={{ base: "full", md: "100%" }}
    >
      <TabPanels
        p={1}
        w={"full"}
      >
        <TabPanel w={"full"}>
          <CrtEditEmployeeFormPersonalInfo onClose={onClose} tabIndex={tabIdx ? tabIdx : tabIndex} setTabIndex={setTabIndex} editInitialValues={editInitialValues} id={id} />
        </TabPanel>
        <TabPanel>
          <CrtEditEmployeeFormLocationInfo onClose={onClose} tabIndex={tabIdx ? tabIdx : tabIndex} setTabIndex={setTabIndex} editInitialValues={editInitialValues} id={id}/>{" "}
        </TabPanel>
        <TabPanel>
          <CrtEditEmployeeFormFamilyInfo onClose={onClose} tabIndex={tabIdx ? tabIdx : tabIndex} setTabIndex={setTabIndex} editInitialValues={editInitialValues} id={id}/>{" "}
        </TabPanel>
        <TabPanel>
          <CrtEditEmployeeFormEmploymentInfo onClose={onClose} tabIndex={tabIdx ? tabIdx : tabIndex} setTabIndex={setTabIndex} editInitialValues={editInitialValues} id={id}/>
        </TabPanel>
      </TabPanels>
    </Tabs>
  );
};
export default TabsContent;
