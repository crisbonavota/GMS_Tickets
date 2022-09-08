import { useQuery } from "react-query";
import { useAuthHeader } from "react-auth-kit";
import { VStack } from "@chakra-ui/react";
import { RiBuilding4Fill } from "react-icons/ri";
import TabHeader from "../TabHeader";
import ClientsTable from "./ClientsTable";
import { useCallback } from "react";
import FiltersBar from "../FiltersBar";
import ClientsFilters from "./ClientsFilters";
import Loading from "../Loading";
import { getResourceListFilteredAndPaginated } from "../../../../api/api";
import { Company } from "../../../../api/types";
import { useAppSelector, useAppDispatch } from "../../../../redux/hooks";
import { changeTotalPages, changeSearch } from "../../../../redux/slices/pm";
import { parseTotalPagesHeader } from "../../../../utils/query";

const Clients = () => {
    const state = useAppSelector((s) => s.projectManagement.clients);
    const getAuthHeader = useAuthHeader();
    const dispatch = useAppDispatch();

    const setTotalPages = (value: number | null) =>
        dispatch({
            type: changeTotalPages,
            payload: {
                module: "clients",
                value,
            },
        });

    const {
        isLoading,
        isSuccess,
        isError,
        data: axiosRes,
    } = useQuery(
        ["clients", state],
        () =>
            getResourceListFilteredAndPaginated<Company>(
                "companies",
                getAuthHeader(),
                [
                    { field: "name", value: state.search },
                    { field: "countryId", value: state.filters.country },
                    { field: "active", value: state.filters.active },
                ],
                [],
                state.sort,
                state.pagination.currentPage,
                10
            ),
        {
            onSuccess: (res) =>
                parseTotalPagesHeader(
                    setTotalPages,
                    res.headers["pages-amount"]
                ),
        }
    );

    const clients = axiosRes?.data;

    const onSearch = useCallback(
        (s: string) => {
            dispatch({
                type: changeSearch,
                payload: {
                    module: "clients",
                    value: s,
                },
            });
        },
        [dispatch, changeSearch]
    );

    if (isError) return <>There was an error, try again later</>;

    return (
        <VStack w={"full"} alignItems={"flex-start"} spacing={3}>
            <TabHeader label={"Clients"} icon={RiBuilding4Fill} />
            <FiltersBar
                search={state.search}
                onSearchChange={onSearch}
                filters={<ClientsFilters />}
            />
            {isSuccess && clients && <ClientsTable clients={clients} />}
            {isLoading && <Loading />}
        </VStack>
    );
};

export default Clients;
