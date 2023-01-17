import moment from "moment";
import { Employee } from "../../../../../api/types";
import { SimpleGrid, GridItem, HStack } from "@chakra-ui/react";
import UserDetailedViewBodyComponent from "../../UserDetailedViewBodyComponent";

interface Props {
  employee: Employee;
}

const PersonalInfoDetailedView = ({ employee}: Props) => {
  return (
    <>
      <HStack
        align={"center"}
        justify={"center"}
        bgColor={"#FFFFFF"}
        borderBottomLeftRadius={"19px"}
        borderBottomRightRadius={"19px"}
        boxShadow={"2xl"}
        padding={"2rem"}
        marginLeft={"10%"}
        marginRight={"10%"}
      >
        <SimpleGrid columns={{ base: 1, md: 2 }} spacing={5} width={"80%"}>
          <UserDetailedViewBodyComponent
            resource={employee?.firstName}
            label={"File Number"}
          />
          <UserDetailedViewBodyComponent
            resource={employee?.lastName}
            label={"Last Name"}
          />
          <UserDetailedViewBodyComponent
            resource={employee?.email}
            label={"Email"}
          />
          <UserDetailedViewBodyComponent
            resource={moment(employee?.entryDate).format("yyyy-MM-DD")}
            label={"Date of Admission"}
          />
          <UserDetailedViewBodyComponent
            resource={employee?.active === true ? "Active" : "Inactive"}
            label={"Status"}
          />
          <UserDetailedViewBodyComponent
            resource={employee?.afipId}
            label={"Social/CUIL/Mexico/Spain/Brazil/Uru"}
          />
          <UserDetailedViewBodyComponent
            resource={employee?.gender === true ? "Male" : "Female"}
            label={"Gender"}
          />
          <UserDetailedViewBodyComponent
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
            </HStack>
          </GridItem>
        </SimpleGrid>
      </HStack>
    </>
  );
};

export default PersonalInfoDetailedView;
