import { HStack, IconButton, Text, VStack } from '@chakra-ui/react';
import { useMemo } from 'react';
import { GrFormPrevious, GrFormNext } from 'react-icons/gr';
import { MdSkipNext, MdSkipPrevious } from 'react-icons/md';

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
