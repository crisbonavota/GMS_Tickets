import { useQuery } from "react-query";
import { useAuthHeader } from "react-auth-kit";
import { VStack } from "@chakra-ui/react";
import { RiBuilding4Fill } from "react-icons/ri";
import ProvidersTable from "./ProvidersTable";
import { useCallback } from "react";
import FiltersBar from "../FiltersBar";
import ProvidersFilters from "./ProvidersFilters";
import { getResourceListFilteredAndPaginated } from "../../../../api/api";
import { Provider } from "../../../../api/types";
import { useAppSelector, useAppDispatch } from "../../../../redux/hooks";
import { changeTotalPages, changeSearch } from "../../../../redux/slices/hr";
import { parseTotalPagesHeader } from "../../../../utils/query";
import TabHeader from "../../../pm/tabs/TabHeader";
import Loading from "../../../pm/tabs/Loading";

const Providers = () => {
    const state = useAppSelector((s) => s.hr.providers);
    const getAuthHeader = useAuthHeader();
    const dispatch = useAppDispatch();

    const setTotalPages = (value: number | null) =>
        dispatch({
            type: changeTotalPages,
            payload: {
                module: "providers",
                value,
            },
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
                    { field: "fullName", value: state.search },
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

    const providers = axiosRes?.data;

    const onSearch = useCallback(
        (s: string) => {
            dispatch({
                type: changeSearch,
                payload: {
                    module: "providers",
                    value: s,
                },
            });
        },
        [dispatch, changeSearch]
    );

    if (isError) return <>There was an error, try again later</>;

    return (
        <VStack w={"full"} alignItems={"flex-start"} spacing={3}>
            <TabHeader label={"Providers"} icon={RiBuilding4Fill} />
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
