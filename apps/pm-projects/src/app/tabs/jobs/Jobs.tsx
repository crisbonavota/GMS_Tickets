import { useQuery } from 'react-query';
import {
    getResourceListFilteredAndPaginated,
    Project,
} from '@gms-micro/api-utils';
import { useAuthHeader } from 'react-auth-kit';
import { VStack } from '@chakra-ui/react';
import TabHeader from './../TabHeader';
import { useAppSelector, useAppDispatch } from '../../redux/hooks';
import { useCallback, useEffect } from 'react';
import { changeSearch, changeTotalPages } from '../../redux/slices/mainSlice';
import { BsFillBriefcaseFill } from 'react-icons/bs';
import JobsTable from './JobsTable';
import FiltersBar from './../FiltersBar';
import Loading from '../Loading';
import JobsFilters from './JobsFilters';

const translateTypeFilter = (type: { project: boolean; proposal: boolean }) => {
    if (type.project && type.proposal) return undefined;
    if (type.project) return true;
    return false;
};

const Accounts = () => {
    const state = useAppSelector((s) => s.projectManagement.jobs);
    const getAuthHeader = useAuthHeader();
    const dispatch = useAppDispatch();

    const {
        isLoading,
        isSuccess,
        isError,
        data: axiosRes,
    } = useQuery(['projects', state], () =>
        getResourceListFilteredAndPaginated<Project>(
            'projects',
            getAuthHeader(),
            [
                { field: 'name', value: state.search },
                { field: 'client', value: state.filters.client },
                { field: 'account', value: state.filters.account },
                {
                    field: 'sold',
                    value: translateTypeFilter(state.filters.type),
                },
            ],
            [],
            state.sort,
            state.pagination.currentPage,
            10
        )
    );

    const jobs = axiosRes?.data;

    useEffect(() => {
        if (isSuccess) {
            const pagesAmountString = axiosRes?.headers['pages-amount'];
            if (!pagesAmountString) return;

            const pagesAmount = parseInt(pagesAmountString, 10);
            if (isNaN(pagesAmount)) return;

            dispatch({
                type: changeTotalPages,
                payload: {
                    module: 'jobs',
                    value: pagesAmount,
                },
            });
        }
    }, [jobs, isSuccess, axiosRes, dispatch, changeTotalPages]);

    const onSearch = useCallback(
        (s: string) => {
            dispatch({
                type: changeSearch,
                payload: {
                    module: 'jobs',
                    value: s,
                },
            });
        },
        [dispatch, changeSearch]
    );

    if (isError) return <>Something went wrong, try again later</>;

    return (
        <VStack w={'full'} alignItems={'flex-start'} spacing={3}>
            <TabHeader label={'Jobs'} icon={BsFillBriefcaseFill} />
            <FiltersBar
                onSearchChange={onSearch}
                search={state.search}
                filters={<JobsFilters />}
            />
            {isSuccess && jobs && <JobsTable jobs={jobs} />}
            {isLoading && <Loading />}
        </VStack>
    );
};

export default Accounts;
