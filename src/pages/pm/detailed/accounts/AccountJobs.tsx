import { Box, HStack, VStack } from "@chakra-ui/react";
import { useState } from "react";
import { useAuthHeader } from "react-auth-kit";
import { BsFillBriefcaseFill } from "react-icons/bs";
import { useQuery } from "react-query";
import { getResourceListFilteredAndPaginated } from "../../../../api/api";
import { Project } from "../../../../api/types";
import Loading from "../../tabs/Loading";
import AddButton from "../AddButton";
import JobsTable from "../JobsTable";
import TableHeader from "../TableHeader";

interface Props {
    accountId: number;
}

const AccountJobs = ({ accountId }: Props) => {
    const [page, setPage] = useState(0);
    const getAuthHeader = useAuthHeader();
    const {
        isLoading,
        data: axiosRes,
        isSuccess,
    } = useQuery(["projects", accountId, page], () =>
        getResourceListFilteredAndPaginated<Project>(
            "projects",
            getAuthHeader(),
            [{ field: "proposal.accountId", value: accountId }],
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
                <AddButton label="job" />
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

export default AccountJobs;
