import {
    Box,
    Center,
    HStack,
    IconButton,
    Spinner,
    Table,
    Tbody,
    Td,
    Text,
    Th,
    Thead,
    Tr,
    VStack,
} from '@chakra-ui/react';
import { useMemo, useCallback } from 'react';
import { GrFormPrevious, GrFormNext } from 'react-icons/gr';
import { MdSkipNext, MdSkipPrevious } from 'react-icons/md';
import * as lodash from 'lodash';
import { Sort } from '@gms-micro/api-filters';
import SortIcons from '../components/SortIcons';
import DynamicTablePagination from '../components/DynamicTablePagination';

export interface TablePaginationWithChakraProps {
    currentPage: number;
    setCurrentPage: (page: number) => void;
    pagesAmountHeader?: string;
    isLoading: boolean;
    elementsAmount?: string;
}

export const TablePaginationWithChakra = ({
    currentPage,
    setCurrentPage,
    pagesAmountHeader,
    isLoading,
    elementsAmount,
}: TablePaginationWithChakraProps) => {
    const pagesAmount = useMemo(
        () => (pagesAmountHeader ? parseInt(pagesAmountHeader) : null),
        [pagesAmountHeader]
    );
    return (
        <VStack alignItems={'flex-end'} spacing={0}>
            <HStack>
                <Text>Current page:</Text>
                <Text fontWeight={'bold'}>
                    {currentPage + 1}/{pagesAmount}
                </Text>
                <IconButton
                    icon={<MdSkipPrevious color="black" />}
                    onClick={() => setCurrentPage(0)}
                    size={'s'}
                    colorScheme={'whiteAlpha'}
                    aria-label="Jump to first page"
                    disabled={currentPage === 0 || isLoading}
                />
                <IconButton
                    icon={<GrFormPrevious />}
                    onClick={() => setCurrentPage(currentPage - 1)}
                    size={'s'}
                    colorScheme={'whiteAlpha'}
                    aria-label="Previous page"
                    disabled={currentPage === 0 || isLoading}
                />
                <IconButton
                    icon={<GrFormNext />}
                    onClick={() => setCurrentPage(currentPage + 1)}
                    size={'s'}
                    colorScheme={'whiteAlpha'}
                    aria-label="Next page"
                    disabled={pagesAmount === currentPage + 1 || isLoading}
                />
                <IconButton
                    icon={<MdSkipNext color="black" />}
                    onClick={() =>
                        setCurrentPage(pagesAmount ? pagesAmount - 1 : 0)
                    }
                    size={'s'}
                    colorScheme={'whiteAlpha'}
                    aria-label="Jump 5 pages forward"
                    // Disabled if there's at least 5 pages to jump forward from current page
                    disabled={pagesAmount === currentPage + 1 || isLoading}
                />
            </HStack>
            {elementsAmount && (
                <Text as={'span'} fontSize={'sm'}>
                    <Text fontWeight={'bold'} as={'span'}>
                        {elementsAmount}
                    </Text>{' '}
                    elements
                </Text>
            )}
        </VStack>
    );
};

export interface DynamicTableFormat {
    header: string;
    accessor: string;
    accessorFn?: (row: any) => any;
    disableSort?: boolean;
}

interface DynamicTableProps {
    format: DynamicTableFormat[];
    data: any[];
    sort?: Sort;
    setSort?: (sort: Sort) => void;
    currentPage?: number;
    totalPages?: number | null;
    setCurrentPage?: (page: number) => void;
}

export const DynamicTable = ({
    format,
    data,
    sort,
    setSort,
    currentPage,
    totalPages,
    setCurrentPage,
}: DynamicTableProps) => {
    const onSortClick = useCallback(
        (accessor: string) => {
            if (!sort || !setSort) return;
            if (sort.field === accessor)
                setSort({ ...sort, isAscending: !sort.isAscending });
            else setSort({ field: accessor, isAscending: true });
        },
        [sort, setSort]
    );

    return (
        <VStack w={'full'}>
            {currentPage !== undefined &&
                setCurrentPage &&
                totalPages !== undefined && (
                    <DynamicTablePagination
                        page={currentPage}
                        setPage={setCurrentPage}
                        totalPages={totalPages}
                    />
                )}
            <Box w={'full'} maxW={'full'} overflowX={'auto'}>
                <Table bgColor={'white'} w={'full'}>
                    <Thead bgColor={'#FBEAC0'} py={'10px'}>
                        <Tr>
                            {format.map((f) => (
                                <Th key={f.header}>
                                    <HStack spacing={1}>
                                        <Text>{f.header}</Text>
                                        {sort && setSort && !f.disableSort && (
                                            <SortIcons
                                                onClick={() =>
                                                    onSortClick(f.accessor)
                                                }
                                                isSorted={
                                                    f.accessor === sort.field
                                                }
                                                isSortedAscending={
                                                    sort.isAscending
                                                }
                                            />
                                        )}
                                    </HStack>
                                </Th>
                            ))}
                        </Tr>
                    </Thead>
                    <Tbody>
                        {data.map((item, _i) => (
                            <Tr key={_i}>
                                {format.map((f) => (
                                    <Td key={`${f.header}-${f.accessor}`}>
                                        <Text>
                                            {f.accessorFn
                                                ? f.accessorFn(
                                                      lodash.get(
                                                          item,
                                                          f.accessor
                                                      )
                                                  )
                                                : lodash.get(item, f.accessor)}
                                        </Text>
                                    </Td>
                                ))}
                            </Tr>
                        ))}
                    </Tbody>
                </Table>
            </Box>
        </VStack>
    );
};

export const LoadingOverlay = () => {
    return (
        <Center
            w={'100vw'}
            h={'100vh'}
            position={'absolute'}
            top={'50%'}
            left={'50%'}
            transform={'translate(-50%, -50%)'}
            bgColor={'rgba(0, 0, 0, 0.5)'}
            zIndex={999}
        >
            <Spinner size={'xl'} color={'white'} />
        </Center>
    );
};
