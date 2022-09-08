import InfoBox, { InfoTitle } from "../InfoBox";
import { HStack, VStack } from "@chakra-ui/react";
import { Account } from "../../../../api/types";

interface Props {
    account: Account;
}

const Info = ({ account }: Props) => {
    return (
        <InfoBox w={{ base: "full", md: "50%" }}>
            <VStack
                spacing={10}
                w={{ base: "full", md: "fit-content" }}
                alignItems="flex-start"
            >
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
                <InfoTitle title="Notes" content={account.notes} />
            </VStack>
        </InfoBox>
    );
};

export default Info;
