import InfoBox, { InfoTitle } from "../InfoBox";
import { HStack, VStack } from "@chakra-ui/react";
import EditButton from "../EditButton";
import { Account } from "../../../../api/types";

interface Props {
    account: Account;
}

const Info = ({ account }: Props) => {
    return (
        <InfoBox w={"full"}>
            <VStack spacing={10} w={{ base: "full", md: "fit-content" }}>
                <HStack
                    w={"full"}
                    justifyContent={"space-between"}
                    alignItems={"center"}
                    spacing={20}
                >
                    <InfoTitle
                        title={"Country"}
                        content={account.country.name}
                    />
                    <InfoTitle
                        title={"Responsible"}
                        content={account.responsibleLegacyUser?.fullName || ""}
                    />
                </HStack>
                <VStack spacing={5} alignItems={"flex-start"} w={"full"}>
                    <InfoTitle title="Notes" content={account.notes} />
                    <EditButton />
                </VStack>
            </VStack>
        </InfoBox>
    );
};

export default Info;
