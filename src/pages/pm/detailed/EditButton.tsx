import {
  Button,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
} from "@chakra-ui/react";
import { BiPencil } from "react-icons/bi";

interface Props {
  modalBody: React.ReactNode;
  onOpen: () => void;
  onClose: () => void;
  isOpen: boolean;
}

const EditButton = ({
  modalBody,
  onOpen,
  onClose,
  isOpen,
}: Props) => {
  return (
    <>
      <Button
        colorScheme={"orange"}
        variant={"ghost"}
        leftIcon={<BiPencil size={"1.2rem"}/>}
        onClick={onOpen}
      > Edit
      </Button>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent minW={"40vw"}>
          <ModalHeader>Edit</ModalHeader>
          <ModalCloseButton />
          <ModalBody>{modalBody}</ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};
export default EditButton;
