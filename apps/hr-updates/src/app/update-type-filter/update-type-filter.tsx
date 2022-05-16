import { Select, Skeleton, Text, VStack } from '@chakra-ui/react';
import { UpdateType } from '@gms-micro/api-utils';
import { useQuery } from 'react-query';
import { getResourceList } from '@gms-micro/api-utils';
import { useAuthHeader } from 'react-auth-kit';

export interface UpdateTypeFilterProps {
    updateType: string,
    setUpdateType: (updateType: string) => void,
    isLoading: boolean
}

export const UpdateTypeFilter = ({ setUpdateType, isLoading }: UpdateTypeFilterProps) => {
    const getAuthHeader = useAuthHeader();
    const query = useQuery(['updateTypes'], () => getResourceList<UpdateType>("updates/types", getAuthHeader()));
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
