import { useAuthHeader } from "react-auth-kit";
import { useQuery } from "react-query";
import { useAppSelector, useAppDispatch } from "../../redux/hooks";
import { getResourceListFilteredAndPaginated } from "../../api/api";
import { Update } from "../../api/types";
import { Flex, HStack, Text, VStack } from "@chakra-ui/react";
import { parseTotalPagesHeader } from "../../utils/query";
import { changeTotalPages } from "../../redux/slices/hr-updates";
import TableComponent from "./TableComponent";
import UserTypeFilter from "./UserTypeFilter";
import MonthFilter from "./MonthFilter";
import YearFilter from "./YearFilter";
import UpdateTypeFilter from "./UpdateTypeFilter";
import EmployeeFilter from "./EmployeeFilter";
import ExportButton from "./ExportButton";
import CreateSelectUpdateType from "./CRUD/CreateSelectUpdateType";
import ImportButton from "./CRUD/Import/ImportButton";

const Updates = () => {
    const getAuthHeader = useAuthHeader();
    const state = useAppSelector((s) => s.hrUpdates);
    const dispatch = useAppDispatch();

    const setTotalPages = (value: number | null) =>
        dispatch({
            type: changeTotalPages,
            payload: value,
        });

    const {
        data: axiosRes,
        isSuccess,
        isError,
        isLoading,
    } = useQuery(
        ["updates", state],
        () =>
            getResourceListFilteredAndPaginated<Update>(
                "updates",
                getAuthHeader(),
                [
                    {
                        field: "updateTypeId",
                        value: state.filters.updateTypeId,
                    },
                    {
                        field: "legacyUserId",
                        value: state.filters.legacyUserId,
                    },
                ],
                [
                    {
                        name: "month",
                        // api months index starts at 1, but JS months index starts at 0
                        value: state.filters.month + 1,
                    },
                    {
                        name: "year",
                        value: state.filters.year,
                    },
                    {
                        name: "userType",
                        value: state.filters.userType,
                    },
                ],
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

    const updates = isSuccess ? axiosRes?.data : [];

    return (
        <VStack w="full" p={5}>
            <VStack w={"90%"} spacing={5}>
                <Flex
                    justifyContent={"space-between"}
                    alignItems={"flex-end"}
                    w={"full"}
                    flexDir={{ base: "column-reverse", md: "row" }}
                    gap={5}
                >
                    <Flex
                        w={"full"}
                        gap={5}
                        alignItems={{ base: "flex-start", md: "flex-end" }}
                        flexDir={{ base: "column", md: "row" }}
                    >
                        <EmployeeFilter />
                        <UserTypeFilter />
                        <MonthFilter />
                        <YearFilter />
                        <UpdateTypeFilter />
                    </Flex>
                    <HStack spacing={5}>
                        <ExportButton />
                        <CreateSelectUpdateType />
                        <ImportButton />
                    </HStack>
                </Flex>
                {isLoading && <Text>Loading...</Text>}
                {isError && <Text>Error, try again later</Text>}
                {isSuccess && <TableComponent updates={updates} />}
            </VStack>
        </VStack>
    );
};

export default Updates;
