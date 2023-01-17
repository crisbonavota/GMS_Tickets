import { VStack, Flex } from "@chakra-ui/react";
import { useState } from "react";
import TabsSelector from "./TabsSelector";
import TabsContent from "./TabsContent";
import { Employee } from "../../../../api/types";

interface Props {
    onClose: () => void;
    editInitialValues?: Employee;
    id?:number;
    tabIndex: number;
    setTabIndex: (tabIndex: number) => void;
}

const CreateEmployeeTabsView = ({ onClose, editInitialValues, id, tabIndex, setTabIndex }: Props) => {
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
        <TabsSelector tabIndex={tabIndex} setTabIndex={setTabIndex}/>
      </Flex>
      <TabsContent tabIndex={tabIndex} setTabIndex={setTabIndex} onClose={onClose} editInitialValues={editInitialValues} id={id}/>
    </VStack>
  );
};

export default CreateEmployeeTabsView;
