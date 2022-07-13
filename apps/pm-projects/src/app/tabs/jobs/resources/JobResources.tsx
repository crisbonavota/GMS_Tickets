import {
    Button,
    Modal,
    ModalBody,
    ModalCloseButton,
    ModalContent,
    ModalHeader,
    ModalOverlay,
    useDisclosure,
    VStack,
} from '@chakra-ui/react';
import { HiPuzzle } from 'react-icons/hi';
import Members from './Members';

interface Props {
    id: number;
}

const JobResources = ({ id }: Props) => {
    const { isOpen, onClose, onOpen } = useDisclosure();
    return (
        <>
            <Button
                onClick={onOpen}
                variant={'ghost'}
                leftIcon={<HiPuzzle />}
                color={'#3B8A7F'}
            >
                Resources
            </Button>
            <Modal isOpen={isOpen} onClose={onClose}>
                <ModalOverlay />
                <ModalContent pb={3}>
                    <ModalHeader>Project resources</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                        <VStack w={'full'}>
                            <Members id={id} />
                        </VStack>
                    </ModalBody>
                </ModalContent>
            </Modal>
        </>
    );
};
export default JobResources;
