import { Select, Text, VStack } from "@chakra-ui/react";
import { useQuery } from "react-query";
import { getLegacyUsers } from '@gms-micro/api-utils';

export interface LegacyUserFilterProps {
    authHeader: string,
    legacyUser: string,
    setLegacyUser: (legacyUser: string) => void,
    isLoading: boolean
}

export function LegacyUserFilter({ authHeader , legacyUser, setLegacyUser, isLoading}: LegacyUserFilterProps) {
    const query = useQuery(['employees'], () => getLegacyUsers(authHeader));
    return (
        <VStack alignItems={'flex-start'} w={'15rem'}>
            <Text fontSize={'sm'}>Employee</Text>
            {query.isSuccess &&
                <Select w={'full'} bgColor={'white'} value={legacyUser} onChange={(e) => setLegacyUser(e.target.value)} disabled={isLoading}>
                    <option value={""}>All</option>
                    {query.data.data.map(user => <option key={user.id} value={user.id}>{user.fullName}</option>)}    
                </Select>}
        </VStack>
    );
}

export default LegacyUserFilter;
