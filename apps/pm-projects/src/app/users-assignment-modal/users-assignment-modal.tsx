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
    List,
    ListItem,
    Text,
    ListIcon,
    Skeleton,
    HStack,
    SkeletonCircle,
} from '@chakra-ui/react';
import { getResourceList } from '@gms-micro/api-utils';
import { LegacyUserPublic } from '@gms-micro/auth-types';
import { FiUsers } from 'react-icons/fi';
import { useQuery } from 'react-query';
import { useAuthHeader } from 'react-auth-kit';
import { AiOutlineUser } from 'react-icons/ai';
import PossibleMembersDropdown from './possible-members-dropdown';
import { AxiosResponse, AxiosError } from 'axios';

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
                            <List
                                spacing={3}
                                maxH={'50vh'}
                                overflowY={'auto'}
                                w={'full'}
                            >
                                {membersQuery.isSuccess && (
                                    <>
                                        {membersQuery.data.map((member) => (
                                            <ListItem key={member.id}>
                                                <ListIcon as={AiOutlineUser} />{' '}
                                                {member.fullName}
                                            </ListItem>
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
                                            <HStack key={i}>
                                                <SkeletonCircle w={5} h={5} />
                                                <Skeleton
                                                    w={'50%'}
                                                    h={'20px'}
                                                />
                                            </HStack>
                                        ))}
                                    </>
                                )}
                            </List>
                            <PossibleMembersDropdown projectId={projectId} />
                        </VStack>
                    </ModalBody>
                </ModalContent>
            </Modal>
        </>
    );
};
export default UsersAssignmentModal;
