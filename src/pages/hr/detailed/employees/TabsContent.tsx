import { Tabs, TabPanels, TabPanel } from "@chakra-ui/react";
import PersonalInfoDetailedView from "./detailedTabsViews/PersonalInfoDetailedView";
import LocationInfoDetailedView from "./detailedTabsViews/LocationInfoDetailedView";
import FamilyInfoDetailedView from "./detailedTabsViews/FamilyInfoDetailedView";
import EmploymentInfoDetailedView from "./detailedTabsViews/EmploymentInfoDetailedView";
import { Employee } from "../../../../api/types";
import UserDetailedViewHeaderComponent from "../UserDetailedViewHeaderComponent";

interface Props {
  tabIndex: number;
  setTabIndex: (tabIndex: number) => void;
  employee: Employee;
}

const TabsContent = ({ tabIndex, setTabIndex, employee }: Props) => {
  return (
    <Tabs
      index={tabIndex}
      onChange={setTabIndex}
      w={{ base: "full", md: "100%" }}
    >
      <UserDetailedViewHeaderComponent resource={employee} tabIndex={tabIndex} setTabIndex={setTabIndex} />
      <TabPanels w={"full"}>
        <TabPanel p={"0 !important"}>
          <PersonalInfoDetailedView employee={employee}/>
        </TabPanel>
        <TabPanel p={"0 !important"}>
          <LocationInfoDetailedView employee={employee}/>{" "}
        </TabPanel>
        <TabPanel p={"0 !important"}>
          <FamilyInfoDetailedView employee={employee}/>{" "}
        </TabPanel>
        <TabPanel p={"0 !important"}>
          <EmploymentInfoDetailedView employee={employee}/>
        </TabPanel>
      </TabPanels>
    </Tabs>
  );
};
export default TabsContent;
