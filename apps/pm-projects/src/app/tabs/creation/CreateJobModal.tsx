import CreateJobForm from './CreateJobForm';
import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalCloseButton,
    ModalBody,
} from '@chakra-ui/react';

interface Props {
    isOpen: boolean;
    onOpen: () => void;
    onClose: () => void;
}

const CreateJobModal = ({ isOpen, onOpen, onClose }: Props) => {
    return (
        <Modal isOpen={isOpen} onClose={onClose}>
            <ModalOverlay />
            <ModalContent minW={'fit-content'}>
                <ModalHeader>Create job</ModalHeader>
                <ModalCloseButton />
                <ModalBody w={'fit-content'} minW={'40vw'}>
                    <CreateJobForm onClose={onClose} />
                </ModalBody>
            </ModalContent>
        </Modal>
    );
};

export default CreateJobModal;
