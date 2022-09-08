import moment from "moment";
import { TimetrackItem, Sort } from "../../api/types";
import {
    DynamicTable,
    DynamicTableFormat,
} from "../../components/DynamicTable/DynamicTable";
import { momentToLocaleDateString } from "../../utils/datetime";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { useCallback } from "react";
import { changeSort, changePage } from "../../redux/slices/tt-reports";

interface Props {
    data: Array<TimetrackItem>;
}

const format: DynamicTableFormat[] = [
    {
        header: "File number",
        accessor: "legacyUser.fileNumber",
        accessorFn: (fileNumber: number) =>
            fileNumber ? fileNumber : "Contractor",
        disableSort: true,
    },
    {
        header: "Employee",
        accessor: "legacyUser.fullName",
    },
    {
        header: "Business Unit (Employee)",
        accessor: "legacyUser.businessUnit.name",
    },
    { header: "Project", accessor: "project.name" },
    {
        header: "Business Unit (Project)",
        accessor: "project.businessUnit.name",
    },
    {
        header: "Task",
        accessor: "task",
    },
    {
        header: "Date",
        accessor: "date",
        accessorFn: (date: string) =>
            date ? momentToLocaleDateString(moment(date)) : "",
    },
    {
        header: "Hours",
        accessor: "hours",
        accessorFn: (hours: number) => hours?.toFixed(2),
    },
];

const TableComponent = ({ data }: Props) => {
    const state = useAppSelector((s) => s.ttReports);
    const dispatch = useAppDispatch();

    const setSort = useCallback(
        (s: Sort) =>
            dispatch({
                type: changeSort,
                payload: s,
            }),
        [changeSort, useAppDispatch]
    );

    const setPage = useCallback(
        (p: number) =>
            dispatch({
                type: changePage,
                payload: p,
            }),
        [changePage, useAppDispatch]
    );

    return (
        <DynamicTable
            format={format}
            data={data}
            sort={state.sort}
            setSort={setSort}
            currentPage={state.pagination.currentPage}
            totalPages={state.pagination.totalPages}
            setCurrentPage={setPage}
        />
    );
};

export default TableComponent;
