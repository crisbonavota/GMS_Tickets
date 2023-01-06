import { Text } from "@chakra-ui/react";
import { useCallback } from "react";
import { Provider, Sort } from "../../../../api/types";
import {
    DynamicTableFormat,
    DynamicTable,
} from "../../../../components/DynamicTable/DynamicTable";
import { useAppSelector, useAppDispatch } from "../../../../redux/hooks";
import { changeSort, changePage } from "../../../../redux/slices/hr";
import DetailsCell from "../../../pm/tabs/DetailsCell";
import EditProviderButton from "../../creation-edition/EditProviderButton";

interface Props {
    providers: Provider[];
}

const ProvidersTable = ({ providers }: Props) => {
    const state = useAppSelector((s) => s.hr.providers);
    const dispatch = useAppDispatch();

    const setSort = useCallback(
        (s: Sort) =>
            dispatch({
                type: changeSort,
                payload: { module: "providers", value: s },
            }),
        [changeSort, useAppDispatch]
    );

    const setPage = useCallback(
        (p: number) =>
            dispatch({
                type: changePage,
                payload: { module: "providers", value: p },
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
        },
        {
            header: "Business Unit",
            accessor: "legacyUser.businessUnit.name",
            disableSort: true,
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
            accessorFn: (id: number) => <DetailsCell resource="providers" id={id} />,
            disableSort: true,
        },
        {
            header: "Edit",
            accessor: "id",
            accessorFn: (id: number) => 
                <EditProviderButton 
                    provider={providers.filter(p => p.id === id)[0]} 
                />,
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
