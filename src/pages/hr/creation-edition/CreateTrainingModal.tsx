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

const CreateTrainingModal = ({ isOpen, onClose }: Props) => {
    return (
        <Modal isOpen={isOpen} onClose={onClose}>
            <ModalOverlay />
            <ModalContent minW={"fit-content"}>
                <ModalHeader color={"#448F85"}>Create Training</ModalHeader>
                <ModalCloseButton />
                <ModalBody w={"fit-content"} minW={"40vw"}>
                    {/* <CreateEditProviderForm onClose={onClose} /> */}
                    holis
                </ModalBody>
            </ModalContent>
        </Modal>
    );
};

export default CreateTrainingModal;
