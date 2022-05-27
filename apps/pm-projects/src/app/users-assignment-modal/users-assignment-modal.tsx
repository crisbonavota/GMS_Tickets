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
} from '@chakra-ui/react';
import { getResourceList } from '@gms-micro/api-utils';
import { LegacyUserPublic } from '@gms-micro/auth-types';
import { FiUsers } from 'react-icons/fi';
import { useQuery } from 'react-query';
import { useAuthHeader } from 'react-auth-kit';
import { AiOutlineUser } from 'react-icons/ai';

interface Props {
    projectId: number;
}

const UsersAssignmentModal = ({ projectId }: Props) => {
    const { isOpen, onOpen, onClose } = useDisclosure();
    const getAuthHeader = useAuthHeader();
    const membersQuery = useQuery(
        [`/projects/for-pm/${projectId}/members`],
        async () =>
            (
                await getResourceList<LegacyUserPublic>(
                    `/projects/for-pm/${projectId}/members`,
                    getAuthHeader()
                )
            ).data
    );
    return (
        <>
            <IconButton
                icon={<FiUsers />}
                onClick={onOpen}
                aria-label="Manage project members"
                isLoading={membersQuery.isLoading}
                disabled={membersQuery.isError || membersQuery.isLoading}
            />

            <Modal isOpen={isOpen} onClose={onClose}>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>Project members</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                        {membersQuery.isSuccess && (
                            <VStack w={'full'} alignItems={'flex-start'} pb={5}>
                                <List
                                    spacing={3}
                                    maxH={'50vh'}
                                    overflowY={'auto'}
                                >
                                    {membersQuery.data.map((member) => (
                                        <ListItem>
                                            <ListIcon as={AiOutlineUser} />{' '}
                                            {member.fullName}
                                        </ListItem>
                                    ))}
                                    {membersQuery.data.length === 0 && (
                                        <Text>No members in this project</Text>
                                    )}
                                </List>
                            </VStack>
                        )}
                    </ModalBody>
                </ModalContent>
            </Modal>
        </>
    );
};
export default UsersAssignmentModal;
