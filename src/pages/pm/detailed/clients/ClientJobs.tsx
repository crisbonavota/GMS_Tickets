import { Box, HStack, useDisclosure, VStack } from "@chakra-ui/react";
import { useState } from "react";
import { useAuthHeader } from "react-auth-kit";
import { BsFillBriefcaseFill } from "react-icons/bs";
import { useQuery } from "react-query";
import { getResourceListFilteredAndPaginated } from "../../../../api/api";
import { Company, Project } from "../../../../api/types";
import AddJobToClient from "../../creation-edition/AddJobToClient";
import CreateJobModal from "../../creation-edition/CreateJobModal";
import Loading from "../../tabs/Loading";
import AddButton from "../AddButton";
import JobsTable from "../JobsTable";
import TableHeader from "../TableHeader";

interface Props {
    clientId: number;
    company: Company;
}

const ClientJobs = ({ clientId, company }: Props) => {
    const [page, setPage] = useState(0);
    const { isOpen, onOpen, onClose } = useDisclosure();
    const getAuthHeader = useAuthHeader();
    const {
        isLoading,
        data: axiosRes,
        isSuccess,
    } = useQuery(["projects", clientId, page], () =>
        getResourceListFilteredAndPaginated<Project>(
            "projects",
            getAuthHeader(),
            [{ field: "proposal.account.companyId", value: clientId }],
            [],
            { field: "name", isAscending: true },
            page,
            5
        )
    );

    const jobs = axiosRes?.data;

    if (isLoading)
        return (
            <Box minW={"30vw"}>
                <Loading />
            </Box>
        );

    return (
        <VStack alignItems={"flex-start"} spacing={0} w={"full"}>
            <HStack
                w={"full"}
                justifyContent={"space-between"}
                alignItems={"flex-end"}
            >
                <TableHeader label="Jobs" icon={BsFillBriefcaseFill} />
                <AddButton label="job" onOpen={onOpen} />
                <CreateJobModal isOpen={isOpen} onOpen={onOpen} onClose={onClose} />
                <AddJobToClient isOpen={isOpen} onOpen={onOpen} onClose={onClose} predefinedClient={isSuccess && company ? company : undefined} />
            </HStack>
            {isSuccess && jobs && (
                <JobsTable
                    jobs={jobs}
                    totalPages={parseInt(axiosRes.headers["pages-amount"])}
                    page={page}
                    setPage={setPage}
                />
            )}
        </VStack>
    );
};

export default ClientJobs;
