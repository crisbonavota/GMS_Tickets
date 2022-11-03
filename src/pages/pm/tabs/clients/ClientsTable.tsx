import moment from "moment";
import { Text } from "@chakra-ui/react";
import { useCallback } from "react";
import DetailsCell from "../DetailsCell";
import { Company, Sort } from "../../../../api/types";
import {
    DynamicTableFormat,
    DynamicTable,
} from "../../../../components/DynamicTable/DynamicTable";
import { useAppSelector, useAppDispatch } from "../../../../redux/hooks";
import { changeSort, changePage } from "../../../../redux/slices/pm";
import { momentToLocaleDateString } from "../../../../utils/datetime";

interface Props {
    clients: Company[];
}

const format: DynamicTableFormat[] = [
    {
        header: "client",
        accessor: "name",
    },
    {
        header: "Country",
        accessor: "country.name",
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
    {
        header: "Details",
        accessor: "id",
        accessorFn: (id: number) => <DetailsCell resource="clients" id={id} />,
        disableSort: true,
    },
];

const ClientsTable = ({ clients }: Props) => {
    const state = useAppSelector((s) => s.projectManagement.clients);
    const dispatch = useAppDispatch();

    const setSort = useCallback(
        (s: Sort) =>
            dispatch({
                type: changeSort,
                payload: { module: "clients", value: s },
            }),
        [changeSort, useAppDispatch]
    );

    const setPage = useCallback(
        (p: number) =>
            dispatch({
                type: changePage,
                payload: { module: "clients", value: p },
            }),
        [changePage, useAppDispatch]
    );

    return (
        <DynamicTable
            format={format}
            data={clients}
            sort={state.sort}
            setSort={setSort}
            currentPage={state.pagination.currentPage}
            totalPages={state.pagination.totalPages}
            setCurrentPage={setPage}
        />
    );
};

export default ClientsTable;
