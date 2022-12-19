import { Text } from "@chakra-ui/react";
import { useCallback } from "react";
import { BusinessUnit, Sort } from "../../../../api/types";
import {
    DynamicTableFormat,
    DynamicTable,
} from "../../../../components/DynamicTable/DynamicTable";
import { useAppSelector, useAppDispatch } from "../../../../redux/hooks";
import { changeSort, changePage } from "../../../../redux/slices/pm";
import DetailsCell from "../../../pm/tabs/DetailsCell";

interface Props {
    businessUnits: BusinessUnit[];
}

const format: DynamicTableFormat[] = [
    {
        header: "Business Unit",
        accessor: "name",
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
        accessorFn: (id: number) => <DetailsCell resource="businessUnits" id={id} />,
        disableSort: true,
    },
];

const AccountsTable = ({ businessUnits }: Props) => {
    const state = useAppSelector((s) => s.hr.businessUnits);
    const dispatch = useAppDispatch();

    const setSort = useCallback(
        (s: Sort) =>
            dispatch({
                type: changeSort,
                payload: { module: "businessUnits", value: s },
            }),
        [changeSort, useAppDispatch]
    );

    const setPage = useCallback(
        (p: number) =>
            dispatch({
                type: changePage,
                payload: { module: "businessUnits", value: p },
            }),
        [changePage, useAppDispatch]
    );

    return (
        <DynamicTable
            format={format}
            data={businessUnits}
            sort={state.sort}
            setSort={setSort}
            currentPage={state.pagination.currentPage}
            totalPages={state.pagination.totalPages}
            setCurrentPage={setPage}
        />
    );
};

export default AccountsTable;
