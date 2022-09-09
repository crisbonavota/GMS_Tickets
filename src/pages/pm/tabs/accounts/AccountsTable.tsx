import { Text } from "@chakra-ui/react";
import { useCallback } from "react";
import DetailsCell from "../DetailsCell";
import moment from "moment";
import { Account, Sort } from "../../../../api/types";
import {
    DynamicTableFormat,
    DynamicTable,
} from "../../../../components/DynamicTable/DynamicTable";
import { useAppSelector, useAppDispatch } from "../../../../redux/hooks";
import { changeSort, changePage } from "../../../../redux/slices/pm";
import { momentToLocaleDateString } from "../../../../utils/datetime";

interface Props {
    accounts: Account[];
}

const format: DynamicTableFormat[] = [
    {
        header: "account",
        accessor: "name",
    },
    {
        header: "client",
        accessor: "company.name",
    },
    {
        header: "Country",
        accessor: "country?.name",
    },
    {
        header: "Active",
        accessor: "active",
        accessorFn: (r: boolean) => (
            <Text color={r ? "green" : "red"}>
                {r ? "Active" : "Not active"}
            </Text>
        ),
    },
    {
        header: "Details",
        accessor: "id",
        accessorFn: (id: number) => <DetailsCell resource="accounts" id={id} />,
        disableSort: true,
    },
    {
        header: "Creation Date",
        accessor: "creationDate",
        accessorFn: (r: string) => momentToLocaleDateString(moment(r)),
    },
];

const AccountsTable = ({ accounts }: Props) => {
    const state = useAppSelector((s) => s.projectManagement.accounts);
    const dispatch = useAppDispatch();

    const setSort = useCallback(
        (s: Sort) =>
            dispatch({
                type: changeSort,
                payload: { module: "accounts", value: s },
            }),
        [changeSort, useAppDispatch]
    );

    const setPage = useCallback(
        (p: number) =>
            dispatch({
                type: changePage,
                payload: { module: "accounts", value: p },
            }),
        [changePage, useAppDispatch]
    );

    return (
        <DynamicTable
            format={format}
            data={accounts}
            sort={state.sort}
            setSort={setSort}
            currentPage={state.pagination.currentPage}
            totalPages={state.pagination.totalPages}
            setCurrentPage={setPage}
        />
    );
};

export default AccountsTable;
