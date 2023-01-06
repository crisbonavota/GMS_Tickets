import { Text } from "@chakra-ui/react";
import { useCallback } from "react";
import { BusinessUnit, Sort } from "../../../../api/types";
import {
    DynamicTableFormat,
    DynamicTable,
} from "../../../../components/DynamicTable/DynamicTable";
import { useAppSelector, useAppDispatch } from "../../../../redux/hooks";
import { changeSort, changePage } from "../../../../redux/slices/hr";
import EditBusinessUnitButton from "../../creation-edition/EditBusinessUnitButton";

interface Props {
    businessUnits: BusinessUnit[];
}

const BusinessUnitsTable = ({ businessUnits }: Props) => {
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
            header: "Edit",
            accessor: "id",
            accessorFn: (id: number) => 
                <EditBusinessUnitButton 
                    businessUnit={businessUnits.filter(bu => bu.id === id)[0]} 
                />,
            disableSort: true,
        },
    ];

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

export default BusinessUnitsTable;
