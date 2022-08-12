import { Company } from '@gms-micro/api-utils';
import InfoBox, { InfoTitle } from '../InfoBox';
import { VStack, HStack } from '@chakra-ui/react';
import EditButton from '../EditButton';

interface Props {
    client: Company;
}

const Info = ({ client }: Props) => {
    return (
        <InfoBox>
            <HStack>
                <VStack
                    h={'full'}
                    justifyContent={'space-between'}
                    alignItems={'flex-start'}
                >
                    <InfoTitle title={'Address'} content={client.address} />
                    <EditButton />
                </VStack>
                <VStack alignItems={'flex-start'} spacing={5}>
                    <InfoTitle title={'Fiscal ID'} content={client.fiscalId} />
                    <InfoTitle title={'CUIT/CUIL'} content={client.afipId} />
                    <InfoTitle title={'IVA Type'} content={client.ivaType} />
                </VStack>
            </HStack>
        </InfoBox>
    );
};
export default Info;
