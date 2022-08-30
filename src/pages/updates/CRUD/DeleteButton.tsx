import {
    Button,
    Heading,
    IconButton,
    Modal,
    ModalBody,
    ModalCloseButton,
    ModalContent,
    ModalFooter,
    ModalHeader,
    ModalOverlay,
    useBoolean,
    useToast,
} from "@chakra-ui/react";
import { AiFillDelete } from "react-icons/ai";
import { useQueryClient, useMutation } from "react-query";
import { useMemo } from "react";
import { useAuthHeader } from "react-auth-kit";
import { deleteResource, getUpdateResourceFromType } from "../../../api/api";
import { Update } from "../../../api/types";

interface DeleteModalProps {
    update: Update;
}

const DeleteButton = ({ update }: DeleteModalProps) => {
    const [open, setOpen] = useBoolean();
    const queryClient = useQueryClient();
    const toast = useToast();
    const getAuthHeader = useAuthHeader();

    const deleteUpdateMutation = useMutation(
        async () =>
            await deleteResource(
                getUpdateResourceFromType(update.updateType.id),
                update.id,
                getAuthHeader()
            ),
        {
            onMutate: async () => {
                await queryClient.cancelQueries(["updates"]);
                await queryClient.cancelQueries(["updatesReport"]);
            },
            onSuccess: () => {
                queryClient.resetQueries(["updates"]);
                queryClient.resetQueries(["updatesReport"]);
                toast({
                    title: "Element deleted",
                    status: "success",
                    position: "top",
                    duration: 2000,
                });
            },
            onError: (err: any) => {
                toast({
                    title: "Error deleting the element, try again later",
                    description: err.message || err,
                    status: "error",
                    position: "top",
                    duration: 2000,
                });
            },
        }
    );

    const onDelete = useMemo(
        () => async () => {
            await deleteUpdateMutation.mutateAsync();
            queryClient.resetQueries(["updates"]);
            queryClient.resetQueries(["updatesReport"]);
            setOpen.off();
        },
        [update]
    );

    return (
        <>
            <IconButton
                onClick={setOpen.on}
                size={"sm"}
                icon={<AiFillDelete />}
                aria-label="Delete"
                colorScheme={"red"}
            />
            <Modal isOpen={open} onClose={setOpen.off}>
                <ModalOverlay />
                <ModalContent w={"full"}>
                    <ModalHeader>Delete update</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody w={"full"}>
                        <Heading size={"md"}>Are you sure?</Heading>
                    </ModalBody>
                    <ModalFooter w={"full"}>
                        <Button
                            colorScheme="red"
                            mr={3}
                            type={"submit"}
                            isLoading={deleteUpdateMutation.isLoading}
                            onClick={onDelete}
                        >
                            Delete
                        </Button>
                        <Button variant="ghost" onClick={setOpen.off}>
                            Cancel
                        </Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </>
    );
};

export default DeleteButton;
