import {
    Button,
    Modal,
    ModalBody,
    ModalCloseButton,
    ModalContent,
    ModalHeader,
    ModalOverlay,
} from "@chakra-ui/react";
import { BiPencil } from "react-icons/bi";

interface Props {
    modalBody: React.ReactNode;
    onOpen: () => void;
    onClose: () => void;
    isOpen: boolean;
    colour?: string;
    variant?: string;
    size?: string;
}

const EditButton = ({ modalBody, onOpen, onClose, isOpen, colour, variant, size }: Props) => {
    return (
        <>
            <Button
                colorScheme={colour ? colour : "orange"}
                variant={variant ? variant : "ghost"}
                leftIcon={<BiPencil />}
                onClick={onOpen}
                size={size}
            >
                Edit
            </Button>
            <Modal isOpen={isOpen} onClose={onClose}>
                <ModalOverlay />
                <ModalContent minW={"40vw"}>
                    <ModalHeader>Edit</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>{modalBody}</ModalBody>
                </ModalContent>
            </Modal>
        </>
    );
};
export default EditButton;
