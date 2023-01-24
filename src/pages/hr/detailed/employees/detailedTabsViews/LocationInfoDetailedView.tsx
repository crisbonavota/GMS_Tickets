import { SimpleGrid, HStack } from "@chakra-ui/react";
import UserDetailedViewBodyComponent from "../../UserDetailedViewBodyComponent";

interface Props {
  birthCountry: string;
  country: string;
  address: string;
  city: string;
}

const LocationInfoDetailedView = ({
  birthCountry,
  country,
  address,
  city,
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
          resource={birthCountry}
          label={"Nationality"}
        />
        <UserDetailedViewBodyComponent
          resource={country}
          label={"Country of Residence"}
        />
        <UserDetailedViewBodyComponent resource={address} label={"Address"} />
        <UserDetailedViewBodyComponent resource={city} label={"City"} />
      </SimpleGrid>
    </HStack>
  );
};

export default LocationInfoDetailedView;
