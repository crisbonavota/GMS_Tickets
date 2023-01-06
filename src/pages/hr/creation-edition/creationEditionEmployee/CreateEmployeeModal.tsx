import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalCloseButton,
    ModalBody,
} from "@chakra-ui/react";
import CreateEmployeeTabsView from "./CreateEmployeeTabsView"

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
                <ModalHeader color={"#448F85"}>Create employee</ModalHeader>
                <ModalCloseButton/>
                <ModalBody w={"fit-content"} maxW={"44vw"}>
                    <CreateEmployeeTabsView onClose={onClose} />
                </ModalBody>
            </ModalContent>
        </Modal>
    );
};

export default CreateEmployeeModal;
