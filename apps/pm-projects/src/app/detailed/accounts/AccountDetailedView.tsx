import { useParams } from 'react-router-dom';
import { useQuery } from 'react-query';
import { Account, getResource } from '@gms-micro/api-utils';
import { useAuthHeader } from 'react-auth-kit';
import { LoadingOverlay } from '@gms-micro/table-utils';
import { Heading, HStack, VStack } from '@chakra-ui/react';
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
        <VStack w={'full'} pt={'5rem'}>
            <VStack w={'fit-content'} alignItems={'flex-start'} spacing={3}>
                <HStack w={'full'} justifyContent={'space-between'}>
                    <Heading>{account.name}</Heading>
                    <CloneButton />
                </HStack>
                <HStack
                    w={'full'}
                    justifyContent={'center'}
                    spacing={'10rem'}
                    alignItems={'flex-start'}
                >
                    <Info account={account} />
                    <TablesBox>
                        <AccountJobs accountId={account.id} />
                    </TablesBox>
                </HStack>
            </VStack>
        </VStack>
    );
};
export default AccountDetailedView;
