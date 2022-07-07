import { useQuery } from 'react-query';
import {
    getResourceListFilteredAndPaginated,
    Project,
} from '@gms-micro/api-utils';
import { useAuthHeader } from 'react-auth-kit';
import { LoadingOverlay } from '@gms-micro/table-utils';
import { VStack } from '@chakra-ui/react';
import TabHeader from './TabHeader';
import { useAppSelector, useAppDispatch } from '../redux/hooks';
import { useEffect } from 'react';
import { changeTotalPages } from '../redux/slices/mainSlice';
import { BsFillBriefcaseFill } from 'react-icons/bs';
import JobsTable from './JobsTable';

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
            [],
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
                    module: 'accounts',
                    value: pagesAmount,
                },
            });
        }
    }, [jobs, isSuccess, axiosRes, dispatch, changeTotalPages]);

    if (isLoading) return <LoadingOverlay />;
    if (isError || !isSuccess) return <>There was an error, try again later</>;

    return (
        <VStack w={'full'} alignItems={'flex-start'} spacing={1}>
            <TabHeader label={'Jobs'} icon={BsFillBriefcaseFill} />
            {/* @ts-ignore */}
            <JobsTable jobs={jobs} />
        </VStack>
    );
};

export default Accounts;
