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
import EditTicket from "../createAndEdit/EditTicket";

const TicketsDetailedEditButton = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const close = () => {
    onClose();
  };

  return (
    <>
      <Button
        colorScheme={"whiteAlpha"}
        variant={"solid"}
        onClick={onOpen}
        size={"lg"}
      >
        Edit
      </Button>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent minW="60%">
          <ModalHeader fontSize="2xl" textColor="#4F968C">
            Edit Ticket
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <EditTicket close={close} />
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};

export default TicketsDetailedEditButton;
