import { Select, Skeleton, Text, VStack } from '@chakra-ui/react';
import { useQuery } from 'react-query';
import { getResourceList } from '@gms-micro/api-utils';
import { Country } from '../../../../../libs/api-utils/src/lib/api-types';
import { useAuthHeader } from 'react-auth-kit';


export interface CountryFilterProps{
    country: string,
    setCountry: (country: string) => void,
    isLoading: boolean
}


export const CountryFilter = ({ setCountry, isLoading }: CountryFilterProps) => {
    const getAuthHeader = useAuthHeader();
    const query = useQuery(['countries'], () => getResourceList<Country>("employees/countries", getAuthHeader()));
    return (
        <VStack alignItems={'flex-start'} w={'10rem'}>
            <Text fontSize={'sm'}>Country</Text>
            {query.isSuccess &&
                <Select w={'full'} bgColor={'white'} onChange={(e) => setCountry(e.target.value)} disabled={isLoading}>
                    <option value={""}>All</option>
                    {query.data && query.data.data.map(({ id, name }) => <option key={id} value={id}>{name}</option>)}
                </Select>}
            {query.isLoading && <Skeleton w={'full'} borderRadius={5} h={10} />}
            {query.isError && <Text>There was an error loading the countries, try again later</Text>}
        </VStack>
    );
}

export default CountryFilter;