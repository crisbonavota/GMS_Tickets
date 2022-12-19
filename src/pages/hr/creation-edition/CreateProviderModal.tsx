import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalCloseButton,
    ModalBody,
} from "@chakra-ui/react";
import CreateEditProviderForm from "./CreateEditProviderForm";

interface Props {
    isOpen: boolean;
    onOpen: () => void;
    onClose: () => void;
}

const CreateProviderModal = ({ isOpen, onClose }: Props) => {
    return (
        <Modal isOpen={isOpen} onClose={onClose}>
            <ModalOverlay />
            <ModalContent minW={"fit-content"}>
                <ModalHeader>Create job</ModalHeader>
                <ModalCloseButton />
                <ModalBody w={"fit-content"} minW={"40vw"}>
                    <CreateEditProviderForm onClose={onClose} />
                </ModalBody>
            </ModalContent>
        </Modal>
    );
};

export default CreateProviderModal;
