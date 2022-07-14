import { Account } from '@gms-micro/api-utils';
import InfoBox, { InfoTitle } from '../InfoBox';
import { SimpleGrid, GridItem, HStack, VStack } from '@chakra-ui/react';
import EditButton from '../EditButton';

interface Props {
    account: Account;
}

const Info = ({ account }: Props) => {
    return (
        <InfoBox>
            <SimpleGrid columns={12} minW={'25rem'} spacing={10}>
                <GridItem colSpan={12}>
                    <HStack
                        w={'full'}
                        justifyContent={'space-between'}
                        alignItems={'center'}
                    >
                        <InfoTitle
                            title={'Country'}
                            content={account.country.name}
                        />
                        <InfoTitle
                            title={'Responsible'}
                            content={
                                account.responsibleLegacyUser?.fullName || ''
                            }
                        />
                    </HStack>
                </GridItem>
                <GridItem colSpan={6}>
                    <VStack spacing={5} alignItems={'flex-start'}>
                        <InfoTitle title="Notes" content={account.notes} />
                        <EditButton />
                    </VStack>
                </GridItem>
            </SimpleGrid>
        </InfoBox>
    );
};

export default Info;
