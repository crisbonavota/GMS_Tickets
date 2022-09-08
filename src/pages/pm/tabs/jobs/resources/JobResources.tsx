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
import AddMember from "./AddMember";
import Members from "./Members";

interface Props {
    id: number;
    leader: LegacyUserPublic;
}

const JobResources = ({ id, leader }: Props) => {
    const { isOpen, onClose, onOpen } = useDisclosure();
    return (
        <>
            <Button
                onClick={onOpen}
                variant={"ghost"}
                leftIcon={<HiPuzzle />}
                color={"#3B8A7F"}
            >
                Resources
            </Button>
            <Modal isOpen={isOpen} onClose={onClose}>
                <ModalOverlay />
                <ModalContent pb={3}>
                    <ModalHeader>Project resources</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                        <VStack w={"full"} spacing={5}>
                            <HStack>
                                <Heading fontSize={"xl"} pe={5}>
                                    Leaded by
                                </Heading>
                                <Icon boxSize={"2rem"} as={GrUserSettings} />
                                <VStack alignItems={"flex-start"}>
                                    <Text>{leader.fullName}</Text>
                                    <Text fontSize={"sm"} color={"orangered"}>
                                        {leader.email}
                                    </Text>
                                </VStack>
                            </HStack>
                            <Divider />
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
