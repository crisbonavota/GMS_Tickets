import { HStack, IconButton, Text } from '@chakra-ui/react';
import { GrFormPrevious, GrFormNext } from "react-icons/gr";
import { MdSkipNext, MdSkipPrevious } from "react-icons/md";

export interface TablePaginationProps {
    currentPage: number,
    setCurrentPage: (page: number) => void,
    pagesAmountHeader?: string,
    isLoading: boolean
 }

export const TablePagination = ({ currentPage, setCurrentPage, pagesAmountHeader, isLoading }: TablePaginationProps) => {
    return (
        <HStack>
            <Text>Current page:</Text>
            <Text fontWeight={'bold'}>{currentPage + 1}</Text>
            <IconButton
                icon={<MdSkipPrevious color='black' />}
                onClick={() => setCurrentPage(currentPage - 5)}
                size={'s'}
                colorScheme={'whiteAlpha'}
                aria-label="Jump 5 pages back"
                disabled={currentPage <= 4 || isLoading}
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
                disabled={pagesAmountHeader === (currentPage + 1).toString() || isLoading}
            />
            <IconButton
                icon={<MdSkipNext color='black' />}
                onClick={() => setCurrentPage(currentPage + 5)}
                size={'s'}
                colorScheme={'whiteAlpha'}
                aria-label="Jump 5 pages forward"
                disabled={(pagesAmountHeader && parseInt(pagesAmountHeader) <= 5) || isLoading}
            />
        </HStack>
    );
}

export default TablePagination;
