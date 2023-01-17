import {
    Button,
    Center,
    HStack,
    Heading,
    Modal,
    ModalBody,
    ModalCloseButton,
    ModalContent,
    ModalHeader,
    ModalOverlay,
    Spinner,
    Switch,
    VStack,
    useDisclosure,
} from "@chakra-ui/react";
import { GoGraph } from "react-icons/go";
import { useQuery } from "react-query";
import { useAuthHeader } from "react-auth-kit";
import { getResource } from "../../../../../api/api";
import { ProjectRevenueValues } from "../../../../../api/types";
import RevenueCalculationsChart from "./RevenueCalculationsChart";
import { Flex } from "@chakra-ui/react";
import { useState } from "react";

interface Props {
    projectId: number;
}

const RevenueCalculationsModal = ({ projectId }: Props) => {
    const { isOpen, onOpen, onClose } = useDisclosure();
    const getAuthHeader = useAuthHeader();
    const [withStructureCosts, setWithStructureCosts] = useState(true);

    const {
        isSuccess,
        isLoading,
        data: projectRevenueValues,
    } = useQuery(
        ["revenue", projectId, withStructureCosts],
        () =>
            getResource<ProjectRevenueValues>(
                `projects/${projectId}/revenue?withStructureCosts=${withStructureCosts}`,
                getAuthHeader()
            ),
        { select: (r) => r.data }
    );

    return (
        <>
            <Button
                colorScheme={"orange"}
                variant={"ghost"}
                leftIcon={<GoGraph />}
                onClick={onOpen}
            >
                Revenue/costs
            </Button>
            <Modal
                isOpen={isOpen}
                onClose={onClose}
                size={{ base: undefined, md: "2xl" }}
            >
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>
                        <Flex
                            w="full"
                            justifyContent="space-between"
                            pe={10}
                            flexDir={{ base: "column", md: "row" }}
                            gap={5}
                        >
                            <Heading fontSize={"inherit"}>
                                Job revenue/costs (USD)
                            </Heading>
                            <Switch
                                size={"sm"}
                                fontSize={"md"}
                                colorScheme={"orange"}
                                isChecked={withStructureCosts}
                                onChange={(e) =>
                                    setWithStructureCosts(e.target.checked)
                                }
                            >
                                Structure costs
                            </Switch>
                        </Flex>
                    </ModalHeader>
                    <ModalCloseButton />
                    <ModalBody pb={5}>
                        <VStack alignItems={"flex-end"}>
                            {isLoading && (
                                <Center w="full">
                                    <Spinner />
                                </Center>
                            )}
                            {isSuccess && (
                                <RevenueCalculationsChart
                                    revenueValues={projectRevenueValues}
                                />
                            )}
                        </VStack>
                    </ModalBody>
                </ModalContent>
            </Modal>
        </>
    );
};

export default RevenueCalculationsModal;
