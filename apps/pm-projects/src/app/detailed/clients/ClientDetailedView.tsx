import { useParams } from 'react-router-dom';
import { useQuery } from 'react-query';
import { Company, getResource } from '@gms-micro/api-utils';
import { useAuthHeader } from 'react-auth-kit';
import { LoadingOverlay } from '@gms-micro/table-utils';
import { Heading, HStack, VStack } from '@chakra-ui/react';
import Info from './Info';
import TablesBox from '../TablesBox';
import ClientAccounts from './ClientAccounts';
import ClientJobs from './ClientJobs';
import CloneButton from '../CloneButton';

const ClientDetailedView = () => {
    const { id } = useParams();
    const getAuthHeader = useAuthHeader();

    const {
        isLoading,
        data: client,
        isSuccess,
    } = useQuery(
        `client-${id}`,
        () => getResource<Company>(`companies/${id}`, getAuthHeader()),
        { select: (r) => r.data }
    );

    if (isLoading) return <LoadingOverlay />;
    if (!client || !isSuccess) return <div>Error</div>;

    return (
        <VStack w={'full'} pt={'5rem'}>
            <VStack w={'fit-content'} alignItems={'flex-start'} spacing={3}>
                <HStack w={'full'} justifyContent={'space-between'}>
                    <Heading>{client.name}</Heading>
                    <CloneButton />
                </HStack>
                <HStack
                    w={'full'}
                    justifyContent={'center'}
                    spacing={'10rem'}
                    alignItems={'flex-start'}
                >
                    <Info client={client} />
                    <TablesBox>
                        <VStack
                            w={'full'}
                            spacing={10}
                            alignItems={'flex-start'}
                        >
                            <ClientAccounts clientId={client.id} />
                            <ClientJobs clientId={client.id} />
                        </VStack>
                    </TablesBox>
                </HStack>
            </VStack>
        </VStack>
    );
};
export default ClientDetailedView;
