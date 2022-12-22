import { VStack, Flex } from "@chakra-ui/react";
import { useState } from "react";
import TabsSelector from "./TabsSelector";
import TabsContent from "./TabsContent";

interface Props {
    onClose: () => void;
}

const CreateEmployeeTabsView = ({ onClose }: Props) => {
  const [tabIndex, setTabIndex] = useState(
    +localStorage.getItem("tabIndexHR")!
  );
  return (
    <VStack
      w={"full"}
      h={"full"}
      p={5}
      py={10}
      alignItems={"center"}
      spacing={8}
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
      <TabsContent tabIndex={tabIndex} setTabIndex={setTabIndex} onClose={onClose} />
    </VStack>
  );
};

export default CreateEmployeeTabsView;
