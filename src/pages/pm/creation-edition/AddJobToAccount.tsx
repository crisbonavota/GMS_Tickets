import CreateEditJobForm from "./CreateEditJobForm";
import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalCloseButton,
    ModalBody,
} from "@chakra-ui/react";
import { Account } from '../../../api/types';

interface Props {
    isOpen: boolean;
    onOpen: () => void;
    onClose: () => void;
    predefinedAccount?: Account;
}

const AddJobToAccount = ({ isOpen, onClose, predefinedAccount }: Props) => {

    return (
        <Modal isOpen={isOpen} onClose={onClose}>
            <ModalOverlay />
            <ModalContent minW={"fit-content"}>
                <ModalHeader>Add job to {predefinedAccount?.name}</ModalHeader>
                <ModalCloseButton />
                <ModalBody w={"fit-content"} minW={"40vw"}>
                    <CreateEditJobForm onClose={onClose} predefinedAccount={predefinedAccount}  />
                </ModalBody>
            </ModalContent>
        </Modal>
    );
};

export default AddJobToAccount;