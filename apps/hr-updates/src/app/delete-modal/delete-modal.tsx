import { Button, Heading, IconButton, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, useBoolean } from '@chakra-ui/react';
import { deleteResource, getUpdateResourceFromType, Update } from '@gms-micro/api-utils';
import { AiFillDelete } from 'react-icons/ai';
import { useQueryClient, QueryClient } from 'react-query';

const onDelete = async (authHeader: string, update: Update, toggleLoading: () => void, queryClient: QueryClient) => {
    toggleLoading();
    try {
        await deleteResource(getUpdateResourceFromType(update.updateType.id), update.id, authHeader);
    }
    catch (err) {
        console.log(err);
        window.alert("Error deleting your update, try again later");
    }
    toggleLoading();
    queryClient.resetQueries(['updates']);
    queryClient.resetQueries(['updatesReport']);
}

interface DeleteModalProps {
    authHeader: string,
    update: Update
}

const DeleteModal = ({ authHeader, update }: DeleteModalProps) => {
    const [open, setOpen] = useBoolean();
    const [loading, setLoading] = useBoolean();
    const queryClient = useQueryClient();

    return (
        <>
            <IconButton onClick={setOpen.on} size={'sm'} icon={<AiFillDelete />} aria-label="Delete" colorScheme={'red'} />
            <Modal isOpen={open} onClose={setOpen.off}>
                <ModalOverlay />
                <ModalContent w={'full'}>
                    <ModalHeader>Delete update</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody w={'full'}>
                        <Heading size={'md'}>Are you sure?</Heading>
                    </ModalBody>
                    <ModalFooter w={'full'}>
                        <Button
                            colorScheme='red'
                            mr={3}
                            type={"submit"}
                            isLoading={loading}
                            onClick={() => onDelete(authHeader, update, setLoading.toggle, queryClient)}
                        >
                            Delete
                        </Button>
                        <Button variant='ghost' onClick={setOpen.off}>Cancel</Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </>
    )
}

export default DeleteModal;