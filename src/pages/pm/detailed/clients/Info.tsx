import InfoBox, { InfoTitle } from "../InfoBox";
import { VStack, HStack } from "@chakra-ui/react";
import { Company } from "../../../../api/types";

interface Props {
    client: Company;
}

const Info = ({ client }: Props) => {
    const ivaType = client.ivaType
    return (
        <InfoBox>
        <HStack >
            <VStack h={"full"}
                justifyContent={"space-between"}
                alignItems={"flex-start"}>
                <InfoTitle title={"Fiscal ID"} content={client.fiscalId} />
                <InfoTitle title={"CUIT/CUIL"} content={client.afipId} />
                <InfoTitle
                    title={"IVA Type"}
                    content={ivaType === 1 ? "Responsable Inscripto" : ivaType === 2 ? "Responsable No Inscripto" : ivaType === 4 ? "Exento" : "N/A"}
                />
            </VStack>
            <VStack alignItems={"flex-start"}>
                <InfoTitle title={"Country"} content={client.country?.name} />
                <InfoTitle title={"Address"} content={client.address} />
                <InfoTitle
                    title={"Status"}
                    content={client.active === true ? "Active" : client.active === false ? "Inactive" : "N/A"}
                />
            </VStack>
        </HStack>
    </InfoBox>
    );
};
export default Info;
