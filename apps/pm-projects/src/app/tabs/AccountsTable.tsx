import { Account } from '@gms-micro/api-utils';
import { DynamicTable, DynamicTableFormat } from '@gms-micro/table-utils';
import { HStack, Link, Text } from '@chakra-ui/react';
import { BsSearch } from 'react-icons/bs';
import { Link as RouterLink } from 'react-router-dom';
import { useAppSelector, useAppDispatch } from '../redux/hooks';
import { changePage, changeSort } from '../redux/slices/mainSlice';
import { Sort } from '@gms-micro/api-filters';
import { useCallback } from 'react';

interface Props {
    accounts: Account[];
}

const format: DynamicTableFormat[] = [
    {
        header: 'account',
        accessor: 'name',
    },
    {
        header: 'client',
        accessor: 'company.name',
    },
    {
        header: 'Country',
        accessor: 'country.name',
    },
    {
        header: 'Active',
        accessor: 'active',
        accessorFn: (r: boolean) => (
            <Text color={r ? 'green' : 'red'}>
                {r ? 'Active' : 'Not active'}
            </Text>
        ),
    },
    {
        header: 'Details',
        accessor: 'id',
        accessorFn: (id: string) => (
            <HStack w={'full'}>
                <Link as={RouterLink} to={`accounts/${id}`} w={'fit-content'}>
                    <BsSearch color={'orangered'} />
                </Link>
            </HStack>
        ),
    },
];

const AccountsTable = ({ accounts }: Props) => {
    const state = useAppSelector((s) => s.projectManagement.accounts);
    const dispatch = useAppDispatch();

    const setSort = useCallback(
        (s: Sort) =>
            dispatch({
                type: changeSort,
                payload: { module: 'accounts', value: s },
            }),
        [changeSort, useAppDispatch]
    );

    const setPage = useCallback(
        (p: number) =>
            dispatch({
                type: changePage,
                payload: { module: 'accounts', value: p },
            }),
        [changePage, useAppDispatch]
    );

    return (
        <DynamicTable
            format={format}
            data={accounts}
            sort={state.sort}
            setSort={setSort}
            currentPage={state.pagination.currentPage}
            totalPages={state.pagination.totalPages}
            setCurrentPage={setPage}
        />
    );
};

export default AccountsTable;
