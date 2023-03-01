import { useCallback } from "react";
import { Sort, StatusTraining, Training } from "../../../../api/types";
import {
    DynamicTable,
    DynamicTableFormat,
} from "../../../../components/DynamicTable/DynamicTable";
import { useAppDispatch, useAppSelector } from "../../../../redux/hooks";
import { changeSort, changePage } from "../../../../redux/slices/pm";
import { Text } from "@chakra-ui/react";
import { momentToLocaleDateString } from "../../../../utils/datetime";
import moment from "moment";
import EditTrainingsButton from "../../creation-edition/EditTrainingsButton";
import DetailsCell from "../../../pm/tabs/DetailsCell";

interface Props {
    trainings: Training[];
}

const format: DynamicTableFormat[] = [
    {
        header: "id",
        accessor: "id",
    },
    {
        header: "User full name",
        accessor: "legacyUser.fullName",
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
        accessorFn: (s: number) => (
            <Text>{s === 0 ? "Not Started Yet" : StatusTraining[s]}</Text>
        ),
    },
    {
        header: "Details",
        accessor: "id",
        accessorFn: (id: number) => (
            <DetailsCell resource="trainings" id={id} />
        ),
        disableSort: true,
    },
    {
        header: "Edit",
        accessor: "id",
        accessorFn: (training: Training) => (
            <EditTrainingsButton
                training={training}
            />
        ),
        rawObject: true,
        disableSort: true,
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
