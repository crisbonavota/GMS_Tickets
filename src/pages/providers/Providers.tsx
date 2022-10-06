import { useAppSelector, useAppDispatch } from "../../redux/hooks";
import { useQuery } from "react-query";
import { getResourceListFilteredAndPaginated } from "../../api/api";
import { Provider } from "../../api/types";
import { useAuthHeader } from "react-auth-kit";
import { VStack, Text, Flex } from "@chakra-ui/react";
import { useMemo } from "react";
import { changeTotalPages } from "../../redux/slices/hr-providers";
import TableComponent from "./TableComponent";
import NameFilter from "./NameFilter";
import FileNumberFilter from "./FileNumberFilter";
import { parseTotalPagesHeader } from "../../utils/query";

const Providers = () => {
    const getAuthHeader = useAuthHeader();
    const state = useAppSelector((s) => s.hrProviders);
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
        ["providers", state],
        () =>
            getResourceListFilteredAndPaginated<Provider>(
                "providers",
                getAuthHeader(),
                [
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

    const providers = useMemo(
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
                    <FileNumberFilter />
                </Flex>
                {isLoading && <Text>Loading...</Text>}
                {isError && (
                    <Text>
                        There was an error generating the table, try again later
                    </Text>
                )}
                {isSuccess && <TableComponent providers={providers} />}
            </VStack>
        </VStack>
    );
};

export default Providers;
