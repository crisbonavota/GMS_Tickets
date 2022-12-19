import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalCloseButton,
    ModalBody,
} from "@chakra-ui/react";
import CreateEditEmployeeForm from "./CreateEditEmployeeForm";

interface Props {
    isOpen: boolean;
    onOpen: () => void;
    onClose: () => void;
}

const CreateEmployeeModal = ({ isOpen, onClose }: Props) => {
    return (
        <Modal isOpen={isOpen} onClose={onClose}>
            <ModalOverlay />
            <ModalContent minW={"fit-content"}>
                <ModalHeader>Create employee</ModalHeader>
                <ModalCloseButton />
                <ModalBody w={"fit-content"} minW={"40vw"}>
                    <CreateEditEmployeeForm onClose={onClose} />
                </ModalBody>
            </ModalContent>
        </Modal>
    );
};

export default CreateEmployeeModal;
