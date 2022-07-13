import {
    Button,
    Divider,
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
import AddMember from './AddMember';
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
                        <VStack w={'full'} spacing={5}>
                            <Members id={id} />
                            <Divider />
                            <AddMember projectId={id} />
                        </VStack>
                    </ModalBody>
                </ModalContent>
            </Modal>
        </>
    );
};
export default JobResources;
