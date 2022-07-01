import { Text, VStack, Box } from '@chakra-ui/react';
import { Select } from 'chakra-react-select';
import { useQuery } from 'react-query';
import { useAuthHeader } from 'react-auth-kit';
import {
    Account,
    getResourceListFilteredAndPaginated,
} from '@gms-micro/api-utils';
import { AxiosError, AxiosResponse } from 'axios';
import { useMemo } from 'react';
import { chakraSelectStyle } from '@gms-micro/chakra-react-select-styles';

interface Props {
    setAccount: (account: number) => void;
    account: number;
}

const AccountFilter = ({ account, setAccount }: Props) => {
    const getAuthHeader = useAuthHeader();
    const query = useQuery<AxiosResponse<Account[]>, AxiosError, Account[]>(
        ['accounts'],
        async () =>
            await getResourceListFilteredAndPaginated<Account>(
                'accounts',
                getAuthHeader(),
                [],
                [],
                { field: 'name', isAscending: true },
                0,
                10000
            ),
        { select: (r) => r.data }
    );

    const { isSuccess, isLoading, data: accounts } = query;

    const options = useMemo(
        () => accounts?.map((a) => ({ label: a.name, value: a.id })),
        [accounts]
    );

    return (
        <VStack flex={1} alignItems={'flex-start'}>
            <Text fontSize={'sm'}>Account</Text>
            <Box w={'15rem'}>
                <Select
                    options={
                        isSuccess && options
                            ? [{ label: 'All', value: 0 }, ...options]
                            : []
                    }
                    isLoading={isLoading}
                    chakraStyles={chakraSelectStyle}
                    defaultValue={account}
                    onChange={(e: any) => setAccount(e.value)}
                />
            </Box>
        </VStack>
    );
};

export default AccountFilter;
