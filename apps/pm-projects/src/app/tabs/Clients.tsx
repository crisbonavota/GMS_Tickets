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
import { useState } from 'react';
import { Sort } from '@gms-micro/api-filters';

const Clients = () => {
    const [sort, setSort] = useState<Sort>({
        field: 'creationDate',
        isAscending: false,
    });
    const getAuthHeader = useAuthHeader();
    const {
        isLoading,
        isSuccess,
        isError,
        data: clients,
    } = useQuery(
        ['clients', sort],
        () =>
            getResourceListFilteredAndPaginated<Company>(
                'companies',
                getAuthHeader(),
                [],
                [],
                sort
            ),
        { select: (r) => r.data }
    );

    if (isLoading) return <LoadingOverlay />;
    if (isError || !isSuccess || !clients)
        return <>There was an error, try again later</>;

    return (
        <VStack w={'full'} alignItems={'flex-start'} spacing={5}>
            <TabHeader label={'Clients'} icon={RiBuilding4Fill} />
            <ClientsTable clients={clients} sort={sort} setSort={setSort} />
        </VStack>
    );
};

export default Clients;
