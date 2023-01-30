import {
    Box,
    Button,
    Modal,
    ModalBody,
    ModalCloseButton,
    ModalContent,
    ModalHeader,
    ModalOverlay,
    Tooltip,
} from "@chakra-ui/react";
import { BiPencil } from "react-icons/bi";

interface Props {
    modalBody: React.ReactNode;
    onOpen: () => void;
    onClose: () => void;
    isOpen: boolean;
}

const EditButton = ({ modalBody, onOpen, onClose, isOpen }: Props) => {
    return (
        <Box>
            <Tooltip hasArrow label={"Edit"} bg={"teal.500"}>
                <Button
                    colorScheme={"orange"}
                    variant={"ghost"}
                    leftIcon={<BiPencil size={"1.2rem"} />}
                    onClick={onOpen}
                ></Button>
            </Tooltip>
            <Modal isOpen={isOpen} onClose={onClose}>
                <ModalOverlay />
                <ModalContent minW={"40vw"}>
                    <ModalHeader>Edit</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>{modalBody}</ModalBody>
                </ModalContent>
            </Modal>
        </Box>
    );
};
export default EditButton;
