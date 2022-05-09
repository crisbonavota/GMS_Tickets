import { Button, Heading, IconButton, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, useBoolean, useToast } from '@chakra-ui/react';
import { deleteResource, getUpdateResourceFromType, Update } from '@gms-micro/api-utils';
import { AiFillDelete } from 'react-icons/ai';
import { useQueryClient, useMutation } from 'react-query';
import { useMemo } from 'react';



interface DeleteModalProps {
    authHeader: string,
    update: Update
}

const DeleteModal = ({ authHeader, update }: DeleteModalProps) => {
    const [open, setOpen] = useBoolean();
    const [loading, setLoading] = useBoolean();
    const queryClient = useQueryClient();
    const toast = useToast();

    const deleteUpdateMutation = useMutation(async () => await deleteResource(
        getUpdateResourceFromType(update.updateType.id),
        update.id,
        authHeader,
    ), {
        onMutate: async () => {
            await queryClient.cancelQueries(['updates']);
            await queryClient.cancelQueries(['updatesReport']);
        },
        onSuccess: () => {
            queryClient.resetQueries(['updates']);
            queryClient.resetQueries(['updatesReport']);
            toast({ title: "Element deleted", status: "success" });
        },
        onError: (err: any) => {
            toast({ title: "Error deleting the element, try again later", description: err.message || err, status: "error" });
        }
    });

    const onDelete = useMemo(() => async () => {
        setLoading.on();
        await deleteUpdateMutation.mutateAsync();
        queryClient.resetQueries(['updates']);
        queryClient.resetQueries(['updatesReport']);
        setOpen.off();
        setLoading.off();
    }, [update]);

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
                            onClick={onDelete}
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