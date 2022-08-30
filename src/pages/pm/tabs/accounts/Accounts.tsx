import { useQuery } from "react-query";
import { useAuthHeader } from "react-auth-kit";
import { VStack } from "@chakra-ui/react";
import TabHeader from "../TabHeader";
import { useCallback } from "react";
import { MdAccountBalanceWallet } from "react-icons/md";
import AccountsTable from "./AccountsTable";
import FiltersBar from "../FiltersBar";
import Loading from "../Loading";
import AccountsFilters from "./AccountsFilters";
import { getResourceListFilteredAndPaginated } from "../../../../api/api";
import { Account } from "../../../../api/types";
import { useAppSelector, useAppDispatch } from "../../../../redux/hooks";
import { changeTotalPages, changeSearch } from "../../../../redux/slices/pm";
import { parseTotalPagesHeader } from "../../../../utils/query";

const Accounts = () => {
    const state = useAppSelector((s) => s.projectManagement.accounts);
    const getAuthHeader = useAuthHeader();
    const dispatch = useAppDispatch();

    const setTotalPages = (value: number | null) =>
        dispatch({
            type: changeTotalPages,
            payload: {
                module: "accounts",
                value,
            },
        });

    const {
        isLoading,
        isSuccess,
        isError,
        data: axiosRes,
    } = useQuery(
        ["accounts", state],
        () =>
            getResourceListFilteredAndPaginated<Account>(
                "accounts",
                getAuthHeader(),
                [
                    { field: "name", value: state.search },
                    { field: "countryId", value: state.filters.country },
                    { field: "active", value: state.filters.active },
                    { field: "companyId", value: state.filters.client },
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

    const accounts = axiosRes?.data;

    const onSearch = useCallback(
        (s: string) => {
            dispatch({
                type: changeSearch,
                payload: {
                    module: "accounts",
                    value: s,
                },
            });
        },
        [dispatch, changeSearch]
    );

    if (isError) return <>There was an error, try again later</>;

    return (
        <VStack w={"full"} alignItems={"flex-start"} spacing={1}>
            <TabHeader label={"Accounts"} icon={MdAccountBalanceWallet} />
            <FiltersBar
                onSearchChange={onSearch}
                search={state.search}
                filters={<AccountsFilters />}
            />
            {isSuccess && accounts && <AccountsTable accounts={accounts} />}
            {isLoading && <Loading />}
        </VStack>
    );
};

export default Accounts;
