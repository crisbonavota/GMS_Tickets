import { useQuery } from 'react-query';
import {
    Company,
    getResourceListFilteredAndPaginated,
} from '@gms-micro/api-utils';
import { useAuthHeader } from 'react-auth-kit';
import { LoadingOverlay } from '@gms-micro/table-utils';
import { VStack } from '@chakra-ui/react';
import { RiBuilding4Fill } from 'react-icons/ri';
import TabHeader from './TabHeader';
import ClientsTable from './ClientsTable';
import { useAppSelector, useAppDispatch } from '../redux/hooks';
import { useEffect } from 'react';
import { changeTotalPages } from '../redux/slices/mainSlice';

const Clients = () => {
    const state = useAppSelector((s) => s.projectManagement.clients);
    const getAuthHeader = useAuthHeader();
    const dispatch = useAppDispatch();

    const {
        isLoading,
        isSuccess,
        isError,
        data: axiosRes,
    } = useQuery(['clients', state], () =>
        getResourceListFilteredAndPaginated<Company>(
            'companies',
            getAuthHeader(),
            [],
            [],
            state.sort,
            state.pagination.currentPage,
            10
        )
    );

    const clients = axiosRes?.data;

    useEffect(() => {
        if (isSuccess) {
            const pagesAmountString = axiosRes?.headers['pages-amount'];
            if (!pagesAmountString) return;

            const pagesAmount = parseInt(pagesAmountString, 10);
            if (isNaN(pagesAmount)) return;

            dispatch({
                type: changeTotalPages,
                payload: {
                    module: 'clients',
                    value: pagesAmount,
                },
            });
        }
    }, [clients, isSuccess, axiosRes, dispatch, changeTotalPages]);

    if (isLoading) return <LoadingOverlay />;
    if (isError || !isSuccess) return <>There was an error, try again later</>;

    return (
        <VStack w={'full'} alignItems={'flex-start'} spacing={1}>
            <TabHeader label={'Clients'} icon={RiBuilding4Fill} />
            {/*  @ts-ignore */}
            <ClientsTable clients={clients} />
        </VStack>
    );
};

export default Clients;
