import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalCloseButton,
    ModalBody,
} from "@chakra-ui/react";
import { Company } from "../../../api/types";
import CreateEditAccountForm from "./CreateEditAccountForm";

interface Props {
    isOpen: boolean;
    onOpen: () => void;
    onClose: () => void;
    predefinedClient?: Company;
}

const AddAccountToClient = ({ isOpen, onOpen, onClose, predefinedClient }: Props) => {
    return (
        <Modal isOpen={isOpen} onClose={onClose}>
            <ModalOverlay />
            <ModalContent minW={"fit-content"}>
                <ModalHeader>Add account to {predefinedClient?.name}</ModalHeader>
                <ModalCloseButton />
                <ModalBody w={"fit-content"} minW={"40vw"}>
                    <CreateEditAccountForm onClose={onClose} predefinedClient={predefinedClient}/>
                </ModalBody>
            </ModalContent>
        </Modal>
    );
};

export default AddAccountToClient;