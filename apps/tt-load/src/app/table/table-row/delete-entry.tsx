import {
    AlertDialog,
    AlertDialogBody,
    AlertDialogContent,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogOverlay,
    Button,
    Icon,
    useDisclosure,
    useBoolean,
    useToast,
} from '@chakra-ui/react';
import { deleteResource } from '@gms-micro/api-utils';
import { useRef } from 'react';
import { useAuthHeader } from 'react-auth-kit';
import { AiFillDelete } from 'react-icons/ai';
import { useMutation, useQueryClient } from 'react-query';

type Props = {
    id: number;
    resetForm: () => void;
    setType: (type: 'edit' | 'create') => void;
    setSelected: (id: number | null) => void;
};

const DeleteEntry = ({ id, resetForm, setSelected, setType }: Props) => {
    const { isOpen, onOpen, onClose } = useDisclosure();
    const [loading, setLoading] = useBoolean();
    const cancelRef = useRef<any>();
    const toast = useToast();
    const queryClient = useQueryClient();
    const getAuthHeader = useAuthHeader();

    const deleteMutation = useMutation(
        () => deleteResource('timetrack', id, getAuthHeader()),
        {
            onMutate: () => {
                setLoading.on();
            },
            onSuccess: () => {
                setLoading.off();
                onClose();
                resetForm();
                setSelected(null);
                setType('create');
                queryClient.resetQueries(['owned-daily']);
                queryClient.resetQueries(['owned-weekly']);
                toast({ title: 'Entry removed', status: 'success', position: 'top', duration: 2000 });
            },
            onError: (err: any) => {
                setLoading.off();
                onClose();
                toast({
                    title: `Error removing the entry, try again later`,
                    description: err.message || err,
                    status: 'error',
                    position: 'top', 
                    duration: 2000,
                });
            },
        }
    );

    return (
        <>
            <Icon
                as={AiFillDelete}
                color={'red'}
                cursor={'pointer'}
                onClick={onOpen}
            />
            <AlertDialog
                isOpen={isOpen}
                leastDestructiveRef={cancelRef}
                onClose={onClose}
            >
                <AlertDialogOverlay>
                    <AlertDialogContent>
                        <AlertDialogHeader fontSize="lg" fontWeight="bold">
                            Remove entry
                        </AlertDialogHeader>

                        <AlertDialogBody>
                            Are you sure? You can't undo this action afterwards.
                        </AlertDialogBody>

                        <AlertDialogFooter>
                            <Button ref={cancelRef} onClick={onClose}>
                                Cancel
                            </Button>
                            <Button
                                colorScheme="red"
                                onClick={async () =>
                                    await deleteMutation.mutateAsync()
                                }
                                ml={3}
                                isLoading={loading}
                            >
                                Delete
                            </Button>
                        </AlertDialogFooter>
                    </AlertDialogContent>
                </AlertDialogOverlay>
            </AlertDialog>
        </>
    );
};

export default DeleteEntry;
