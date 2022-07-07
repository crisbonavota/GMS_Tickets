import { useQuery } from 'react-query';
import {
    Account,
    getResourceListFilteredAndPaginated,
} from '@gms-micro/api-utils';
import { useAuthHeader } from 'react-auth-kit';
import { LoadingOverlay } from '@gms-micro/table-utils';
import { VStack } from '@chakra-ui/react';
import TabHeader from './TabHeader';
import { useAppSelector, useAppDispatch } from '../redux/hooks';
import { useEffect } from 'react';
import { changeTotalPages } from '../redux/slices/mainSlice';
import { MdAccountBalanceWallet } from 'react-icons/md';
import AccountsTable from './AccountsTable';

const Accounts = () => {
    const state = useAppSelector((s) => s.projectManagement.accounts);
    const getAuthHeader = useAuthHeader();
    const dispatch = useAppDispatch();

    const {
        isLoading,
        isSuccess,
        isError,
        data: axiosRes,
    } = useQuery(['accounts', state], () =>
        getResourceListFilteredAndPaginated<Account>(
            'accounts',
            getAuthHeader(),
            [],
            [],
            state.sort,
            state.pagination.currentPage,
            10
        )
    );

    const accounts = axiosRes?.data;

    useEffect(() => {
        if (isSuccess) {
            const pagesAmountString = axiosRes?.headers['pages-amount'];
            if (!pagesAmountString) return;

            const pagesAmount = parseInt(pagesAmountString, 10);
            if (isNaN(pagesAmount)) return;

            dispatch({
                type: changeTotalPages,
                payload: {
                    module: 'accounts',
                    value: pagesAmount,
                },
            });
        }
    }, [accounts, isSuccess, axiosRes, dispatch, changeTotalPages]);

    if (isLoading) return <LoadingOverlay />;
    if (isError || !isSuccess) return <>There was an error, try again later</>;

    return (
        <VStack w={'full'} alignItems={'flex-start'} spacing={1}>
            <TabHeader label={'Accounts'} icon={MdAccountBalanceWallet} />
            {/* @ts-ignore */}
            <AccountsTable accounts={accounts} />
        </VStack>
    );
};

export default Accounts;
