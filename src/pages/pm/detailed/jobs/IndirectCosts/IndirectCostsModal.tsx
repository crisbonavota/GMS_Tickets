import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalCloseButton,
    ModalBody,
    useDisclosure,
    Button,
    VStack,
} from "@chakra-ui/react";
import { BsCurrencyExchange } from "react-icons/bs";
import { useAuthHeader } from "react-auth-kit";
import { useQuery } from "react-query";
import { getResourceList } from "../../../../../api/api";
import { IndirectCost } from "../../../../../api/types";
import IndirectCostsTable from "./IndirectCostsTable";
import AddIndirectCost from "./AddIndirectCost";
import { Center, Spinner } from "@chakra-ui/react";

interface Props {
    projectId: number;
}

const IndirectCostsModal = ({ projectId }: Props) => {
    const { isOpen, onOpen, onClose } = useDisclosure();
    const getAuthHeader = useAuthHeader();

    const {
        data: indirectCosts,
        isLoading,
        isSuccess,
    } = useQuery(
        ["indirect-costs", projectId],
        () =>
            getResourceList<IndirectCost>(
                `indirectCosts/by-project/${projectId}`,
                getAuthHeader()
            ),
        {
            select: (r) => r.data,
        }
    );

    return (
        <>
            <Button
                colorScheme={"orange"}
                variant={"ghost"}
                leftIcon={<BsCurrencyExchange />}
                onClick={onOpen}
            >
                Indirect costs
            </Button>
            <Modal
                isOpen={isOpen}
                onClose={onClose}
                size={{ base: undefined, md: "2xl" }}
            >
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>Indirect Costs</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                        <VStack alignItems={"flex-end"}>
                            {isLoading && (
                                <Center w="full">
                                    <Spinner />
                                </Center>
                            )}
                            {isSuccess && (
                                <IndirectCostsTable
                                    indirectCosts={indirectCosts}
                                />
                            )}
                            <AddIndirectCost projectId={projectId} />
                        </VStack>
                    </ModalBody>
                </ModalContent>
            </Modal>
        </>
    );
};

export default IndirectCostsModal;
