import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalCloseButton,
    ModalBody,
} from "@chakra-ui/react";
import CreateEditBusinessUnitForm from "./CreateEditBusinessUnitForm";

interface Props {
    isOpen: boolean;
    onOpen: () => void;
    onClose: () => void;
}

const CreateBusinessUnitModal = ({ isOpen, onClose }: Props) => {
    return (
        <Modal isOpen={isOpen} onClose={onClose}>
            <ModalOverlay />
            <ModalContent minW={"fit-content"}>
                <ModalHeader>Create business unit</ModalHeader>
                <ModalCloseButton />
                <ModalBody w={"fit-content"} minW={"40vw"}>
                    <CreateEditBusinessUnitForm onClose={onClose} />
                </ModalBody>
            </ModalContent>
        </Modal>
    );
};

export default CreateBusinessUnitModal;
