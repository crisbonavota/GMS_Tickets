import { DynamicTable, DynamicTableFormat } from '@gms-micro/table-utils';
import { HStack, Link } from '@chakra-ui/react';
import { BsSearch } from 'react-icons/bs';
import { Link as RouterLink } from 'react-router-dom';
import { useAppSelector, useAppDispatch } from '../redux/hooks';
import { changePage, changeSort } from '../redux/slices/mainSlice';
import { Sort } from '@gms-micro/api-filters';
import { useCallback } from 'react';
import { Project } from '@gms-micro/api-utils';

interface Props {
    jobs: Project[];
}

const format: DynamicTableFormat[] = [
    {
        header: 'job',
        accessor: 'name',
    },
    {
        header: 'company',
        accessor: 'company.name',
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

const JobsTable = ({ jobs }: Props) => {
    const state = useAppSelector((s) => s.projectManagement.jobs);
    const dispatch = useAppDispatch();

    const setSort = useCallback(
        (s: Sort) =>
            dispatch({
                type: changeSort,
                payload: { module: 'jobs', value: s },
            }),
        [changeSort, useAppDispatch]
    );

    const setPage = useCallback(
        (p: number) =>
            dispatch({
                type: changePage,
                payload: { module: 'jobs', value: p },
            }),
        [changePage, useAppDispatch]
    );

    return (
        <DynamicTable
            format={format}
            data={jobs}
            sort={state.sort}
            setSort={setSort}
            currentPage={state.pagination.currentPage}
            totalPages={state.pagination.totalPages}
            setCurrentPage={setPage}
        />
    );
};

export default JobsTable;
