import { useCallback } from "react";
import { Sort, Update } from "../../api/types";
import {
    DynamicTable,
    DynamicTableFormat,
} from "../../components/DynamicTable/DynamicTable";
import { useAppSelector, useAppDispatch } from "../../redux/hooks";
import { changeSort, changePage } from "../../redux/slices/hr-updates";
import EditButton from "./CRUD/EditButton";
import DeleteButton from "./CRUD/DeleteButton";
import { HStack } from "@chakra-ui/react";

const format: DynamicTableFormat[] = [
    {
        header: "Employee",
        accessor: "legacyUser.fullName",
    },
    {
        header: "Update Type",
        accessor: "updateType.caption",
    },
    {
        header: "Date",
        accessor: "date",
        accessorFn: (date?: string) =>
            date && new Date(date).toLocaleDateString(),
    },
    {
        header: "End Date",
        accessor: "endDate",
        accessorFn: (date?: string) =>
            date && new Date(date).toLocaleDateString(),
    },
    {
        header: "Amount",
        accessor: "amount",
    },
    { header: "Currency", accessor: "amountCurrency.code" },
    { header: "Date Telegram", accessor: "dateTelegram" },
    { header: "Report Number", accessor: "reportNumber" },
    {
        header: "New Date",
        accessor: "newDate",
        accessorFn: (date?: string) =>
            date && new Date(date).toLocaleDateString(),
    },
    { header: "Notes", accessor: "notes" },
    {
        header: "",
        accessor: "id",
        disableSort: true,
        rawObject: true,
        accessorFn: (update: Update) => (
            <HStack spacing={5}>
                <EditButton update={update} />
                <DeleteButton update={update} />
            </HStack>
        ),
    },
];

interface Props {
    updates: Update[];
}

const TableComponent = ({ updates }: Props) => {
    const state = useAppSelector((s) => s.hrUpdates);
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
            data={updates}
            sort={state.sort}
            setSort={setSort}
            currentPage={state.pagination.currentPage}
            totalPages={state.pagination.totalPages}
            setCurrentPage={setPage}
        />
    );
};

export default TableComponent;
