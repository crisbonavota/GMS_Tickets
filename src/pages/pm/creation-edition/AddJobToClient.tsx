import CreateEditJobForm from "./CreateEditJobForm";
import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalCloseButton,
    ModalBody,
} from "@chakra-ui/react";
import { Company } from '../../../api/types';

interface Props {
    isOpen: boolean;
    onOpen: () => void;
    onClose: () => void;
    predefinedClient?: Company;
}

const AddJobToClient = ({ isOpen, onClose, predefinedClient }: Props) => {

    return (
        <Modal isOpen={isOpen} onClose={onClose}>
            <ModalOverlay />
            <ModalContent minW={"fit-content"}>
                <ModalHeader>Add job to {predefinedClient?.name}</ModalHeader>
                <ModalCloseButton />
                <ModalBody w={"fit-content"} minW={"40vw"}>
                    <CreateEditJobForm onClose={onClose} predefinedClient={predefinedClient} />
                </ModalBody>
            </ModalContent>
        </Modal>
    );
};

export default AddJobToClient;