import { useDisclosure } from "@chakra-ui/react";
import {
  Button,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
} from "@chakra-ui/react";
import { Provider, TicketView } from "../../../api/types";
import CreateTicket from "../createAndEdit/CreateTicket";

const TicketsAddNewButton = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const close = () => {
    onClose();
  };

  return (
    <>
      <Button
        colorScheme="orange"
        px={10}
        w={{ base: "full", md: "fit-content" }}
        onClick={onOpen}
      >
        ADD NEW
      </Button>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent minW="60%">
          <ModalHeader fontSize="2xl" textColor="#4F968C">
            Create Ticket
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <CreateTicket close={close} />
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};

export default TicketsAddNewButton;
