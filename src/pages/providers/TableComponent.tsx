import { useCallback } from "react";
import { Provider, Sort } from "../../api/types";
import {
    DynamicTable,
    DynamicTableFormat,
} from "../../components/DynamicTable/DynamicTable";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { changeSort, changePage } from "../../redux/slices/hr-providers";
import { Text } from "@chakra-ui/react";
import EditModal from "./EditModal";

interface Props {
    providers: Provider[];
}

const format: DynamicTableFormat[] = [
    {
        header: "File number",
        accessor: "fileNumber",
    },
    {
        header: "Name",
        accessor: "legacyUser.fullName",
    },
    {
        header: "Email",
        accessor: "email",
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
        accessorFn: (provider: Provider) => <EditModal provider={provider} />,
    },
];

const TableComponent = ({ providers }: Props) => {
    const state = useAppSelector((s) => s.hrProviders);

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
            data={providers}
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
