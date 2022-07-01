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
    useToast,
} from '@chakra-ui/react';
import { deleteResource } from '@gms-micro/api-utils';
import { clearForm } from 'apps/tt-load/src/redux/slices/timetrackSlice';
import { useRef } from 'react';
import { useAuthHeader } from 'react-auth-kit';
import { AiFillDelete } from 'react-icons/ai';
import { useMutation, useQueryClient } from 'react-query';
import { useAppDispatch } from '../../../redux/hooks';

type Props = {
    id: number;
};

const DeleteEntry = ({ id }: Props) => {
    const { isOpen, onOpen, onClose } = useDisclosure();
    const cancelRef = useRef<any>();
    const toast = useToast();
    const queryClient = useQueryClient();
    const getAuthHeader = useAuthHeader();
    const dispatch = useAppDispatch();

    const { mutateAsync: deleteItem, isLoading } = useMutation(
        () => deleteResource('timetrack', id, getAuthHeader()),
        {
            onSuccess: () => {
                onClose();
                dispatch({
                    type: clearForm,
                });
                queryClient.resetQueries(['owned-daily']);
                queryClient.resetQueries(['owned-weekly']);
                toast({
                    title: 'Entry removed',
                    status: 'success',
                    position: 'top',
                    duration: 2000,
                });
            },
            onError: (err: any) => {
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
                                onClick={() => deleteItem()}
                                ml={3}
                                isLoading={isLoading}
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
