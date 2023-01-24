import { Tabs, TabPanels, TabPanel } from "@chakra-ui/react";
import { Employee } from "../../../../api/types";
import CreateEditEmployeeFormEmploymentInfo from "./CreateEditEmployeeFormEmploymentInfo";
import CreateEditEmployeeFormFamilyInfo from "./CreateEditEmployeeFormFamilyInfo";
import CreateEditEmployeeFormLocationInfo from "./CreateEditEmployeeFormLocationInfo";
import CreateEditEmployeeFormPersonalInfo from "./CreateEditEmployeeFormPersonalInfo";

interface Props {
  tabIndex: number;
  setTabIndex: (tabIndex: number) => void;
  onClose: () => void;
  editInitialValues?: Employee;
  id?: number;
}

const TabsContent = ({
  tabIndex,
  setTabIndex,
  onClose,
  editInitialValues,
  id,
}: Props) => {
  return (
    <Tabs
      index={tabIndex}
      onChange={setTabIndex}
      w={{ base: "full", md: "100%" }}
    >
      <TabPanels p={1} w={"full"}>
        <TabPanel w={"full"}>
          <CreateEditEmployeeFormPersonalInfo
            onClose={onClose}
            tabIndex={tabIndex}
            setTabIndex={setTabIndex}
            editInitialValues={editInitialValues}
          />
        </TabPanel>
        <TabPanel>
          <CreateEditEmployeeFormLocationInfo
            onClose={onClose}
            tabIndex={tabIndex}
            setTabIndex={setTabIndex}
            editInitialValues={editInitialValues}
          />{" "}
        </TabPanel>
        <TabPanel>
          <CreateEditEmployeeFormFamilyInfo
            onClose={onClose}
            tabIndex={tabIndex}
            setTabIndex={setTabIndex}
            editInitialValues={editInitialValues}
          />{" "}
        </TabPanel>
        <TabPanel>
          <CreateEditEmployeeFormEmploymentInfo
            onClose={onClose}
            tabIndex={tabIndex}
            setTabIndex={setTabIndex}
            editInitialValues={editInitialValues}
            id={id}
          />
        </TabPanel>
      </TabPanels>
    </Tabs>
  );
};
export default TabsContent;
