import { useCallback } from "react";
import { Employee, Sort } from "../../api/types";
import {
    DynamicTable,
    DynamicTableFormat,
} from "../../components/DynamicTable/DynamicTable";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { changeSort, changePage } from "../../redux/slices/hr-employees";
import { Text } from "@chakra-ui/react";
import EditModal from "./EditModal";

interface Props {
    employees: Employee[];
}

const format: DynamicTableFormat[] = [
    {
        header: "File number",
        accessor: "fileNumber",
        disableSort: true,
    },
    {
        header: "Name",
        accessor: "legacyUser.fullName",
    },
    {
        header: "CUIT",
        accessor: "afipId",
    },
    {
        header: "Position",
        accessor: "position.name",
    },
    {
        header: "Birth Date",
        accessor: "birthDate",
        accessorFn: (birthDate: string) =>
            birthDate && birthDate !== "0001-01-01T00:00:00"
                ? new Date(birthDate).toLocaleDateString()
                : "",
    },
    {
        header: "Email",
        accessor: "email",
    },
    {
        header: "Mobile Phone",
        accessor: "mobilePhone",
    },
    {
        header: "Salary Currency",
        accessor: "salaryCurrency.code",
    },
    {
        header: "Country",
        accessor: "country.name",
    },
    {
        header: "Active",
        accessor: "active",
        accessorFn: (active: boolean) =>
            active ? (
                <Text color="green">Yes</Text>
            ) : (
                <Text color="red">No</Text>
            ),
    },
    {
        header: "",
        accessor: "",
        disableSort: true,
        rawObject: true,
        accessorFn: (employee: Employee) => <EditModal employee={employee} />,
    },
];

const TableComponent = ({ employees }: Props) => {
    const state = useAppSelector((s) => s.hrEmployees);

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
            data={employees}
            format={format}
            sort={state.sort}
            currentPage={state.pagination.currentPage}
            totalPages={state.pagination.totalPages}
            setSort={setSort}
            setCurrentPage={setPage}
        />
    );
};

export default TableComponent;
