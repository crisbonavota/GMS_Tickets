import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalCloseButton,
    ModalBody,
} from '@chakra-ui/react';
import CreateClientForm from './CreateClientForm';

interface Props {
    isOpen: boolean;
    onOpen: () => void;
    onClose: () => void;
}

const CreateClientModal = ({ isOpen, onOpen, onClose }: Props) => {
    return (
        <Modal isOpen={isOpen} onClose={onClose}>
            <ModalOverlay />
            <ModalContent minW={'fit-content'}>
                <ModalHeader>Create client</ModalHeader>
                <ModalCloseButton />
                <ModalBody w={'fit-content'} minW={'40vw'}>
                    <CreateClientForm onClose={onClose} />
                </ModalBody>
            </ModalContent>
        </Modal>
    );
};

export default CreateClientModal;
