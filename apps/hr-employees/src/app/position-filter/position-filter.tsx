import { Select, Skeleton, Text, VStack } from '@chakra-ui/react';
import { useQuery } from 'react-query';
import { getResourceList } from '@gms-micro/api-utils';
import { Position } from '@gms-micro/api-utils';
import { useAuthHeader } from 'react-auth-kit';


export interface PositionFilterProps{
    position: string,
    setPosition: (position: string) => void,
    isLoading: boolean
}


export const PositionFilter = ({ setPosition, isLoading }: PositionFilterProps) => {
    const getAuthHeader = useAuthHeader();
    const query = useQuery(['positions'], () => getResourceList<Position>("employees/positions", getAuthHeader()));
    return (
        <VStack alignItems={'flex-start'} w={'10rem'}>
            <Text fontSize={'sm'}>Position</Text>
            {query.isSuccess &&
                <Select w={'full'} bgColor={'white'} onChange={(e) => setPosition(e.target.value)} disabled={isLoading}>
                    <option value={""}>All</option>
                    {query.data && query.data.data.map(({ id, name }) => <option key={id} value={id}>{name}</option>)}
                </Select>}
            {query.isLoading && <Skeleton w={'full'} borderRadius={5} h={10} />}
            {query.isError && <Text>There was an error loading the positions, try again later</Text>}
        </VStack>
    );
}

export default PositionFilter;
