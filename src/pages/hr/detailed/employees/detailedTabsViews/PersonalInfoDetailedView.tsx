import moment from "moment";
import { SimpleGrid, HStack } from "@chakra-ui/react";
import UserDetailedViewBodyComponent from "../../UserDetailedViewBodyComponent";

interface Props {
  firstName: string;
  lastName: string;
  email: string;
  entryDate: string;
  status: boolean;
  afipId: string;
  gender: boolean;
  birthDate: string;
}

const PersonalInfoDetailedView = ({
  firstName,
  lastName,
  email,
  entryDate,
  status,
  afipId,
  gender,
  birthDate,
}: Props) => {
  return (
    <HStack
      align={"center"}
      justify={"center"}
      bgColor={"#FFFFFF"}
      borderBottomLeftRadius={"1.18rem"}
      borderBottomRightRadius={"1.18rem"}
      boxShadow={"2xl"}
      padding={"2rem"}
    >
      <SimpleGrid columns={{ base: 1, md: 2 }} spacing={5} width={"80%"}>
        <UserDetailedViewBodyComponent
          resource={firstName}
          label={"First Name"}
        />
        <UserDetailedViewBodyComponent
          resource={lastName}
          label={"Last Name"}
        />
        <UserDetailedViewBodyComponent resource={email} label={"Email"} />
        <UserDetailedViewBodyComponent
          resource={moment(entryDate).format("yyyy-MM-DD")}
          label={"Date of Admission"}
        />
        <UserDetailedViewBodyComponent
          resource={status === true ? "Active" : "Inactive"}
          label={"Status"}
        />
        <UserDetailedViewBodyComponent
          resource={afipId}
          label={"Social/CUIL/Mexico/Spain/Brazil/Uru"}
        />
        <UserDetailedViewBodyComponent
          resource={gender === true ? "Male" : "Female"}
          label={"Gender"}
        />
        <UserDetailedViewBodyComponent
          resource={moment(birthDate).format("yyyy-MM-DD")}
          label={"Date of Birth"}
        />
      </SimpleGrid>
    </HStack>
  );
};

export default PersonalInfoDetailedView;
