import { getResourceList } from '@gms-micro/api-utils';
import { LegacyUserPublic } from '@gms-micro/auth-types';
import { useQuery } from 'react-query';
import { useAuthHeader } from 'react-auth-kit';
import { HStack, Icon, Text, VStack } from '@chakra-ui/react';
import Loading from '../../Loading';
import { AiOutlineUser } from 'react-icons/ai';
import RemoveMember from './RemoveMember';

interface Props {
    id: number;
}

const Members = ({ id }: Props) => {
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

    return (
        <VStack
            w={'full'}
            alignItems={'flex-start'}
            spacing={3}
            maxH={'50vh'}
            overflowY={'auto'}
        >
            {isLoading && <Loading />}
            {isSuccess && members && (
                <>
                    {members.map((m) => (
                        <HStack key={m.id} alignItems={'center'} w={'full'}>
                            <Icon boxSize={'2rem'} as={AiOutlineUser} />
                            <VStack alignItems={'flex-start'} w={'full'}>
                                <HStack alignItems={'center'} w={'full'}>
                                    <Text>{m.fullName}</Text>
                                    <RemoveMember
                                        projectId={id}
                                        memberId={m.id}
                                    />
                                </HStack>
                                <Text fontSize={'sm'} color={'orangered'}>
                                    {m.email}
                                </Text>
                            </VStack>
                        </HStack>
                    ))}
                </>
            )}
            {isSuccess && !members?.length && (
                <Text>This project has no resources</Text>
            )}
        </VStack>
    );
};

export default Members;
