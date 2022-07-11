import { Country, getResourceList } from '@gms-micro/api-utils';
import { useQuery } from 'react-query';
import { useAuthHeader } from 'react-auth-kit';
import { Text, VStack } from '@chakra-ui/react';
import Select from 'react-select';

const ClientsFilters = () => {
    const getAuthHeader = useAuthHeader();
    const {
        data: countries,
        isSuccess,
        isLoading,
    } = useQuery(
        'countries',
        () => getResourceList<Country>('employees/countries', getAuthHeader()),
        { select: (r) => r.data }
    );

    return (
        <VStack w={'full'}>
            <VStack alignItems={'flex-start'} w={'full'}>
                <Text>Country</Text>
                <Select
                    isLoading={isLoading}
                    options={
                        countries
                            ? countries.map((c) => ({
                                  label: c.name,
                                  value: c.id,
                              }))
                            : []
                    }
                    styles={{
                        container: (base) => ({
                            ...base,
                            width: '100%',
                        }),
                    }}
                />
            </VStack>
        </VStack>
    );
};
export default ClientsFilters;
