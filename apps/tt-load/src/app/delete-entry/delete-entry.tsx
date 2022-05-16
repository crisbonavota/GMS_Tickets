import { 
    AlertDialog, 
    AlertDialogBody, 
    AlertDialogContent, 
    AlertDialogFooter, 
    AlertDialogHeader, 
    AlertDialogOverlay, 
    Button, 
    HStack, 
    Icon, 
    Text, 
    useDisclosure, 
    useBoolean, 
    useToast 
} from '@chakra-ui/react';
import { deleteResource } from '@gms-micro/api-utils';
import { useRef } from 'react';
import { useAuthHeader } from 'react-auth-kit';
import { BsTrash } from 'react-icons/bs'
import { useMutation, useQueryClient } from 'react-query';

type Props = {
    selected: number,
    resetForm: () => void
}

const DeleteEntry = ({ selected, resetForm }: Props) => {
    const { isOpen, onOpen, onClose } = useDisclosure();
    const [loading, setLoading] = useBoolean();
    const cancelRef = useRef<any>();
    const toast = useToast();
    const queryClient = useQueryClient();
    const getAuthHeader = useAuthHeader();

    const deleteMutation = useMutation(() => deleteResource("timetrack", selected, getAuthHeader()), {
        onMutate: () => {
            setLoading.on();
        },
        onSuccess: () => {
            setLoading.off();
            onClose();
            queryClient.resetQueries(['owned-daily']);
            queryClient.resetQueries(['owned-weekly']);
            resetForm();
            toast({ title: "Entry removed", status: "success" });
        },
        onError: (err: any) => {
            setLoading.off();
            onClose();
            toast({
                title: `Error removing the entry, try again later`,
                description: err.message || err,
                status: "error"
            });
        }
    });

    return (
        <>
            <HStack color={'red'} cursor={'pointer'} onClick={onOpen}>
                <Icon as={BsTrash} />
                <Text>Remove entry</Text>
            </HStack>
            <AlertDialog
                isOpen={isOpen}
                leastDestructiveRef={cancelRef}
                onClose={onClose}
            >
                <AlertDialogOverlay>
                    <AlertDialogContent>
                        <AlertDialogHeader fontSize='lg' fontWeight='bold'>
                            Remove entry
                        </AlertDialogHeader>

                        <AlertDialogBody>
                            Are you sure? You can't undo this action afterwards.
                        </AlertDialogBody>

                        <AlertDialogFooter>
                            <Button ref={cancelRef} onClick={onClose}>
                                Cancel
                            </Button>
                            <Button colorScheme='red' onClick={() => deleteMutation.mutate()} ml={3} isLoading={loading}>
                                Delete
                            </Button>
                        </AlertDialogFooter>
                    </AlertDialogContent>
                </AlertDialogOverlay>
            </AlertDialog>
        </>
    )
}

export default DeleteEntry
