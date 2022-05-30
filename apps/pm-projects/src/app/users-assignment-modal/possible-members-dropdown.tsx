import { getResourceList, postResource } from '@gms-micro/api-utils';
import { LegacyUserPublic } from '@gms-micro/auth-types';
import { Select } from 'chakra-react-select';
import { useQuery, useMutation, useQueryClient } from 'react-query';
import { useAuthHeader } from 'react-auth-kit';
import {
    Box,
    HStack,
    IconButton,
    Text,
    useBoolean,
    useToast,
} from '@chakra-ui/react';
import { chakraSelectStyle } from '@gms-micro/chakra-react-select-styles';
import { AiOutlineUserAdd } from 'react-icons/ai';
import { useState } from 'react';
import { AxiosError, AxiosResponse } from 'axios';

interface Props {
    projectId: number;
}

const PossibleMembersDropdown = ({ projectId }: Props) => {
    const getAuthHeader = useAuthHeader();
    const queryClient = useQueryClient();
    const [selected, setSelected] = useState<{
        label: string;
        value: number;
    } | null>(null);
    const [isMutating, setIsMutating] = useBoolean();
    const toast = useToast();

    const possibleMembersQuery = useQuery<
        AxiosResponse<LegacyUserPublic[], any>,
        AxiosError,
        LegacyUserPublic[]
    >(
        [`members-possible-${projectId}`],
        async () =>
            await getResourceList<LegacyUserPublic>(
                `/projects/${projectId}/members/possible`,
                getAuthHeader()
            ),
        { select: (r) => r.data }
    );

    const addMemberMutation = useMutation(
        async () =>
            await postResource(
                `projects/${projectId}/members`,
                getAuthHeader(),
                { memberId: selected?.value }
            ),
        {
            onMutate: () => {
                setIsMutating.on();
                queryClient.cancelQueries([`members-${projectId}`]);
                queryClient.cancelQueries([`members-possible-${projectId}`]);
            },
            onSuccess: () => {
                setSelected(null);
                queryClient.resetQueries([`members-${projectId}`]);
                queryClient.resetQueries([`members-possible-${projectId}`]);
                toast({ title: 'Added member to project', status: 'success' });
                setIsMutating.off();
            },
            onError: (err: any) => {
                toast({
                    title: 'Failed to add member to project',
                    description: err.message | err,
                    status: 'error',
                });
                setIsMutating.off();
            },
        }
    );

    const {
        isSuccess,
        isLoading,
        data: possibleMembers,
    } = possibleMembersQuery;

    return (
        <HStack w={'full'}>
            <Box flex={1}>
                <Select
                    options={
                        isSuccess
                            ? possibleMembers?.map((m) => ({
                                  label: m.fullName,
                                  value: m.id,
                              }))
                            : []
                    }
                    chakraStyles={chakraSelectStyle}
                    onChange={(op: any) => setSelected(op)}
                    isClearable
                    isLoading={isLoading}
                    value={selected}
                />
            </Box>
            <IconButton
                icon={<AiOutlineUserAdd size={20} />}
                colorScheme={'green'}
                aria-label="Add user to project"
                isDisabled={!selected}
                isLoading={isMutating}
                onClick={async () => await addMemberMutation.mutateAsync()}
            />
        </HStack>
    );
};
export default PossibleMembersDropdown;
