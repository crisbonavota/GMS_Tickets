import { useAppSelector, useAppDispatch } from "../../redux/hooks";
import { useQuery } from "react-query";
import { getResourceListFilteredAndPaginated } from "../../api/api";
import { Employee } from "../../api/types";
import { useAuthHeader } from "react-auth-kit";
import { VStack, Text, Flex } from "@chakra-ui/react";
import { useMemo } from "react";
import { changeTotalPages } from "../../redux/slices/hr-employees";
import TableComponent from "./TableComponent";
import PositionFilter from "./PositionFilter";
import CountryFilter from "./CountryFilter";
import NameFilter from "./NameFilter";
import CuitFilter from "./CuitFilter";
import FileNumberFilter from "./FileNumberFilter";
import { parseTotalPagesHeader } from "../../utils/query";

const Employees = () => {
    const getAuthHeader = useAuthHeader();
    const state = useAppSelector((s) => s.hrEmployees);
    const dispatch = useAppDispatch();

    const setTotalPages = (value: number | null) =>
        dispatch({
            type: changeTotalPages,
            payload: value,
        });

    const {
        data: axiosRes,
        isSuccess,
        isLoading,
        isError,
    } = useQuery(
        ["employees", state],
        () =>
            getResourceListFilteredAndPaginated<Employee>(
                "employees",
                getAuthHeader(),
                [
                    { field: "position.Id", value: state.filters.position },
                    {
                        field: "afipId",
                        value:
                            state.filters.afipId !== ""
                                ? state.filters.afipId
                                : undefined,
                    },
                    {
                        field: "birthCountry.Id",
                        value: state.filters.birthCountry,
                    },
                    {
                        field: "fileNumber_cnt",
                        value: state.filters.fileNumber,
                    },
                ],
                [{ name: "fullName", value: state.filters.fullName }],
                state.sort,
                state.pagination.currentPage
            ),
        {
            onSuccess: (res) =>
                parseTotalPagesHeader(
                    setTotalPages,
                    res.headers["pages-amount"]
                ),
        }
    );

    const employees = useMemo(
        () => (isSuccess ? axiosRes.data : []),
        [axiosRes, isSuccess]
    );

    return (
        <VStack w={"full"} maxW={"full"} p={5}>
            <VStack w={"90%"} spacing={5}>
                <Flex
                    w={"full"}
                    gap={5}
                    alignItems={{ base: "flex-start", md: "flex-end" }}
                    flexDir={{ base: "column", md: "row" }}
                >
                    <NameFilter />
                    <PositionFilter />
                    <CuitFilter />
                    <CountryFilter />
                    <FileNumberFilter />
                </Flex>
                {isLoading && <Text>Loading...</Text>}
                {isError && (
                    <Text>
                        There was an error generating the table, try again later
                    </Text>
                )}
                {isSuccess && <TableComponent employees={employees} />}
            </VStack>
        </VStack>
    );
};

export default Employees;
