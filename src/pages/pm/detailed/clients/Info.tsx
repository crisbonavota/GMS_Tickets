import InfoBox, { InfoTitle } from "../InfoBox";
import { VStack, HStack } from "@chakra-ui/react";
import { Company } from "../../../../api/types";

interface Props {
    client: Company;
}

const Info = ({ client }: Props) => {
    return (
        <InfoBox>
            <HStack minW="20rem">
                <VStack alignItems={"flex-start"} spacing={5}>
                    <InfoTitle title={"Fiscal ID"} content={client.fiscalId} />
                    <InfoTitle title={"CUIT/CUIL"} content={client.afipId} />
                    <InfoTitle
                        title={"IVA Type"}
                        content={client.ivaType.toString()}
                    />
                </VStack>
            </HStack>
        </InfoBox>
    );
};
export default Info;
