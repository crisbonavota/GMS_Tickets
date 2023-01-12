import {
    Button,
    Divider,
    Heading,
    HStack,
    Icon,
    Modal,
    ModalBody,
    ModalCloseButton,
    ModalContent,
    ModalHeader,
    ModalOverlay,
    useDisclosure,
    VStack,
    Text,
} from "@chakra-ui/react";
import { GrUserSettings } from "react-icons/gr";
import { HiPuzzle } from "react-icons/hi";
import { LegacyUserPublic } from "../../../../../api/types";
import AddPermission from "./AddPermission";
import Permissions from "./Permissions";

interface Props {
    id: number;
}

const EmployeePermissions = ({ id }: Props) => {
    const { isOpen, onClose, onOpen } = useDisclosure();
    return (
        <>
            <Button
                onClick={onOpen}
                variant={"ghost"}
                leftIcon={<HiPuzzle />}
                color={"#3B8A7F"}
            >
                Permissions
            </Button>
            <Modal isOpen={isOpen} onClose={onClose}>
                <ModalOverlay />
                <ModalContent pb={3}>
                    <ModalHeader>User Permissions</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                        <VStack w={"full"} spacing={5}>
                            <Divider />
                            <Permissions id={id} />
                            <Divider />
                            <AddPermission id={id} />
                        </VStack>
                    </ModalBody>
                </ModalContent>
            </Modal>
        </>
    );
};
export default EmployeePermissions;
