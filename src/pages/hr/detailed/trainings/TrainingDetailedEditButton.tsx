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
import { Training } from "../../../../api/types";
import CreateEditTrainingForm from "../../creation-edition/CreateEditTrainingForm";

interface Props {
  training: Training;
}

const TrainingDetailedEditButton = ({ training }: Props) => {
  const { isOpen, onOpen, onClose } = useDisclosure();

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
        <ModalContent minW={"40vw"}>
          <ModalHeader>Edit</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <CreateEditTrainingForm
              onClose={onClose}
              id={training.id}
              editInitialValues={training}
            />
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};

export default TrainingDetailedEditButton;