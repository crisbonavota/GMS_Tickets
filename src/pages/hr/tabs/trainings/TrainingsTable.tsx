import { useCallback } from "react";
import { Sort, StatusTraining, Training } from "../../../../api/types";
import { DynamicTable, DynamicTableFormat } from "../../../../components/DynamicTable/DynamicTable";
import { useAppDispatch, useAppSelector } from "../../../../redux/hooks";
import { changeSort, changePage } from "../../../../redux/slices/pm";
import { Text } from "@chakra-ui/react";
import { momentToLocaleDateString } from "../../../../utils/datetime";
import moment from "moment";

interface Props {
    trainings: Training[];
}

const format: DynamicTableFormat[] = [
    {
        header: "id",
        accessor: "id",
    },
    {
        header: "name(s)",
        accessor: "employee.firstName",
    },
    {
        header: "last name(s)",
        accessor: "employee.lastName",
    },
    {
        header: "training name",
        accessor: "name",
    },
    {
        header: "company name",
        accessor: "companyName",
    },
    {
        header: "start date",
        accessor: "startDate",
        accessorFn: (r: string) => momentToLocaleDateString(moment(r)),
    },
    {
        header: "status",
        accessor: "status",
        accessorFn: (s: number) => (<Text>{s ? StatusTraining[s] : "" }</Text>)
    },
];

const TrainingsTable = ({ trainings }: Props) => {
    const state = useAppSelector((s) => s.humanResources.trainings);
    const dispatch = useAppDispatch();

    const setSort = useCallback(
        (s: Sort) =>
            dispatch({
                type: changeSort,
                payload: { module: "trainings", value: s },
            }),
        [changeSort, useAppDispatch]
    );

    const setPage = useCallback(
        (p: number) =>
            dispatch({
                type: changePage,
                payload: { module: "trainings", value: p },
            }),
        [changePage, useAppDispatch]
    );

    return (
        <DynamicTable
            format={format}
            data={trainings}
            sort={state.sort}
            setSort={setSort}
            currentPage={state.pagination.currentPage}
            totalPages={state.pagination.totalPages}
            setCurrentPage={setPage}
        />
    );
};

export default TrainingsTable;
