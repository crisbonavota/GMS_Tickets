import moment from "moment";
import { Employee } from "../../../../../api/types";
import { SimpleGrid, GridItem, HStack } from "@chakra-ui/react";
import UserDetailedViewBodyComponent from "../../UserDetailedViewBodyComponent";

interface Props {
  employee: Employee;
}

const PersonalInfoDetailedView = ({ employee }: Props) => {
  return (
    <>
      <HStack
        align={"center"}
        justify={"center"}
        bgColor={"#FFFFFF"}
        borderBottomLeftRadius={"1.18rem"}
        borderBottomRightRadius={"1.18rem"}
        boxShadow={"2xl"}
        padding={"2rem"}
        marginLeft={"12rem"}
        marginRight={"12rem"}
      >
        <SimpleGrid columns={{ base: 1, md: 2 }} spacing={5} width={"80%"}>
          <UserDetailedViewBodyComponent
            resource={employee?.firstName}
            label={"First Name"}
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
        </SimpleGrid>
      </HStack>
    </>
  );
};

export default PersonalInfoDetailedView;
