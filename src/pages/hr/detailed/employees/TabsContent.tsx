import { Tabs, TabPanels, TabPanel } from "@chakra-ui/react";
import PersonalInfoDetailedView from "./detailedTabsViews/PersonalInfoDetailedView";
import LocationInfoDetailedView from "./detailedTabsViews/LocationInfoDetailedView";
import FamilyInfoDetailedView from "./detailedTabsViews/FamilyInfoDetailedView";
import EmploymentInfoDetailedView from "./detailedTabsViews/EmploymentInfoDetailedView";
import { Employee } from "../../../../api/types";
import UserDetailedViewHeaderComponent from "../UserDetailedViewHeaderComponent";
import moment from "moment";

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
            <UserDetailedViewHeaderComponent
                resource={employee}
                tabIndex={tabIndex}
                setTabIndex={setTabIndex}
            />
            <TabPanels w={"full"}>
                <TabPanel p={"0 !important"}>
                    <PersonalInfoDetailedView
                        fileNumber={employee.fileNumber.toString()}
                        firstName={employee.firstName}
                        lastName={employee.lastName}
                        email={employee.email}
                        entryDate={moment.utc(employee.entryDate).format("yyyy-MM-DD")}
                        status={employee.active}
                        afipId={employee.afipId}
                        birthDate={moment.utc(employee.birthDate).format("yyyy-MM-DD")}
                        gender={employee.gender}
                        mobilePhone={employee.mobilePhone}
                    />
                </TabPanel>
                <TabPanel p={"0 !important"}>
                    <LocationInfoDetailedView
                        birthCountry={employee.birthCountry?.name}
                        country={employee.country?.name}
                        addressLine1={employee.address?.street}
                        addressLine2={employee.address?.altura}
                        addressLine3={employee.address?.floor}
                        addressLine4={employee.address?.number}
                        city={employee.city}
                        postalCode={employee.postalCode}
                    />
                </TabPanel>
                <TabPanel p={"0 !important"}>
                    <FamilyInfoDetailedView
                        maritalStatus={employee.maritalStatus}
                        children={employee.children}
                    />
                </TabPanel>
                <TabPanel p={"0 !important"}>
                    <EmploymentInfoDetailedView
                        salaryCurrency={employee.salaryCurrency?.code}
                        medicalCoverage={employee.medicalCoverage?.name}
                        businessUnit={employee.legacyUser.businessUnit.name}
                        position={employee.position?.name}
                        salaryAmount={employee.salaryAmount?.toString()}
                        workTime={employee.workTime}
                        employer={employee.employer}
                    />
                </TabPanel>
            </TabPanels>
        </Tabs>
    );
};
export default TabsContent;
