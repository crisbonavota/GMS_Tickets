import { Tabs, TabPanels, TabPanel } from "@chakra-ui/react";
import CreateEditEmployeeFormFirst from "./CreateEditEmployeeFormFirst";
import CreateEditEmployeeFormSecond from "./CreateEditEmployeeFormSecond";
import CreateEditEmployeeFormThird from "./CreateEditEmployeeFormThird";
import CreateEditEmployeeFormFourth from "./CreateEditEmployeeFormFourth";
import { useState } from "react";

interface FomValues {
  firstName: "",
  lastName: "",
  afipId: "",
  entryDate: "",
  birthDate: "",
  gender: null,
  active: true,
  countryId: 0,
  birthCountryId: 0,
  address: null,
  city: "",
  childs: "",
  maritalStatus: "",
  salaryCurrencyId: 0,
  medicalCoverageId: 0,
}

interface Props {
  tabIndex: number;
  setTabIndex: (tabIndex: number) => void;
  onClose: () => void;
  setFormValues: FomValues;
  formValues: Form
}

const TabsContent = ({ tabIndex, setTabIndex, onClose, formValues }: Props) => {
  const [formValues, setFormValues] = useState<FomValues>();
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
          <CreateEditEmployeeFormFirst onClose={onClose} fValues={setFormValues}/>
        </TabPanel>
        <TabPanel>
          <CreateEditEmployeeFormSecond onClose={onClose} />{" "}
        </TabPanel>
        <TabPanel>
          <CreateEditEmployeeFormThird onClose={onClose} />{" "}
        </TabPanel>
        <TabPanel>
          <CreateEditEmployeeFormFourth onClose={onClose} />
        </TabPanel>
      </TabPanels>
    </Tabs>
  );
};
export default TabsContent;
