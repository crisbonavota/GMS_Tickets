import { VStack, Flex } from "@chakra-ui/react";
import { useState } from "react";
import TabsSelector from "./TabSelector";
import TabsContent from "./TabsContent";
import { Employee } from "../../../../api/types";

interface Props {
  employee: Employee;
}

const EmployeeDetailsTabsView = ({ employee }: Props) => {
  const [tabIndex, setTabIndex] = useState(0);
  return (
    <VStack
      w={"full"}
      h={"full"}
      p={1}
      py={1}
      alignItems={"center"}
      spacing={6}
    >
      <Flex
        w={"full"}
        justifyContent={"space-evenly"}
        alignItems={{ base: "flex-start", md: "center" }}
        flexDir={{ base: "column", md: "row" }}
        gap={5}
      >
        <TabsSelector tabIndex={tabIndex} setTabIndex={setTabIndex} />
      </Flex>
      <TabsContent
        tabIndex={tabIndex}
        setTabIndex={setTabIndex}
        employee={employee}
      />
    </VStack>
  );
};

export default EmployeeDetailsTabsView;
