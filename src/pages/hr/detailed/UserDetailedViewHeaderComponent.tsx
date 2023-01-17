import {
  SimpleGrid,
  HStack,
  Text,
  Box,
  VStack,
  Flex,
  Avatar,
} from "@chakra-ui/react";
import { Employee } from "../../../api/types";
import EditEmployeeButton from "../creation-edition/EditEmployeeButton";

type Props = {
  resource: Employee;
  tabIndex: number;
  setTabIndex: (tabIndex: number) => void;
};

const EmployeeDetailedViewHeaderComponent = ({
  resource,
  tabIndex,
  setTabIndex,
}: Props) => {
  return (
    <Box>
      <HStack
        justifyContent={"space-evenly"}
        alignItems={"center"}
        bgColor={"#4F968C"}
        borderTopLeftRadius={"1.18rem"}
        borderTopRightRadius={"1.18rem"}
        boxShadow={"2xl"}
        padding={"2rem"}
        marginLeft={"12rem"}
        marginRight={"12rem"}
      >
        <Box>
          <Avatar variant={"circle"} size={"xl"} src={resource.avatar} />
        </Box>
        <Box>
          <Text fontWeight={"400"} fontSize={"1rem"} color={"#FFFFFF"}>
            File Number
          </Text>
          <Text fontWeight={"600"} fontSize={"1.25rem"} color={"#FFFFFF"}>
            {resource?.fileNumber}
          </Text>
        </Box>
        <Box>
          <Text fontWeight={"400"} fontSize={"1rem"} color={"#FFFFFF"}>
            First Name
          </Text>
          <Text fontWeight={"700"} fontSize={"1.25rem"} color={"#FFFFFF"}>
            {resource?.firstName}
          </Text>
        </Box>
        <Box>
          <Text fontWeight={"400"} fontSize={"1rem"} color={"#FFFFFF"}>
            Last Name
          </Text>
          <Text fontWeight={"700"} fontSize={"1.25rem"} color={"#FFFFFF"}>
            {resource?.lastName}
          </Text>
        </Box>
        <Box>
          <Text fontWeight={"400"} fontSize={"1rem"} color={"#FFFFFF"}>
            Status
          </Text>
          <Text fontWeight={"700"} fontSize={"1.25rem"} color={"#FFFFFF"}>
            {resource?.active === true ? "Active" : "Inactive"}
          </Text>
        </Box>
        <Box>
          <Text fontWeight={"400"} fontSize={"1rem"} color={"#FFFFFF"}>
            Team
          </Text>
          <Text fontWeight={"700"} fontSize={"1.25rem"} color={"#FFFFFF"}>
            {resource?.legacyUser.businessUnit.name.split("(")[0]}
          </Text>
        </Box>
        <Box>
          <Text fontWeight={"400"} fontSize={"1rem"} color={"#FFFFFF"}>
            Location
          </Text>
          <Text fontWeight={"700"} fontSize={"1.25rem"} color={"#FFFFFF"}>
            {resource?.country.name}
          </Text>
        </Box>
        <EditEmployeeButton
          employee={resource}
          tabIndex={tabIndex}
          setTabIndex={setTabIndex}
        />
      </HStack>
    </Box>
  );
};

export default EmployeeDetailedViewHeaderComponent;
