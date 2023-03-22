import { Text } from "@chakra-ui/react";
import { useCallback } from "react";
import { Sort, GroupLegacyUser, Provider } from "../../api/types";
import { DynamicTableFormat, DynamicTable } from "../../components/DynamicTable/DynamicTable";
import { useAppSelector, useAppDispatch } from "../../redux/hooks";
import { changePage, changeSort } from "../../redux/slices/providers";
import EmployeePermissions from "../hr/tabs/employees/permissions/EmployeePermissions";
import DetailsCell from "../pm/tabs/DetailsCell";
import EditProviderButton from "./creation-edition/EditProviderButton";

interface Props {
    providers: Provider[];
}

const ProvidersTable = ({ providers }: Props) => {
    const state = useAppSelector((s) => s.providers);
    const dispatch = useAppDispatch();

    const setSort = useCallback(
        (value: Sort) =>
            dispatch({
                type: changeSort,
                payload: value,
            }),
        [changeSort, useAppDispatch]
    );

    const setPage = useCallback(
        (value: number) =>
            dispatch({
                type: changePage,
                payload: value,
            }),
        [changePage, useAppDispatch]
    );

    const format: DynamicTableFormat[] = [
        {
            header: "File Number",
            accessor: "fileNumber",
        },
        {
            header: "First name",
            accessor: "firstName",
        },
        {
            header: "Last name",
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
                <DetailsCell resource="/providers" id={id} />
            ),
            disableSort: true,
        },
        {
            header: "Edit",
            accessor: "id",
            accessorFn: (id: number) => (
                <EditProviderButton
                    provider={providers.filter((p) => p.id === id)[0]}
                />
            ),
            disableSort: true,
        },
        {
            header: "permissions",
            accessor: "",
            accessorFn: (group: GroupLegacyUser) => (
                <EmployeePermissions group={group} />
            ),
            rawObject: true,
            disableSort: true,
        },
    ];

    return (
        <DynamicTable
            format={format}
            data={providers}
            sort={state.sort}
            setSort={setSort}
            currentPage={state.pagination.currentPage}
            totalPages={state.pagination.totalPages}
            setCurrentPage={setPage}
        />
    );
};

export default ProvidersTable;
