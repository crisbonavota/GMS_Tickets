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
import { Provider } from "../../../api/types";
import CreateEditProviderForm from "../creation-edition/CreateEditProviderForm";

interface Props {
  provider: Provider;
}

const ProviderDetailedEditButton = ({ provider }: Props) => {
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
            <CreateEditProviderForm
              onClose={onClose}
              id={provider.id}
              editInitialValues={provider}
            />
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};

export default ProviderDetailedEditButton;