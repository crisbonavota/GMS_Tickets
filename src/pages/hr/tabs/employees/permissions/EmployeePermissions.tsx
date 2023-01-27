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
} from "@chakra-ui/react";
import { BsPuzzle } from "react-icons/bs";
import { GroupLegacyUser } from "../../../../../api/types";
import AddPermission from "./AddPermission";
import Permissions from "./Permissions";

interface Props {
    group: GroupLegacyUser
}

const EmployeePermissions = ({ group }: Props) => {
    const { isOpen, onClose, onOpen } = useDisclosure();
    return (
        <>
            <Button
                colorScheme={"orange"}
                variant={"ghost"}
                leftIcon={<BsPuzzle size={"1.2rem"}/>}
                onClick={onOpen}
            > Permissions
            </Button>
            <Modal isOpen={isOpen} onClose={onClose}>
                <ModalOverlay />
                <ModalContent pb={3}>
                    <ModalHeader>User Permissions</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                        <VStack w={"full"} spacing={5}>
                            <Divider />
                            <Permissions legacyUserId={group.legacyUser.id} />
                            <Divider />
                            <AddPermission legacyUserId={group.legacyUser.id} />
                        </VStack>
                    </ModalBody>
                </ModalContent>
            </Modal>
        </>
    );
};
export default EmployeePermissions;
