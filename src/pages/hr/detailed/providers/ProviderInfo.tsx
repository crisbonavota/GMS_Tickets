import { SimpleGrid, HStack } from "@chakra-ui/react";
import { Provider } from "../../../../api/types";
import UserDetailedViewBodyComponent from "../UserDetailedViewBodyComponent";

interface Props {
    provider: Provider;
}

const ProviderInfo = ({ provider }: Props) => {
  return (
    <HStack
      align={"center"}
      justify={"center"}
      bgColor={"#FFFFFF"}
      borderBottomLeftRadius={"1.18rem"}
      borderBottomRightRadius={"1.18rem"}
      boxShadow={"2xl"}
      padding={"2rem"}
      alignItems={"center"}
      marginTop={"0 !important"}
    >
      <SimpleGrid columns={{ base: 1, md: 2 }} spacing={5} width={"80%"}>
        <UserDetailedViewBodyComponent
          resource={provider.firstName}
          label={"First Name"}
        />
        <UserDetailedViewBodyComponent
          resource={provider.lastName}
          label={"Last Name"}
        />
        <UserDetailedViewBodyComponent 
            resource={provider.email} 
            label={"Email"} 
        />
        <UserDetailedViewBodyComponent
          resource={provider.active === true ? "Active" : "Inactive"}
          label={"Status"}
        />
        <UserDetailedViewBodyComponent
          resource={provider.afipId}
          label={"Social/CUIL/Mexico/Spain/Brazil/Uru"}
        />
        <UserDetailedViewBodyComponent
          resource={provider.businessName}
          label={"Business name"}
        />
        <UserDetailedViewBodyComponent
          resource={provider.phone}
          label={"Phone"}
        />
        <UserDetailedViewBodyComponent
          resource={provider.address}
          label={"Address"}
        />
        <UserDetailedViewBodyComponent
          resource={provider.city}
          label={"City"}
        />
        <UserDetailedViewBodyComponent
          resource={provider.legacyUser?.businessUnit?.name}
          label={"Business Unit"}
        />         
      </SimpleGrid>
    </HStack>
  );
};

export default ProviderInfo;