import { Select, Skeleton, Text, VStack } from '@chakra-ui/react';
import { useQuery } from 'react-query';
import { getUpdateTypes } from '../../api';

export interface UpdateTypeFilterProps {
    authHeader: string,
    updateType: string,
    setUpdateType: (updateType: string) => void,
    isLoading: boolean
}

export const UpdateTypeFilter = ({ authHeader, setUpdateType, isLoading }: UpdateTypeFilterProps) => {
    const query = useQuery(['updateTypes'], () => getUpdateTypes(authHeader));
    return (
        <VStack alignItems={'flex-start'} w={'10rem'}>
            <Text fontSize={'sm'}>Update type</Text>
            {query.isSuccess &&
                <Select w={'full'} bgColor={'white'} onChange={(e) => setUpdateType(e.target.value)} disabled={isLoading}>
                    <option value={""}>All</option>
                    {query.data && query.data.data.map(({ id, caption }) => <option key={id} value={id}>{caption}</option>)}
                </Select>}
            {query.isLoading && <Skeleton w={'full'} borderRadius={5} h={10} />}
            {query.isError && <Text>There was an error loading the update types, try again later</Text>}
        </VStack>
    );
}

export default UpdateTypeFilter;
