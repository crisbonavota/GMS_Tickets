import { useQuery } from 'react-query';
import {
    Company,
    getResourceListFilteredAndPaginated,
} from '@gms-micro/api-utils';
import { useAuthHeader } from 'react-auth-kit';
import { VStack } from '@chakra-ui/react';
import { RiBuilding4Fill } from 'react-icons/ri';
import TabHeader from '../TabHeader';
import ClientsTable from './ClientsTable';
import { useAppSelector, useAppDispatch } from '../../redux/hooks';
import { useEffect, useCallback } from 'react';
import { changeSearch, changeTotalPages } from '../../redux/slices/mainSlice';
import FiltersBar from '../FiltersBar';
import ClientsFilters from './ClientsFilters';
import Loading from '../Loading';

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
            [
                { field: 'name', value: state.search },
                { field: 'countryId', value: state.filters.country },
                { field: 'active', value: state.filters.active },
            ],
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

    if (isError) return <>There was an error, try again later</>;

    return (
        <VStack w={'full'} alignItems={'flex-start'} spacing={3}>
            <TabHeader label={'Clients'} icon={RiBuilding4Fill} />
            <FiltersBar
                search={state.search}
                onSearchChange={onSearch}
                filters={<ClientsFilters />}
            />
            {isSuccess && clients && <ClientsTable clients={clients} />}
            {isLoading && <Loading />}
        </VStack>
    );
};

export default Clients;
