import {
    SimpleGrid,
    HStack,
    Text,
    Box,
  } from "@chakra-ui/react";
  import { Employee } from "../../../api/types";
import EditEmployeeButton from "../creation-edition/EditEmployeeButton";

type Props = {
    resource: Employee;
    tabIndex: number;
    setTabIndex: (tabIndex: number) => void;
}

const EmployeeDetailedViewHeaderComponent = ({ resource, tabIndex, setTabIndex }: Props) => {
  return (
    <HStack
    align={"center"}
    justify={"center"}
    bgColor={"#4F968C"}
    borderTopLeftRadius={"19px"}
    borderTopRightRadius={"19px"}
    boxShadow={"2xl"}
    padding={"2rem"}
    marginLeft={"10%"}
    marginRight={"10%"}
  >
    <SimpleGrid columns={8} spacing={6}>
      <Box>
      </Box>
      <Box>
        <Text
          fontWeight={"400"}
          fontSize={"17px"}
          color={"#FFFFFF"}
        >
          File Number
        </Text>
        <Text
          fontWeight={"700"}
          fontSize={"20px"}
          color={"#FFFFFF"}
        >
          {resource?.fileNumber}
        </Text>
      </Box>
      <Box>
        <Text
          fontWeight={"400"}
          fontSize={"17px"}
          color={"#FFFFFF"}
        >
          First Name
        </Text>
        <Text fontWeight={"700"} fontSize={"20px"} color={"#FFFFFF"}>
          {resource?.firstName}
        </Text>
      </Box>
      <Box>
      <Text
          fontWeight={"400"}
          fontSize={"17px"}
          color={"#FFFFFF"}
        >
          Last Name
        </Text>
        <Text fontWeight={"700"} fontSize={"20px"} color={"#FFFFFF"}>
          {resource?.lastName}
        </Text>
      </Box>
      <Box>
      <Text
          fontWeight={"400"}
          fontSize={"17px"}
          color={"#FFFFFF"}
        >
          Status
        </Text>
        <Text fontWeight={"700"} fontSize={"20px"} color={"#FFFFFF"}>
          {resource?.active === true ? "Active" : "Inactive"}
        </Text>
      </Box>
      <Box>
      <Text
          fontWeight={"400"}
          fontSize={"17px"}
          color={"#FFFFFF"}
        >
          Team
        </Text>
        <Text fontWeight={"700"} fontSize={"20px"} color={"#FFFFFF"}>
          {resource?.legacyUser.businessUnit.name.split("(")[0]}
        </Text>
      </Box>
      <Box>
      <Text
          fontWeight={"400"}
          fontSize={"17px"}
          color={"#FFFFFF"}
        >
          Location
        </Text>
        <Text fontWeight={"700"} fontSize={"20px"} color={"#FFFFFF"}>
          {resource?.country.name}
        </Text>
      </Box>
      <EditEmployeeButton employee={resource} tabIndex={tabIndex} setTabIndex={setTabIndex}/>
    </SimpleGrid>
  </HStack>
  )
}

export default EmployeeDetailedViewHeaderComponent;