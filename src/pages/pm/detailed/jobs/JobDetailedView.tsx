import { useParams } from "react-router-dom";
import { useQuery } from "react-query";
import { useAuthHeader } from "react-auth-kit";
import { Flex, Heading, HStack, VStack } from "@chakra-ui/react";
import Info from "./Info";
import TablesBox from "../TablesBox";
import CloneButton from "../CloneButton";
import JobResources from "./JobResources";
import { getResource } from "../../../../api/api";
import { Project } from "../../../../api/types";
import LoadingOverlay from "../../../../components/LoadingOverlay";

const JobDetailedView = () => {
    const { id } = useParams();
    const getAuthHeader = useAuthHeader();

    const {
        isLoading,
        data: job,
        isSuccess,
    } = useQuery(
        `project-${id}`,
        () => getResource<Project>(`Projects/${id}`, getAuthHeader()),
        { select: (r) => r.data }
    );

    if (isLoading) return <LoadingOverlay />;
    if (!job || !isSuccess) return <div>Error</div>;

    return (
        <VStack w={"full"} pt={{ base: 1, md: "5rem" }}>
            <VStack
                w={{ base: "full", md: "fit-content" }}
                alignItems={"flex-start"}
                spacing={3}
                p={5}
            >
                <HStack w={"full"} justifyContent={"space-between"}>
                    <Heading>{job.name}</Heading>
                    <CloneButton />
                </HStack>
                <Flex
                    w={"full"}
                    justifyContent={"center"}
                    gap={10}
                    alignItems={{ base: "center", md: "flex-start" }}
                    flexDir={{ base: "column", md: "row" }}
                >
                    <Info job={job} />
                    <TablesBox w={{ base: "full", md: "50vw" }}>
                        <VStack
                            w={"full"}
                            spacing={10}
                            alignItems={"flex-start"}
                        >
                            <JobResources
                                id={job.id}
                                leader={job.leaderLegacyUser}
                            />
                        </VStack>
                    </TablesBox>
                </Flex>
            </VStack>
        </VStack>
    );
};
export default JobDetailedView;
