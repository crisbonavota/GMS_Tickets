import { useCallback } from "react";
import JobType from "./JobType";
import JobResources from "./resources/JobResources";
import DetailsCell from "../DetailsCell";
import moment from "moment";
import { Project, Sort } from "../../../../api/types";
import {
    DynamicTableFormat,
    DynamicTable,
} from "../../../../components/DynamicTable/DynamicTable";
import { useAppSelector, useAppDispatch } from "../../../../redux/hooks";
import { changeSort, changePage } from "../../../../redux/slices/pm";
import { momentToLocaleDateString } from "../../../../utils/datetime";
import { Text } from "@chakra-ui/react";

interface Props {
    jobs: Project[];
}

const format: DynamicTableFormat[] = [
    {
        header: "job",
        accessor: "name",
    },
    {
        header: "account",
        accessor: "proposal.account.name",
    },
    {
        header: "type",
        accessor: "sold",
        accessorFn: (sold: boolean) => <JobType sold={sold} />,
    },
    {
        header: "resources",
        accessor: "",
        accessorFn: (project: Project) => (
            <JobResources id={project.id} leader={project.leaderLegacyUser} />
        ),
        rawObject: true,
        disableSort: true,
    },
    {
        header: "Details",
        accessor: "id",
        accessorFn: (id: number) => <DetailsCell resource="jobs" id={id} />,
        disableSort: true,
    },
    {
        header: "Creation Date",
        accessor: "creationDate",
        accessorFn: (r: string) => momentToLocaleDateString(moment(r)),
    },
    {
        header: "Status",
        accessor: "active",
        accessorFn: (r: boolean) => (
            <Text color={r ? "green" : "red"}>
                {r ? "Active" : "Inactive"}
            </Text>
        ),
        disableSort: true,
    },
];

const JobsTable = ({ jobs }: Props) => {
    const state = useAppSelector((s) => s.projectManagement.jobs);
    const dispatch = useAppDispatch();

    const setSort = useCallback(
        (s: Sort) =>
            dispatch({
                type: changeSort,
                payload: { module: "jobs", value: s },
            }),
        [changeSort, useAppDispatch]
    );

    const setPage = useCallback(
        (p: number) =>
            dispatch({
                type: changePage,
                payload: { module: "jobs", value: p },
            }),
        [changePage, useAppDispatch]
    );

    return (
        <DynamicTable
            format={format}
            data={jobs}
            sort={state.sort}
            setSort={setSort}
            currentPage={state.pagination.currentPage}
            totalPages={state.pagination.totalPages}
            setCurrentPage={setPage}
        />
    );
};

export default JobsTable;
