import { Tabs, TabPanels, TabPanel } from "@chakra-ui/react";
import PersonalInfoDetailedView from "./detailedTabsViews/PersonalInfoDetailedView";
import LocationInfoDetailedView from "./detailedTabsViews/LocationInfoDetailedView";
import FamilyInfoDetailedView from "./detailedTabsViews/FamilyInfoDetailedView";
import EmploymentInfoDetailedView from "./detailedTabsViews/EmploymentInfoDetailedView";
import { Employee } from "../../../../api/types";

interface Props {
  tabIndex: number;
  setTabIndex: (tabIndex: number) => void;
  employee?: Employee;
}

const TabsContent = ({ tabIndex, setTabIndex, employee }: Props) => {
  return (
    <Tabs
      index={tabIndex}
      onChange={setTabIndex}
      w={{ base: "full", md: "100%" }}
    >
      <TabPanels p={1} w={"full"}>
        <TabPanel>
          <PersonalInfoDetailedView employee={employee} tabIndex={tabIndex}/>
        </TabPanel>
        <TabPanel>
          <LocationInfoDetailedView employee={employee} tabIndex={tabIndex} />{" "}
        </TabPanel>
        <TabPanel>
          <FamilyInfoDetailedView employee={employee} tabIndex={tabIndex} />{" "}
        </TabPanel>
        <TabPanel>
          <EmploymentInfoDetailedView employee={employee} tabIndex={tabIndex} />
        </TabPanel>
      </TabPanels>
    </Tabs>
  );
};
export default TabsContent;
