import { SimpleGrid, HStack } from "@chakra-ui/react";
import UserDetailedViewBodyComponent from "../../UserDetailedViewBodyComponent";

interface Props {
    birthCountry: string;
    country: string;
    addressLine1: string;
    addressLine2: string;
    addressLine3: string;
    addressLine4: string;
    city: string;
    postalCode: string;
}

const LocationInfoDetailedView = ({
    birthCountry,
    country,
    addressLine1,
    addressLine2,
    addressLine3,
    addressLine4,
    city,
    postalCode,
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
                <UserDetailedViewBodyComponent
                    resource={addressLine1}
                    label={"Address Line 1 / Street"}
                />
                <UserDetailedViewBodyComponent
                    resource={addressLine2}
                    label={"Address Line 2 / Number"}
                />
                <UserDetailedViewBodyComponent
                    resource={addressLine3}
                    label={"Address Line 3 / Floor"}
                />
                <UserDetailedViewBodyComponent
                    resource={addressLine4}
                    label={"Address Line 4 / Department"}
                />
                <UserDetailedViewBodyComponent resource={city} label={"City"} />
                <UserDetailedViewBodyComponent
                    resource={postalCode}
                    label={"Zip Code"}
                />
            </SimpleGrid>
        </HStack>
    );
};

export default LocationInfoDetailedView;
