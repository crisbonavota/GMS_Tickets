import { Box, HStack, VStack, useDisclosure } from "@chakra-ui/react";
import { useState } from "react";
import { useAuthHeader } from "react-auth-kit";
import { BsFillBriefcaseFill } from "react-icons/bs";
import { useQuery } from "react-query";
import { getResourceListFilteredAndPaginated } from "../../../../api/api";
import { Account, Project } from "../../../../api/types";
import Loading from "../../tabs/Loading";
import AddButton from "../AddButton";
import JobsTable from "../JobsTable";
import TableHeader from "../TableHeader";
import AddJobToAccount from "../../creation-edition/AddJobToAccount";

interface Props {
    accountId: number;
    account: Account;
}

const AccountJobs = ({ accountId, account }: Props) => {
    const [page, setPage] = useState(0);
    const { isOpen, onOpen, onClose } = useDisclosure();
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
                <AddButton label="job" onOpen={onOpen} />
                <AddJobToAccount isOpen={isOpen} onOpen={onOpen} onClose={onClose} predefinedAccount={isSuccess && account ? account : undefined} />
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
