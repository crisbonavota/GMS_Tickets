import { useQuery } from 'react-query';
import {
    Company,
    getResourceListFilteredAndPaginated,
} from '@gms-micro/api-utils';
import { useAuthHeader } from 'react-auth-kit';
import { LoadingOverlay } from '@gms-micro/table-utils';
import { VStack } from '@chakra-ui/react';
import { RiBuilding4Fill } from 'react-icons/ri';
import TabHeader from '../TabHeader';
import ClientsTable from './ClientsTable';
import { useAppSelector, useAppDispatch } from '../../redux/hooks';
import { useEffect, useCallback } from 'react';
import { changeSearch, changeTotalPages } from '../../redux/slices/mainSlice';
import FiltersBar from '../FiltersBar';
import ClientsFilters from './ClientsFilters';

const Clients = () => {
    const state = useAppSelector((s) => s.projectManagement.clients);
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
        ['clients', state.pagination],
        () =>
            getResourceListFilteredAndPaginated<Company>(
                'companies',
                getAuthHeader(),
                [{ field: 'name', value: state.search }],
                [],
                state.sort,
                state.pagination.currentPage,
                10
            ),
        { refetchOnWindowFocus: false }
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

    const onSearch = useCallback(
        (s: string) => {
            dispatch({
                type: changeSearch,
                payload: {
                    module: 'clients',
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
            <TabHeader label={'Clients'} icon={RiBuilding4Fill} />
            <FiltersBar
                search={state.search}
                onSearchChange={onSearch}
                onApplyClick={onApplyFilters}
                filters={<ClientsFilters />}
            />
            {/*  @ts-ignore */}
            <ClientsTable clients={clients} />
        </VStack>
    );
};

export default Clients;
