import moment from "moment";
import { Employee } from "../../../../../api/types";
import { SimpleGrid, GridItem, HStack, Button } from "@chakra-ui/react";
import EmployeeDetailedViewCustomInput from "../../../../../components/EmployeeDetailedViewCustomInput";

interface Props {
  employee?: Employee;
}

const PersonalInfoDetailedView = ({ employee }: Props) => {
  return (
    <HStack
      align={"center"}
      justify={"center"}
      bgColor={"gray.200"}
      borderRadius={"10px"}
      boxShadow={"2xl"}
      padding={"2rem"}
      marginLeft={"10%"}
      marginRight={"10%"}
    >
      <SimpleGrid columns={{ base: 1, md: 2 }} spacing={4}>
        <EmployeeDetailedViewCustomInput
          resource={employee?.firstName}
          label={"File Number"}
        />
        <EmployeeDetailedViewCustomInput
          resource={employee?.lastName}
          label={"Last Name"}
        />
        <EmployeeDetailedViewCustomInput
          resource={employee?.email}
          label={"Email"}
        />
        <EmployeeDetailedViewCustomInput
          resource={moment(employee?.entryDate).format("yyyy-MM-DD")}
          label={"Date of Admission"}
        />
        <EmployeeDetailedViewCustomInput
          resource={employee?.active === true ? "Active" : "Inactive"}
          label={"Status"}
        />
        <EmployeeDetailedViewCustomInput
          resource={employee?.afipId}
          label={"Social/CUIL/Mexico/Spain/Brazil/Uru"}
        />
        <EmployeeDetailedViewCustomInput
          resource={employee?.gender === true ? "Male" : "Female"}
          label={"Gender"}
        />
        <EmployeeDetailedViewCustomInput
          resource={moment(employee?.birthDate).format("yyyy-MM-DD")}
          label={"Date of Birth"}
        />
        <GridItem colSpan={{ base: 1, md: 2 }}>
          <HStack
            w="full"
            justifyContent={"space-between"}
            spacing={5}
            marginTop={"1rem"}
          >
            <Button
              type="button"
              // onClick={}
              variant="outline"
              colorScheme={"orange"}
              minWidth={"8rem"}
            >
              Edit
            </Button>
          </HStack>
        </GridItem>
      </SimpleGrid>
    </HStack>
  );
};

export default PersonalInfoDetailedView;
