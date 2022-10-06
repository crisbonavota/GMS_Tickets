import { useParams } from "react-router-dom";
import { useQuery } from "react-query";
import { useAuthHeader } from "react-auth-kit";
import { Flex, Heading, HStack, VStack, useDisclosure } from "@chakra-ui/react";
import Info from "./Info";
import TablesBox from "../TablesBox";
import ClientAccounts from "./ClientAccounts";
import ClientJobs from "./ClientJobs";
import CloneButton from "../CloneButton";
import { getResource } from "../../../../api/api";
import { Company } from "../../../../api/types";
import LoadingOverlay from "../../../../components/LoadingOverlay";
import EditButton from "../EditButton";
import CreateEditClientForm from "../../creation-edition/CreateEditClientForm";

const ClientDetailedView = () => {
    const { id } = useParams();
    const getAuthHeader = useAuthHeader();
    const { onOpen, isOpen, onClose } = useDisclosure();

    const {
        isLoading,
        data: client,
        isSuccess,
    } = useQuery(
        `client-${id}`,
        () => getResource<Company>(`companies/${id}`, getAuthHeader()),
        { select: (r) => r.data }
    );

    if (isLoading) return <LoadingOverlay />;
    if (!client || !isSuccess) return <div>Error</div>;

    return (
        <VStack w={"full"} pt={{ base: 1, md: "5rem" }}>
            <VStack
                w={{ base: "full", md: "fit-content" }}
                alignItems={"flex-start"}
                spacing={3}
                p={5}
            >
                <HStack w={"full"} justifyContent={"space-between"}>
                    <Heading>{client.name}</Heading>
                    <HStack>
                        <EditButton
                            modalBody={
                                <CreateEditClientForm
                                    onClose={onClose}
                                    editInitialValues={{
                                        ...client,
                                        countryId: client.country?.id,
                                    }}
                                    id={client.id}
                                />
                            }
                            onClose={onClose}
                            isOpen={isOpen}
                            onOpen={onOpen}
                        />
                        <CloneButton resource="companies" id={client.id} route="clients" />
                    </HStack>
                </HStack>
                <Flex
                    w={"full"}
                    justifyContent={"center"}
                    gap={10}
                    alignItems={{ base: "center", md: "flex-start" }}
                    flexDir={{ base: "column", md: "row" }}
                >
                    <Info client={client} />
                    <TablesBox w={{ base: "full", md: "50vw" }}>
                        <VStack
                            w={"full"}
                            spacing={10}
                            alignItems={"flex-start"}
                        >
                            <ClientAccounts
                                clientId={client.id}
                                company={client}
                            />
                            <ClientJobs clientId={client.id} company={client} />
                        </VStack>
                    </TablesBox>
                </Flex>
            </VStack>
        </VStack>
    );
};
export default ClientDetailedView;
