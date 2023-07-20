import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogOverlay,
  Button,
  Link,
  Tooltip,
} from "@chakra-ui/react";
import { AiFillDelete } from "react-icons/ai";
import clienteAxios from "../../services/axios";
import { useAuthHeader } from "react-auth-kit";
import { useQueryClient } from "react-query";
import { useState } from "react";
import React from "react";

interface Props {
  id: number;
  resource: string;
}

const DeleteCell = ({ id, resource }: Props) => {
  const getAuthHeader = useAuthHeader();
  const queryClient = useQueryClient();
  const cancelRef = React.useRef<HTMLButtonElement | null>(null);

  const handleDeleteTicket = async (id: string) => {
    setIsLoading(true);
    await clienteAxios.delete(`/ticket/${id}`, {
      headers: { Authorization: getAuthHeader() },
    });
    queryClient.resetQueries("tickets");
    setIsLoading(false);
  };

  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const onClose = () => {
    setIsOpen(false);
  };

  const handleClick = () => {
    setIsOpen(true);
  };

  return (
    <Tooltip hasArrow label={"Delete"} bg={"teal.500"}>
      <>
        <Button
          colorScheme={"red"}
          variant={"ghost"}
          leftIcon={<AiFillDelete size={"1.2rem"} />}
          onClick={handleClick}
        ></Button>

        <AlertDialog
          isOpen={isOpen}
          onClose={onClose}
          leastDestructiveRef={cancelRef}
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
                  onClick={() => handleDeleteTicket(id.toString())}
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
    </Tooltip>
  );
};

export default DeleteCell;
