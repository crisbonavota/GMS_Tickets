import { VStack, Table, Thead, Tr, Tbody, Box, Td } from "@chakra-ui/react";
import { Sort } from "../../api/types";
import DynamicTableCell from "./DynamicTableCell";
import DynamicTableHeader from "./DynamicTableHeader";
import DynamicTablePagination from "./DynamicTablePagination";

export interface DynamicTableFormat {
    header: string;
    accessor: string;
    accessorFn?: (row: any) => any;
    disableSort?: boolean;
    rawObject?: boolean;
}

interface DynamicTableProps {
    format: DynamicTableFormat[];
    data: any[];
    sort?: Sort;
    setSort?: (sort: Sort) => void;
    currentPage?: number;
    totalPages?: number | null;
    setCurrentPage?: (page: number) => void;
    emptyMessage?: string;
}

export const DynamicTable = ({
    format,
    data,
    sort,
    setSort,
    currentPage,
    totalPages,
    setCurrentPage,
    emptyMessage,
}: DynamicTableProps) => {
    return (
        <VStack w={"full"}>
            {currentPage !== undefined &&
                setCurrentPage &&
                totalPages !== undefined && (
                    <DynamicTablePagination
                        page={currentPage}
                        setPage={setCurrentPage}
                        totalPages={totalPages}
                    />
                )}
            <Box w={"full"} maxW={"full"} overflowX={"auto"}>
                <Table bgColor={"white"} w={"full"}>
                    <Thead bgColor={"#FBEAC0"} py={"10px"}>
                        <Tr>
                            {format.map((f, _i) => (
                                <DynamicTableHeader
                                    item={f}
                                    // workaround for disabling sort when there isn't data present
                                    sort={data.length ? sort : undefined}
                                    setSort={setSort}
                                    key={_i}
                                />
                            ))}
                        </Tr>
                    </Thead>
                    <Tbody>
                        {data.map((item, _i) => (
                            <Tr key={_i}>
                                {format.map((f, _n) => (
                                    <DynamicTableCell
                                        item={item}
                                        format={f}
                                        key={_i + _n}
                                    />
                                ))}
                            </Tr>
                        ))}
                        {!data.length && (
                            <Tr>
                                <Td>
                                    {" "}
                                    {emptyMessage ||
                                        "No data, try different filters"}
                                </Td>
                            </Tr>
                        )}
                    </Tbody>
                </Table>
            </Box>
        </VStack>
    );
};
