import { useQuery } from "react-query";
import { useAuthHeader } from "react-auth-kit";
import { Button, Flex, VStack } from "@chakra-ui/react";
import { RiBuilding4Fill } from "react-icons/ri";
import EmployeesTable from "./EmployeesTable";
import { useCallback } from "react";
import FiltersBar from "../FiltersBar";
import EmployeesFilters from "./EmployeesFilters";
import { getResourceListFilteredAndPaginated } from "../../../../api/api";
import { Employee } from "../../../../api/types";
import { useAppSelector, useAppDispatch } from "../../../../redux/hooks";
import { changeTotalPages, changeSearch } from "../../../../redux/slices/hr";
import { parseTotalPagesHeader } from "../../../../utils/query";
import TabHeader from "../../../pm/tabs/TabHeader";
import Loading from "../../../pm/tabs/Loading";
import ExportEmployees from "./ExportEmployees";

const Employees = () => {
  const state = useAppSelector((s) => s.hr.employees);
  const getAuthHeader = useAuthHeader();
  const dispatch = useAppDispatch();

  const setTotalPages = (value: number | null) =>
    dispatch({
      type: changeTotalPages,
      payload: {
        module: "employees",
        value,
      },
    });

  const {
    isLoading,
    isSuccess,
    isError,
    data: axiosRes,
  } = useQuery(
    ["employees", state],
    () =>
      getResourceListFilteredAndPaginated<Employee>(
        "employees",
        getAuthHeader(),
        [
          { field: "active", value: state.filters.active },
        ],
        [{ name: "fullName", value: state.search }],
        state.sort,
        state.pagination.currentPage,
        10
      ),
    {
      onSuccess: (res) =>
        parseTotalPagesHeader(setTotalPages, res.headers["pages-amount"]),
    }
  );

  const employees = axiosRes?.data;

  const onSearch = useCallback(
    (s: string) => {
      dispatch({
        type: changeSearch,
        payload: {
          module: "employees",
          value: s,
        },
      });
    },
    [dispatch, changeSearch]
  );

  if (isError) return <>There was an error, try again later</>;

  return (
    <VStack w={"full"} alignItems={"flex-start"} spacing={3} >
      <Flex justifyContent={"space-between"} width={"100%"}>
        <TabHeader label={"Employees"} icon={RiBuilding4Fill} />
        <ExportEmployees/>
      </Flex>
      <FiltersBar
        search={state.search}
        onSearchChange={onSearch}
        filters={<EmployeesFilters />}
      />
      {isSuccess && employees && <EmployeesTable employees={employees} />}
      {isLoading && <Loading />}
    </VStack>
  );
};

export default Employees;
