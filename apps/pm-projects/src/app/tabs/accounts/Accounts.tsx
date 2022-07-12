import { useQuery } from 'react-query';
import {
    Account,
    getResourceListFilteredAndPaginated,
} from '@gms-micro/api-utils';
import { useAuthHeader } from 'react-auth-kit';
import { VStack } from '@chakra-ui/react';
import TabHeader from '../TabHeader';
import { useAppSelector, useAppDispatch } from '../../redux/hooks';
import { useCallback, useEffect } from 'react';
import { changeSearch, changeTotalPages } from '../../redux/slices/mainSlice';
import { MdAccountBalanceWallet } from 'react-icons/md';
import AccountsTable from './AccountsTable';
import FiltersBar from '../FiltersBar';
import Loading from '../Loading';
import AccountsFilters from './AccountsFilters';

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
            [
                { field: 'name', value: state.search },
                { field: 'countryId', value: state.filters.country },
                { field: 'active', value: state.filters.active },
                { field: 'companyId', value: state.filters.client },
            ],
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

    const onSearch = useCallback(
        (s: string) => {
            dispatch({
                type: changeSearch,
                payload: {
                    module: 'accounts',
                    value: s,
                },
            });
        },
        [dispatch, changeSearch]
    );

    if (isError) return <>There was an error, try again later</>;

    return (
        <VStack w={'full'} alignItems={'flex-start'} spacing={1}>
            <TabHeader label={'Accounts'} icon={MdAccountBalanceWallet} />
            <FiltersBar
                onSearchChange={onSearch}
                search={state.search}
                filters={<AccountsFilters />}
            />
            {isSuccess && accounts && <AccountsTable accounts={accounts} />}
            {isLoading && <Loading />}
        </VStack>
    );
};

export default Accounts;
