import { Text } from "@chakra-ui/react";
import moment from "moment";
import { useCallback, useState } from "react";
import { Employee, Sort, GroupLegacyUser, ApplicationUserPrivate } from "../../../../api/types";
import {
    DynamicTableFormat,
    DynamicTable,
} from "../../../../components/DynamicTable/DynamicTable";
import { useAppSelector, useAppDispatch } from "../../../../redux/hooks";
import { changeSort, changePage } from "../../../../redux/slices/hr";
import DetailsCell from "../../../pm/tabs/DetailsCell";
import EditEmployeeButton from "../../creation-edition/EditEmployeeButton";
// import DeleteEmployeeButton from "../../detailed/employees/DeleteEmployeeButton";
import EmployeePermissions from "./permissions/EmployeePermissions";
import { useAuthUser } from "react-auth-kit";

interface Props {
    employees: Employee[];
}

const EmployeesTable = ({ employees }: Props) => {
    const authUser = useAuthUser()() as ApplicationUserPrivate;
    const [tabIndex, setTabIndex] = useState(0);
    const state = useAppSelector((s) => s.humanResources.employees);
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

    const format: DynamicTableFormat[] = [
        {
            header: "File Number",
            accessor: "fileNumber",
        },
        {
            header: "firstName",
            accessor: "firstName",
        },
        {
            header: "lastName",
            accessor: "lastName",
        },
        {
            header: "Email",
            accessor: "email",
            withTooltip: true,
        },
        {
            header: "Business Unit",
            accessor: "legacyUser.businessUnit.name",
            disableSort: true,
            withTooltip: true,
        },
        {
            header: "CUIT",
            accessor: "afipId",
            withTooltip: true,
        },
        {
            header: "Birth Date",
            accessor: "birthDate",
            accessorFn: (birthDate: string) =>
                birthDate && birthDate !== "0001-01-01T00:00:00"
                    ? moment.utc(birthDate).format("yyyy-MM-DD")
                    : "",
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
            accessorFn: (id: number) => (
                <DetailsCell resource="employees" id={id} />
            ),
            disableSort: true,
        },
        {
            header: "Edit",
            accessor: "id",
            accessorFn: (id: number) => (
                <EditEmployeeButton
                    employee={employees.filter((e) => e.id === id)[0]}
                    tabIndex={tabIndex}
                    setTabIndex={setTabIndex}
                />
            ),
            disableSort: true,
        },
        // {
        //     header: "Delete",
        //     accessor: "id",
        //     accessorFn: (id: number) => (
        //         <DeleteEmployeeButton
        //             employee={employees.filter((e) => e.id === id)[0]}
        //         />
        //     ),
        //     disableSort: true,
        // },
        ...(!authUser.roles.includes("hr-limited") ?
            [
                {
                    header: "Permissions",
                    accessor: "",
                    accessorFn: (group: GroupLegacyUser) => (
                        <EmployeePermissions group={group} />
                    ),
                    rawObject: true,
                    disableSort: true,
                },
            ]
            :
            []
        ),
    ];

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

export default EmployeesTable;
