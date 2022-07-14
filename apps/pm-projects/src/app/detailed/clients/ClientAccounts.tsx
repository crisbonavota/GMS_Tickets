import {
    Account,
    getResourceListFilteredAndPaginated,
} from '@gms-micro/api-utils';
import { useQuery } from 'react-query';
import { useAuthHeader } from 'react-auth-kit';
import AccountsTable from './AccountsTable';
import Loading from '../../tabs/Loading';
import { useState } from 'react';
import { VStack, Box, HStack } from '@chakra-ui/react';
import TableHeader from '../TableHeader';
import { MdAccountBalanceWallet } from 'react-icons/md';
import AddButton from '../AddButton';
interface Props {
    clientId: number;
}

const ClientAccounts = ({ clientId }: Props) => {
    const [page, setPage] = useState(0);
    const getAuthHeader = useAuthHeader();
    const {
        isLoading,
        data: axiosRes,
        isSuccess,
    } = useQuery(['accounts', clientId, page], () =>
        getResourceListFilteredAndPaginated<Account>(
            'accounts',
            getAuthHeader(),
            [{ field: 'companyId', value: clientId }],
            [],
            { field: 'name', isAscending: true },
            page,
            5
        )
    );

    const accounts = axiosRes?.data;

    if (isLoading)
        return (
            <Box minW={'30vw'}>
                <Loading />
            </Box>
        );

    return (
        <VStack alignItems={'flex-start'} spacing={0} w={'full'}>
            <HStack
                w={'full'}
                justifyContent={'space-between'}
                alignItems={'flex-end'}
            >
                <TableHeader label="Accounts" icon={MdAccountBalanceWallet} />
                <AddButton label="account" />
            </HStack>
            {isSuccess && accounts && (
                <AccountsTable
                    accounts={accounts}
                    totalPages={parseInt(axiosRes.headers['pages-amount'])}
                    page={page}
                    setPage={setPage}
                />
            )}
        </VStack>
    );
};
export default ClientAccounts;
