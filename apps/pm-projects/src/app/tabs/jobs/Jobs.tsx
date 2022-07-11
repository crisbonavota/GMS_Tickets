import { useQuery } from 'react-query';
import {
    getResourceListFilteredAndPaginated,
    Project,
} from '@gms-micro/api-utils';
import { useAuthHeader } from 'react-auth-kit';
import { LoadingOverlay } from '@gms-micro/table-utils';
import { VStack } from '@chakra-ui/react';
import TabHeader from './../TabHeader';
import { useAppSelector, useAppDispatch } from '../../redux/hooks';
import { useCallback, useEffect } from 'react';
import { changeSearch, changeTotalPages } from '../../redux/slices/mainSlice';
import { BsFillBriefcaseFill } from 'react-icons/bs';
import JobsTable from './JobsTable';
import FiltersBar from './../FiltersBar';

const Accounts = () => {
    const state = useAppSelector((s) => s.projectManagement.jobs);
    const getAuthHeader = useAuthHeader();
    const dispatch = useAppDispatch();

    const {
        isLoading,
        isSuccess,
        isError,
        data: axiosRes,
        refetch,
        isRefetching,
    } = useQuery(
        ['projects', state.pagination],
        () =>
            getResourceListFilteredAndPaginated<Project>(
                'projects',
                getAuthHeader(),
                [{ field: 'name', value: state.search }],
                [],
                state.sort,
                state.pagination.currentPage,
                10
            ),
        { refetchOnWindowFocus: false }
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

    const onApplyFilters = useCallback(async () => await refetch(), [refetch]);

    if (isLoading || isRefetching) return <LoadingOverlay />;
    if (isError || !isSuccess) return <>There was an error, try again later</>;

    return (
        <VStack w={'full'} alignItems={'flex-start'} spacing={3}>
            <TabHeader label={'Jobs'} icon={BsFillBriefcaseFill} />
            <FiltersBar
                onSearchChange={onSearch}
                onApplyClick={onApplyFilters}
                search={state.search}
            />
            {/* @ts-ignore */}
            <JobsTable jobs={jobs} />
        </VStack>
    );
};

export default Accounts;
