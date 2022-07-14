import { Company } from '@gms-micro/api-utils';
import InfoBox, { InfoTitle } from '../InfoBox';
import { SimpleGrid, GridItem, VStack, Heading } from '@chakra-ui/react';
import EditButton from '../EditButton';

interface Props {
    client: Company;
}

const Info = ({ client }: Props) => {
    return (
        <InfoBox>
            <SimpleGrid columns={12} minW={'25rem'}>
                <GridItem colSpan={6}>
                    <VStack
                        h={'full'}
                        justifyContent={'space-between'}
                        alignItems={'flex-start'}
                    >
                        <InfoTitle title={'Address'} content={client.address} />
                        <EditButton />
                    </VStack>
                </GridItem>
                <GridItem colSpan={6}>
                    <VStack alignItems={'flex-start'} spacing={5}>
                        <InfoTitle
                            title={'Fiscal ID'}
                            content={client.fiscalId}
                        />
                        <InfoTitle
                            title={'CUIT/CUIL'}
                            content={client.afipId}
                        />
                        <InfoTitle
                            title={'IVA Type'}
                            content={client.ivaType}
                        />
                    </VStack>
                </GridItem>
            </SimpleGrid>
        </InfoBox>
    );
};
export default Info;
