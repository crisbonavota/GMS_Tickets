import { useParams } from 'react-router-dom';
import { useQuery } from 'react-query';
import { Account, getResource } from '@gms-micro/api-utils';
import { useAuthHeader } from 'react-auth-kit';
import { LoadingOverlay } from '@gms-micro/table-utils';
import { Heading, HStack, VStack, Flex } from '@chakra-ui/react';
import CloneButton from '../CloneButton';
import Info from './Info';
import AccountJobs from './AccountJobs';
import TablesBox from '../TablesBox';

const AccountDetailedView = () => {
    const { id } = useParams();
    const getAuthHeader = useAuthHeader();

    const {
        isLoading,
        data: account,
        isSuccess,
    } = useQuery(
        `account-${id}`,
        () => getResource<Account>(`accounts/${id}`, getAuthHeader()),
        { select: (r) => r.data }
    );

    if (isLoading) return <LoadingOverlay />;
    if (!account || !isSuccess) return <div>Error</div>;

    return (
        <VStack w={'full'} pt={{ base: 1, md: '5rem' }}>
            <VStack
                w={{ base: 'full', md: 'fit-content' }}
                alignItems={'flex-start'}
                spacing={3}
                p={5}
            >
                <HStack w={'full'} justifyContent={'space-between'}>
                    <Heading>{account.name}</Heading>
                    <CloneButton />
                </HStack>
                <Flex
                    w={'full'}
                    justifyContent={'center'}
                    gap={10}
                    alignItems={{ base: 'center', md: 'flex-start' }}
                    flexDir={{ base: 'column', md: 'row' }}
                >
                    <Info account={account} />
                    <TablesBox w={{ base: 'full', md: 'fit-content' }}>
                        <AccountJobs accountId={account.id} />
                    </TablesBox>
                </Flex>
            </VStack>
        </VStack>
    );
};
export default AccountDetailedView;
