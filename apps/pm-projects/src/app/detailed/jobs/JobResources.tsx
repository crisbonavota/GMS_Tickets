import {
    Button,
    Divider,
    Heading,
    HStack,
    Icon,
    Modal,
    ModalBody,
    ModalCloseButton,
    ModalContent,
    ModalHeader,
    ModalOverlay,
    useDisclosure,
    VStack,
    Text,
    Box,
} from '@chakra-ui/react';
import {
    getResourceList,
} from '@gms-micro/api-utils';
import { LegacyUserPublic } from '@gms-micro/auth-types';
import { useAuthHeader } from 'react-auth-kit';
import { IoExtensionPuzzle } from 'react-icons/io5';
import { useQuery } from 'react-query';
import Loading from '../../tabs/Loading';
import ResourcesTable from '../ResourcesTable';
import TableHeader from '../TableHeader';
import { FaPlus } from 'react-icons/fa';
import { GrUserSettings } from 'react-icons/gr';
import AddMember from '../../tabs/jobs/resources/AddMember';
import { AiOutlineUser } from 'react-icons/ai';
interface Props {
    id: number;
    leader: LegacyUserPublic;
}

const JobResources = ({ id, leader }: Props) => {
    const { isOpen, onClose, onOpen } = useDisclosure();
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
                <Button
                    onClick={onOpen}
                    variant={'ghost'}
                    leftIcon={<FaPlus />}
                    colorScheme={'orange'}
                >
                    Add Resources
                </Button>
                <Modal isOpen={isOpen} onClose={onClose}>
                    <ModalOverlay />
                    <ModalContent pb={3}>
                        <ModalHeader>Project resources</ModalHeader>
                        <ModalCloseButton />
                        <ModalBody>
                            <VStack w={'full'} spacing={5}>
                                <HStack>
                                    <Heading fontSize={'xl'} pe={5}>
                                        Leaded by
                                    </Heading>
                                    <Icon boxSize={'2rem'} as={GrUserSettings} />
                                    <VStack alignItems={'flex-start'}>
                                        <Text>{leader.fullName}</Text>
                                        <Text fontSize={'sm'} color={'orangered'}>
                                            {leader.email}
                                        </Text>
                                    </VStack>
                                </HStack>
                                <Divider />
                                {members?.map((m) => (
                                    <HStack key={m.id} alignItems={'center'} w={'full'}>
                                        <Icon boxSize={'2rem'} as={AiOutlineUser} />
                                        <VStack alignItems={'flex-start'} w={'full'}>
                                            <HStack alignItems={'center'} w={'full'}>
                                                <Text>{m.fullName}</Text>
                                            </HStack>
                                            <Text fontSize={'sm'} color={'orangered'}>
                                                {m.email}
                                            </Text>
                                        </VStack>
                                    </HStack>
                                ))}
                                <Divider />
                                <AddMember projectId={id} />
                            </VStack>
                        </ModalBody>
                    </ModalContent>
                </Modal>
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
