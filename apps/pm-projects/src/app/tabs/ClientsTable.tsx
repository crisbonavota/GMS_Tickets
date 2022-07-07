import { Company } from '@gms-micro/api-utils';
import moment from 'moment';
import { momentToLocaleDateString } from '@gms-micro/datetime-utils';
import { DynamicTable, DynamicTableFormat } from '@gms-micro/table-utils';
import { HStack, Link, Text } from '@chakra-ui/react';
import { BsSearch } from 'react-icons/bs';
import { Link as RouterLink } from 'react-router-dom';
import { useAppSelector, useAppDispatch } from '../redux/hooks';
import { changePage, changeSort } from '../redux/slices/mainSlice';
import { Sort } from '@gms-micro/api-filters';
import { useCallback } from 'react';

interface Props {
    clients: Company[];
}

const format: DynamicTableFormat[] = [
    {
        header: 'client',
        accessor: 'name',
    },
    {
        header: 'Country',
        accessor: 'country.name',
    },
    {
        header: 'Creation Date',
        accessor: 'creationDate',
        accessorFn: (r: string) => momentToLocaleDateString(moment(r)),
    },
    {
        header: 'Status',
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
                <Link as={RouterLink} to={`clients/${id}`} w={'fit-content'}>
                    <BsSearch color={'orangered'} />
                </Link>
            </HStack>
        ),
    },
];

const ClientsTable = ({ clients }: Props) => {
    const state = useAppSelector((s) => s.projectManagement.clients);
    const dispatch = useAppDispatch();

    const setSort = useCallback(
        (s: Sort) =>
            dispatch({
                type: changeSort,
                payload: { module: 'clients', value: s },
            }),
        [changeSort, useAppDispatch]
    );

    const setPage = useCallback(
        (p: number) =>
            dispatch({
                type: changePage,
                payload: { module: 'clients', value: p },
            }),
        [changePage, useAppDispatch]
    );

    return (
        <DynamicTable
            format={format}
            data={clients}
            sort={state.sort}
            setSort={setSort}
            currentPage={state.pagination.currentPage}
            totalPages={state.pagination.totalPages}
            setCurrentPage={setPage}
        />
    );
};

export default ClientsTable;
