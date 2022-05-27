import { getResourceList } from '@gms-micro/api-utils';
import { LegacyUserPublic } from '@gms-micro/auth-types';
import { Select } from 'chakra-react-select';
import { useQuery } from 'react-query';
import { useAuthHeader } from 'react-auth-kit';
import { Skeleton, chakra, Box } from '@chakra-ui/react';
import { chakraSelectStyle } from '@gms-micro/chakra-react-select-styles';

interface Props {
    projectId: number;
}

const PossibleMembersDropdown = ({ projectId }: Props) => {
    const getAuthHeader = useAuthHeader();
    const possibleMembersQuery = useQuery(
        [`/projects/for-pm/${projectId}/members/possible`],
        async () =>
            (
                await getResourceList<LegacyUserPublic>(
                    `/projects/for-pm/${projectId}/members/possible`,
                    getAuthHeader()
                )
            ).data
    );

    if (possibleMembersQuery.isLoading)
        return <Skeleton h={'40px'} w={'full'} />;

    return (
        <Box w={'full'}>
            {possibleMembersQuery.isSuccess && (
                <Select
                    options={possibleMembersQuery.data}
                    getOptionLabel={(op: any) => op.fullName}
                    getOptionValue={(op: any) => op.id.toString()}
                    chakraStyles={chakraSelectStyle}
                />
            )}
        </Box>
    );
};
export default PossibleMembersDropdown;
