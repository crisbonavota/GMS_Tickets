import { Flex, VStack } from "@chakra-ui/react";
import { useCallback } from "react";
import { useAuthHeader } from "react-auth-kit";
import { RiBuilding4Fill } from "react-icons/ri";
import { useQuery } from "react-query";
import { getResourceListFilteredAndPaginated } from "../../../../api/api";
import { Training } from "../../../../api/types";
import { useAppDispatch, useAppSelector } from "../../../../redux/hooks";
import { changeSearch, changeTotalPages } from "../../../../redux/slices/hr";
import { parseTotalPagesHeader } from "../../../../utils/query";
import Loading from "../../../pm/tabs/Loading";
import TabHeader from "../../../pm/tabs/TabHeader";
import FiltersBar from "../FiltersBar";
import TrainingsFilter from "./TrainingsFilter";
import TrainingsTable from "./TrainingsTable";

const Trainings = () => {
    const state = useAppSelector((s) => s.humanResources.trainings);
    const getAuthHeader = useAuthHeader();
    const dispatch = useAppDispatch();

    const setTotalPages = (value: number | null) =>
        dispatch({
            type: changeTotalPages,
            payload: {
                module: "trainings",
                value,
            },
        });

    const {
        isLoading,
        isSuccess,
        isError,
        data: axiosRes,
    } = useQuery(
        ["trainings", state],
        () =>
            getResourceListFilteredAndPaginated<Training>(
                "trainings",
                getAuthHeader(),
                [
                    { field: "status", value: state.filters.status },
                    { field: "legacyUserId", value: state.filters.legacyUserId }
                ],
                [{ name: "search", value: state.search }],
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

    const trainings = axiosRes?.data;

    const onSearch = useCallback(
        (s: string) => {
            dispatch({
                type: changeSearch,
                payload: {
                    module: "trainings",
                    value: s,
                },
            });
        },
        [dispatch, changeSearch]
    );

    if (isError) return <>There was an error, try again later</>;

    return (
        <VStack>
            <Flex justifyContent={"space-between"} width={"100%"}>
                <TabHeader label={"Trainings"} icon={RiBuilding4Fill} />
                {/* <ExportProviders /> */}
            </Flex>
            <FiltersBar
                search={state.search}
                onSearchChange={onSearch}
                filters={<TrainingsFilter />}
            />
            {isSuccess && trainings && <TrainingsTable trainings={trainings} />}
            {isLoading && <Loading />}
        </VStack>
    );
};

export default Trainings;
