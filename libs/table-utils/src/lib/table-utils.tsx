import {
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
import { useMemo } from 'react';
import { GrFormPrevious, GrFormNext } from 'react-icons/gr';
import { MdSkipNext, MdSkipPrevious } from 'react-icons/md';
import * as lodash from 'lodash';

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
}

interface DynamicTableProps {
    format: DynamicTableFormat[];
    data: any[];
}

export const DynamicTable = ({ format, data }: DynamicTableProps) => {
    return (
        <Table w={'full'} maxW={'full'} overflowX={'auto'} bgColor={'white'}>
            <Thead bgColor={'#FBEAC0'} py={'10px'}>
                <Tr>
                    {format.map((f) => (
                        <Th key={f.header}>
                            <HStack spacing={1}>
                                <Text>{f.header}</Text>
                                {/*<SortIcons />*/}
                            </HStack>
                        </Th>
                    ))}
                </Tr>
            </Thead>
            <Tbody>
                {data.map((item, _i) => (
                    <Tr key={_i}>
                        {format.map((f) => (
                            <Td key={f.accessor}>
                                <Text>
                                    {f.accessorFn
                                        ? f.accessorFn(
                                              lodash.get(item, f.accessor)
                                          )
                                        : lodash.get(item, f.accessor)}
                                </Text>
                            </Td>
                        ))}
                    </Tr>
                ))}
            </Tbody>
        </Table>
    );
};

export const LoadingOverlay = () => {
    return (
        <Center
            w={'full'}
            h={'full'}
            position={'absolute'}
            top={0}
            left={0}
            bgColor={'rgba(0, 0, 0, 0.5)'}
        >
            <Spinner size={'xl'} color={'white'} />
        </Center>
    );
};
