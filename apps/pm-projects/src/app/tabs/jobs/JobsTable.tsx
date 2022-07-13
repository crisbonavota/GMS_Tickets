import { DynamicTable, DynamicTableFormat } from '@gms-micro/table-utils';
import { useAppSelector, useAppDispatch } from '../../redux/hooks';
import { changePage, changeSort } from '../../redux/slices/mainSlice';
import { Sort } from '@gms-micro/api-filters';
import { useCallback } from 'react';
import { Project } from '@gms-micro/api-utils';
import JobType from './JobType';
import JobResources from './resources/JobResources';
import DetailsCell from './../DetailsCell';

interface Props {
    jobs: Project[];
}

const format: DynamicTableFormat[] = [
    {
        header: 'job',
        accessor: 'name',
    },
    {
        header: 'account',
        accessor: 'proposal.account.name',
    },
    {
        header: 'type',
        accessor: 'sold',
        accessorFn: (sold: boolean) => <JobType sold={sold} />,
    },
    {
        header: 'resources',
        accessor: '',
        accessorFn: (project: Project) => (
            <JobResources id={project.id} leader={project.leaderLegacyUser} />
        ),
        rawObject: true,
        disableSort: true,
    },
    {
        header: 'Details',
        accessor: 'id',
        accessorFn: (id: number) => <DetailsCell resource="jobs" id={id} />,
        disableSort: true,
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
