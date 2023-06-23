import { useQuery } from "react-query";
import { useAuthHeader } from "react-auth-kit";
import { Flex, VStack } from "@chakra-ui/react";
import TabHeader from "./../TabHeader";
import { useCallback } from "react";
import { BsFillBriefcaseFill } from "react-icons/bs";
import JobsTable from "./JobsTable";
import FiltersBar from "./../FiltersBar";
import Loading from "../Loading";
import JobsFilters from "./JobsFilters";
import { getResourceListFilteredAndPaginated } from "../../../../api/api";
import { Project } from "../../../../api/types";
import { useAppSelector, useAppDispatch } from "../../../../redux/hooks";
import { changeTotalPages, changeSearch } from "../../../../redux/slices/pm";
import { parseTotalPagesHeader } from "../../../../utils/query";
import ExportJobs from "./ExportJobs";

const translateTypeFilter = (type: { project: boolean; proposal: boolean }) => {
    if (type.project && type.proposal) return undefined;
    if (type.project) return true;
    return false;
};

const translateActiveFilter = (type: { active: boolean; inactive: boolean }) => {
    if (type.active && type.inactive) return undefined;
    if (type.active) return true;
    return false;
};

const Jobs = () => {
    const state = useAppSelector((s) => s.projectManagement.jobs);
    const getAuthHeader = useAuthHeader();
    const dispatch = useAppDispatch();

    const setTotalPages = (value: number | null) =>
        dispatch({
            type: changeTotalPages,
            payload: {
                module: "jobs",
                value,
            },
        });

    const {
        isLoading,
        isSuccess,
        isError,
        data: axiosRes,
    } = useQuery(
        ["projects", state],
        () =>
            getResourceListFilteredAndPaginated<Project>(
                "projects",
                getAuthHeader(),
                [
                    { field: "active", value: translateActiveFilter(state.filters.active) },
                    { field: "client", value: state.filters.client },
                    {
                        field: "proposal.accountId",
                        value: state.filters.account,
                    },
                    {
                        field: "sold",
                        value: translateTypeFilter(state.filters.type),
                    },
                    { field: "businessUnit.id", value: state.filters.businessUnit },
                ],
                [
                    { name: "search", value: state.search },
                ],
                state.sort,
                state.pagination.currentPage,
                10
            ),
        {
            onSuccess: (res) =>
                parseTotalPagesHeader(
                    setTotalPages,
                    res.headers["pages-amount"]
                ),
        }
    );

    const jobs = axiosRes?.data;

    const onSearch = useCallback(
        (s: string) => {
            dispatch({
                type: changeSearch,
                payload: {
                    module: "jobs",
                    value: s,
                },
            });
        },
        [dispatch, changeSearch]
    );

    if (isError) return <>Something went wrong, try again later</>;

    return (
        <VStack w={"full"} alignItems={"flex-start"} spacing={3}>
            <Flex justifyContent={"space-between"} width={"100%"}>
                <TabHeader label={"Jobs"} icon={BsFillBriefcaseFill} />
                <ExportJobs />
            </Flex>
            <FiltersBar
                onSearchChange={onSearch}
                search={state.search}
                filters={<JobsFilters />}
            />
            {isSuccess && jobs && <JobsTable jobs={jobs} />}
            {isLoading && <Loading />}
        </VStack>
    );
};

export default Jobs;
