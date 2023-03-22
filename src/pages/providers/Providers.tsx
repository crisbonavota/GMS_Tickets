import { useQuery } from "react-query";
import { useAuthHeader } from "react-auth-kit";
import { Flex, VStack } from "@chakra-ui/react";
import { RiBuilding4Fill } from "react-icons/ri";
import ProvidersTable from "./ProvidersTable";
import { useCallback } from "react";
import ProvidersFilters from "./ProvidersFilters";
import ExportProviders from "./ExportProviders";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { changeSearch, changeTotalPages } from "../../redux/slices/providers";
import { getResourceListFilteredAndPaginated } from "../../api/api";
import { Provider } from "../../api/types";
import { parseTotalPagesHeader } from "../../utils/query";
import TabHeader from "../pm/tabs/TabHeader";
import FiltersBar from "../hr/tabs/FiltersBar";
import Loading from "../pm/tabs/Loading";

const Providers = () => {
  const state = useAppSelector((s) => s.providers);
  const getAuthHeader = useAuthHeader();
  const dispatch = useAppDispatch();

  const setTotalPages = (value: number | null) =>
    dispatch({
      type: changeTotalPages,
      payload: value,
    });

  const {
    isLoading,
    isSuccess,
    isError,
    data: axiosRes,
  } = useQuery(
    ["providers", state],
    () =>
      getResourceListFilteredAndPaginated<Provider>(
        "providers",
        getAuthHeader(),
        [
          { field: "active", value: state.filters.active },
          { field: "legacyUser.businessUnit.id", value: state.filters.businessUnit },
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

  const providers = axiosRes?.data;

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
        <TabHeader label={"Providers"} icon={RiBuilding4Fill} />
        <ExportProviders />
      </Flex>
      <FiltersBar
        search={state.search}
        onSearchChange={onSearch}
        filters={<ProvidersFilters />}
      />
      {isSuccess && providers && <ProvidersTable providers={providers} />}
      {isLoading && <Loading />}
    </VStack>
  );
};

export default Providers;
