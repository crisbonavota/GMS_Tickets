import { Text } from "@chakra-ui/react";
import { useCallback, useState } from "react";
import {
  Sort,
  GroupLegacyUser,
  Provider,
  ApplicationUserPrivate,
  TicketView,
  Status,
  Priorities,
} from "../../api/types";
import {
  DynamicTableFormat,
  DynamicTable,
} from "../../components/DynamicTable/DynamicTable";
import { useAppSelector, useAppDispatch } from "../../redux/hooks";
import { changePage, changeSort } from "../../redux/slices/providers";
import EmployeePermissions from "../hr/tabs/employees/permissions/EmployeePermissions";
import DetailsCell from "../pm/tabs/DetailsCell";
import { useAuthUser } from "react-auth-kit";
import EditProviderButton from "../providers/creation-edition/EditProviderButton";
import DeleteCell from "../../components/TicketsModule/DeleteCell";

interface Props {
  tickets: TicketView[];
}

const TicketsTable = ({ tickets }: Props) => {
  const index = +localStorage.getItem("tabIndexTicket")!;

  const state = useAppSelector((s) => s.tickets);
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
      header: "Status",
      accessor: "status",
      accessorFn: (status) => Status[status],
    },
    {
      header: "Priority",
      accessor: "priority",
      accessorFn: (priority) => Priorities[priority],
    },
    {
      header: "Subject",
      accessor: "subject",
    },
    {
      header: "Details",
      accessor: "id",
      accessorFn: (id: number) => <DetailsCell resource="/ticket" id={id} />,
      disableSort: true,
    },
    ...(index === 0
      ? [
          {
            header: "Delete",
            accessor: "id",
            accessorFn: (id: number) => (
              <DeleteCell resource="/ticket" id={id} />
            ),
            disableSort: true,
          },
        ]
      : []),
  ];

  return (
    <DynamicTable
      format={format}
      data={tickets}
      sort={state.sort}
      setSort={setSort}
      currentPage={state.pagination.currentPage}
      totalPages={state.pagination.totalPages}
      setCurrentPage={setPage}
    />
  );
};

export default TicketsTable;
