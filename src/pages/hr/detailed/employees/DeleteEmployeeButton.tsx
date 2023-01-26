import { useRef } from "react";
import { useAuthHeader } from "react-auth-kit";
import { useDisclosure } from "@chakra-ui/react";
import { Employee } from "../../../../api/types";
import { AiOutlineDelete } from "react-icons/ai";
import { useMutation, useQueryClient } from "react-query";
import { patchResource } from "../../../../api/api";
import {
    Button,
    AlertDialog,
    AlertDialogBody,
    AlertDialogContent,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogOverlay,
    useToast,
} from "@chakra-ui/react";

interface Props {
    employee: Employee;
}

const DeleteEmployeeButton = ({ employee }: Props) => {
    const { isOpen, onOpen, onClose } = useDisclosure();
    const cancelRef = useRef<any>();
    const getAuthHeader = useAuthHeader();
    const queryClient = useQueryClient();
    const toast = useToast();

    const newEmployeeState = {
        ...employee,
        active: false,
    };

    const { mutateAsync: editEmployeeState } = useMutation(
        () =>
            patchResource(
                "employees",
                employee.id,
                getAuthHeader(),
                employee,
                newEmployeeState
            ),
        {
            onSuccess: () => {
                onClose();
                queryClient.resetQueries("employees");
                toast({
                    title: "Employee deleted",
                    status: "success",
                    position: "top",
                    duration: 2000,
                });
            },
            onError: (err: any) => {
                onClose();
                toast({
                    title: `Error deleting, try again later`,
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
            <Button
                colorScheme={"orange"}
                variant={"ghost"}
                leftIcon={<AiOutlineDelete size={"1.5rem"} />}
                onClick={onOpen}
            >
                {" "}
                Delete
            </Button>
            <AlertDialog
                isOpen={isOpen}
                leastDestructiveRef={cancelRef}
                onClose={onClose}
            >
                <AlertDialogOverlay>
                    <AlertDialogContent>
                        <AlertDialogHeader fontSize="lg" fontWeight="bold">
                            Delete Employee
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
                                onClick={() => editEmployeeState()}
                                ml={3}
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

export default DeleteEmployeeButton;
