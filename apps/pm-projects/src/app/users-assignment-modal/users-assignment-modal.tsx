import {
    useDisclosure,
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalCloseButton,
    ModalBody,
    IconButton,
    VStack,
    Text,
    Skeleton,
    HStack,
    SkeletonCircle,
    Icon,
} from '@chakra-ui/react';
import { getResourceList } from '@gms-micro/api-utils';
import { LegacyUserPublic } from '@gms-micro/auth-types';
import { FiUsers } from 'react-icons/fi';
import { useQuery } from 'react-query';
import { useAuthHeader } from 'react-auth-kit';
import { AiOutlineUser } from 'react-icons/ai';
import PossibleMembersDropdown from './possible-members-dropdown';
import { AxiosResponse, AxiosError } from 'axios';
import { useBoolean } from '@chakra-ui/react';
import RemoveMemberButton from './remove-member-button';

interface Props {
    projectId: number;
}

const UsersAssignmentModal = ({ projectId }: Props) => {
    const { isOpen, onOpen, onClose } = useDisclosure();
    const getAuthHeader = useAuthHeader();
    const membersQuery = useQuery<
        AxiosResponse<LegacyUserPublic[], any>,
        AxiosError,
        LegacyUserPublic[]
    >(
        [`members-${projectId}`],
        async () =>
            await getResourceList<LegacyUserPublic>(
                `/projects/${projectId}/members`,
                getAuthHeader()
            ),
        { select: (r) => r.data }
    );

    return (
        <>
            <IconButton
                icon={<FiUsers />}
                onClick={onOpen}
                aria-label="Manage project members"
            />

            <Modal isOpen={isOpen} onClose={onClose}>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>Project members</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                        <VStack
                            w={'full'}
                            alignItems={'flex-start'}
                            pb={5}
                            spacing={5}
                        >
                            <VStack
                                spacing={3}
                                maxH={'50vh'}
                                overflowY={'auto'}
                                w={'full'}
                            >
                                {membersQuery.isSuccess && (
                                    <>
                                        {membersQuery.data.map((member) => (
                                            <MembersListItem
                                                member={member}
                                                key={member.id}
                                                projectId={projectId}
                                            />
                                        ))}
                                        {membersQuery.data.length === 0 && (
                                            <Text>
                                                No members in this project
                                            </Text>
                                        )}
                                    </>
                                )}
                                {membersQuery.isLoading && (
                                    <>
                                        {[...Array(3)].map((_, i) => (
                                            <HStack key={i} w={'full'}>
                                                <SkeletonCircle w={5} h={5} />
                                                <Skeleton
                                                    w={'50%'}
                                                    h={'20px'}
                                                />
                                            </HStack>
                                        ))}
                                    </>
                                )}
                            </VStack>
                            <PossibleMembersDropdown projectId={projectId} />
                        </VStack>
                    </ModalBody>
                </ModalContent>
            </Modal>
        </>
    );
};

interface MembersListItemProps {
    member: LegacyUserPublic;
    projectId: number;
}

const MembersListItem = ({ member, projectId }: MembersListItemProps) => {
    const [hovered, setHovered] = useBoolean();

    return (
        <HStack
            w={'full'}
            onMouseOver={setHovered.on}
            onMouseLeave={setHovered.off}
            justifyContent={'space-between'}
            p={1}
        >
            <HStack>
                <Icon as={AiOutlineUser} /> <Text>{member.fullName}</Text>
            </HStack>
            <RemoveMemberButton
                member={member}
                active={hovered}
                projectId={projectId}
            />
        </HStack>
    );
};

export default UsersAssignmentModal;
