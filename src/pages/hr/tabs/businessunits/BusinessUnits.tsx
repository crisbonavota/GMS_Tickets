import { useQuery } from "react-query";
import { useAuthHeader } from "react-auth-kit";
import { VStack } from "@chakra-ui/react";
import { RiBuilding4Fill } from "react-icons/ri";
import BusinessUnitsTable from "./BusinessUnitsTable";
import { useCallback } from "react";
import FiltersBar from "../FiltersBar";
import BusinessUnitsFilters from "./BusinessUnitsFilters";
import { getResourceListFilteredAndPaginated } from "../../../../api/api";
import { BusinessUnit } from "../../../../api/types";
import { useAppSelector, useAppDispatch } from "../../../../redux/hooks";
import { changeTotalPages, changeSearch } from "../../../../redux/slices/pm";
import { parseTotalPagesHeader } from "../../../../utils/query";
import TabHeader from "../../../pm/tabs/TabHeader";
import Loading from "../../../pm/tabs/Loading";

const BusinessUnits = () => {
    const state = useAppSelector((s) => s.hr.businessUnits);
    const getAuthHeader = useAuthHeader();
    const dispatch = useAppDispatch();

    const setTotalPages = (value: number | null) =>
        dispatch({
            type: changeTotalPages,
            payload: {
                module: "businessUnits",
                value,
            },
        });

    const {
        isLoading,
        isSuccess,
        isError,
        data: axiosRes,
    } = useQuery(
        ["businessUnits", state],
        () =>
            getResourceListFilteredAndPaginated<BusinessUnit>(
                "businessUnits",
                getAuthHeader(),
                [
                    { field: "name", value: state.search },
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

    const businessUnits = axiosRes?.data;

    const onSearch = useCallback(
        (s: string) => {
            dispatch({
                type: changeSearch,
                payload: {
                    module: "businessUnits",
                    value: s,
                },
            });
        },
        [dispatch, changeSearch]
    );

    if (isError) return <>There was an error, try again later</>;

    return (
        <VStack w={"full"} alignItems={"flex-start"} spacing={3}>
            <TabHeader label={"Business Units"} icon={RiBuilding4Fill} />
            <FiltersBar
                search={state.search}
                onSearchChange={onSearch}
                filters={<BusinessUnitsFilters />}
            />
            {isSuccess && businessUnits && <BusinessUnitsTable businessUnits={businessUnits} />}
            {isLoading && <Loading />}
        </VStack>
    );
};

export default BusinessUnits;
