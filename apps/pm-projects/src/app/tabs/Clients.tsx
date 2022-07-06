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

const Clients = () => {
    const getAuthHeader = useAuthHeader();
    const {
        isLoading,
        isSuccess,
        isError,
        data: clients,
    } = useQuery(
        'clients',
        () =>
            getResourceListFilteredAndPaginated<Company>(
                'companies',
                getAuthHeader(),
                [],
                [],
                { field: 'creationDate', isAscending: false }
            ),
        { select: (r) => r.data }
    );

    if (isLoading) return <LoadingOverlay />;
    if (isError || !isSuccess || !clients)
        return <>There was an error, try again later</>;

    return (
        <VStack w={'full'} alignItems={'flex-start'} spacing={5}>
            <TabHeader label={'Clients'} icon={RiBuilding4Fill} />
            <ClientsTable clients={clients} />
        </VStack>
    );
};

export default Clients;
