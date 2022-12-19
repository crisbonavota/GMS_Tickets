import { Text } from "@chakra-ui/react";
import { useCallback } from "react";
import { Employee, Sort } from "../../../../api/types";
import {
    DynamicTableFormat,
    DynamicTable,
} from "../../../../components/DynamicTable/DynamicTable";
import { useAppSelector, useAppDispatch } from "../../../../redux/hooks";
import { changeSort, changePage } from "../../../../redux/slices/pm";
import DetailsCell from "../../../pm/tabs/DetailsCell";

interface Props {
    employees: Employee[];
}

const format: DynamicTableFormat[] = [
    {
        header: "firstName",
        accessor: "firstName",
    },
    {
        header: "lastName",
        accessor: "lastName",
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
    {
        header: "Details",
        accessor: "id",
        accessorFn: (id: number) => <DetailsCell resource="employees" id={id} />,
        disableSort: true,
    },
];

const AccountsTable = ({ employees }: Props) => {
    const state = useAppSelector((s) => s.hr.employees);
    const dispatch = useAppDispatch();

    const setSort = useCallback(
        (s: Sort) =>
            dispatch({
                type: changeSort,
                payload: { module: "employees", value: s },
            }),
        [changeSort, useAppDispatch]
    );

    const setPage = useCallback(
        (p: number) =>
            dispatch({
                type: changePage,
                payload: { module: "employees", value: p },
            }),
        [changePage, useAppDispatch]
    );

    return (
        <DynamicTable
            format={format}
            data={employees}
            sort={state.sort}
            setSort={setSort}
            currentPage={state.pagination.currentPage}
            totalPages={state.pagination.totalPages}
            setCurrentPage={setPage}
        />
    );
};

export default AccountsTable;
