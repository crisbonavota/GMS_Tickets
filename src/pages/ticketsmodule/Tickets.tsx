import { useQuery } from "react-query";
import { useAuthHeader } from "react-auth-kit";
import { Flex, VStack } from "@chakra-ui/react";
import { IoTicketSharp } from "react-icons/io5";
import { useCallback } from "react";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { changeSearch, changeTotalPages } from "../../redux/slices/providers";
import { getResourceListFilteredAndPaginated } from "../../api/api";
import { Provider, TicketView } from "../../api/types";
import { parseTotalPagesHeader } from "../../utils/query";
import TabHeader from "../pm/tabs/TabHeader";
import FiltersBar from "../hr/tabs/FiltersBar";
import Loading from "../pm/tabs/Loading";
import ProvidersFilters from "../providers/ProvidersFilters";
import ProvidersTable from "../providers/ProvidersTable";
import TicketsFilters from "./TicketsFilters";
import TicketsTable from "./TicketsTable";
import React from "react";
import clienteAxios from "../../services/Axios";
import { filtersToAPIFormat } from "../../api/utils";
import { set } from "date-fns";

interface Props {
  resource: string;
}

const Tickets = ({ resource }: Props) => {
  console.log(import.meta.env);
  const state = useAppSelector((s) => s.tickets);
  const getAuthHeader = useAuthHeader();
  const dispatch = useAppDispatch();
  const [search, setSearch] = React.useState("");

  const setTotalPages = (value: number | null) =>
    dispatch({
      type: changeTotalPages,
      payload: value,
    });

  const currentPage = state.pagination.currentPage;

  const [searchParams, setSearchParams] = React.useState({
    filters:
      search !== "" ? [{ field: "subject", value: search, operator: "=" }] : [],
    "Sort.Field": "subject",
    "Sort.IsAscending": true,
    "Range.Start": (currentPage - 1) * 5,
    "Range.End": 4,
  });

  const {
    data: tickets,
    isSuccess,
    isError,
    isLoading,
  } = useQuery(
    ["tickets", resource, currentPage, searchParams],
    () =>
      clienteAxios.get<{
        items: TicketView[];
        totalCount: number;
      }>(`/${resource}`, {
        params: {
          filters: filtersToAPIFormat(searchParams.filters),
          "Sort.Field": searchParams["Sort.Field"],
          "Sort.IsAscending": searchParams["Sort.IsAscending"],
          "Range.Start": (currentPage - 1) * 5,
          "Range.End": currentPage * 5 - 1,
        },
        headers: { Authorization: getAuthHeader() },
      }),

    {
      select: (data) => data.data,
      refetchOnMount: true,
      refetchOnWindowFocus: false,
      refetchOnReconnect: false,
    }
  );

  const onSearch = useCallback(
    (value: string) => {
      dispatch({
        type: changeSearch,
        payload: value,
      });
    },
    [dispatch, changeSearch]
  );

  if (isError) return <>There was an error, try again later</>;

  return (
    <VStack w={"full"} alignItems={"flex-start"} spacing={3}>
      <Flex justifyContent={"space-between"} width={"100%"}>
        <TabHeader label={"Tickets"} icon={IoTicketSharp} />
      </Flex>
      <FiltersBar
        search={search}
        onSearchChange={setSearch}
        filters={
          <TicketsFilters
            search={search}
            onSearchChange={setSearch}
            onSearchParamsUpdate={setSearchParams}
          />
        }
      />
      {isSuccess && tickets && <TicketsTable tickets={tickets.items} />}
      {isLoading && <Loading />}
    </VStack>
  );
};

export default Tickets;
