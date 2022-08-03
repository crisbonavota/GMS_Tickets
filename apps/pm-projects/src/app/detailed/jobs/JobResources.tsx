import { Box, HStack, VStack } from '@chakra-ui/react';
import {
    getResourceList,
} from '@gms-micro/api-utils';
import { LegacyUserPublic } from '@gms-micro/auth-types';
import { useAuthHeader } from 'react-auth-kit';
import { IoExtensionPuzzle } from 'react-icons/io5';
import { useQuery } from 'react-query';
import Loading from '../../tabs/Loading';
import AddButton from '../AddButton';
import ResourcesTable from '../ResourcesTable';
import TableHeader from '../TableHeader';

interface Props {
    id: number;
}

const JobResources = ({ id }: Props) => {
    const getAuthHeader = useAuthHeader();
    const {
        data: members,
        isLoading,
        isSuccess,
    } = useQuery(
        `project-${id}-members`,
        () =>
            getResourceList<LegacyUserPublic>(
                `/projects/${id}/members`,
                getAuthHeader()
            ),
        { select: (r) => r.data }
    );

    if (isLoading)
        return (
            <Box minW={'30vw'}>
                <Loading />
            </Box>
        );

    return (
        <VStack alignItems={'flex-start'} spacing={0} w={'full'}>
            <HStack
                w={'full'}
                justifyContent={'space-between'}
                alignItems={'flex-end'}
                paddingBottom={3}
            >
                <TableHeader label="Resources" icon={IoExtensionPuzzle} />
                <AddButton label="Resource" />
            </HStack>
            {isSuccess && members && (
                <HStack alignItems={"center"} w={"full"}>
                    <ResourcesTable members={members} projectId={id} />
                </HStack>
            )}
        </VStack>
    );
};

export default JobResources;
