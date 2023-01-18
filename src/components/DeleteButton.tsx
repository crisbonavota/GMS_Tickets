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
} from "@chakra-ui/react";
import { useRef } from "react";
import { useAuthHeader } from "react-auth-kit";
import { AiFillDelete } from "react-icons/ai";
import { useMutation, useQueryClient } from "react-query";
import { deleteResource } from "../api/api";

type Props = {
    id: number;
    resetQueries?: string[] | string;
    resource: string;
};

const DeleteButton = ({ id, resetQueries, resource }: Props) => {
    const { isOpen, onOpen, onClose } = useDisclosure();
    const cancelRef = useRef<any>();
    const toast = useToast();
    const queryClient = useQueryClient();
    const getAuthHeader = useAuthHeader();

    const { mutateAsync: deleteItem, isLoading } = useMutation(
        () => deleteResource(resource, id, getAuthHeader()),
        {
            onSuccess: () => {
                if (resetQueries) queryClient.resetQueries(resetQueries);
                toast({
                    title: "Deleted entry",
                    status: "success",
                    position: "top",
                    duration: 2000,
                });
                onClose();
            },
            onError: (err: any) => {
                toast({
                    title: `Error deleting the entry, try again later`,
                    description: err.message || err,
                    status: "error",
                    position: "top",
                    duration: 2000,
                });
            },
        }
    );

    return (
        <>
            <Icon
                as={AiFillDelete}
                color={"red"}
                cursor={"pointer"}
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

export default DeleteButton;
