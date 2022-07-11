import { HStack, IconButton, Text } from '@chakra-ui/react';
import { GrPrevious, GrNext } from 'react-icons/gr';
import { MdSkipPrevious, MdSkipNext } from 'react-icons/md';

interface Props {
    page: number;
    setPage: (page: number) => void;
    totalPages: number | null;
}

const commonIconProps = {
    variant: 'ghost',
    size: 'xs',
};

const DynamicTablePagination = ({ page, setPage, totalPages }: Props) => {
    const onPrevClick = () => {
        setPage(page - 1);
    };

    const onNextClick = () => {
        setPage(page + 1);
    };

    const onFirstClick = () => {
        setPage(0);
    };

    const onLastClick = () => {
        if (!totalPages) return;
        setPage(totalPages - 1);
    };

    return (
        <HStack
            id={'test'}
            w={'full'}
            justifyContent={'flex-end'}
            p={1}
            spacing={0}
        >
            <IconButton
                icon={<MdSkipPrevious />}
                aria-label="First page"
                {...commonIconProps}
                onClick={onFirstClick}
                disabled={page === 0}
            />
            <IconButton
                icon={<GrPrevious />}
                aria-label="Previous page"
                onClick={onPrevClick}
                disabled={page === 0}
                {...commonIconProps}
            />
            <Text as={'span'}>
                {page + 1}/{totalPages}
            </Text>
            <IconButton
                icon={<GrNext />}
                aria-label="Next page"
                onClick={onNextClick}
                disabled={totalPages === null || totalPages === page + 1}
                {...commonIconProps}
            />
            <IconButton
                icon={<MdSkipNext />}
                aria-label="Last page"
                {...commonIconProps}
                onClick={onLastClick}
                disabled={totalPages === null || totalPages === page + 1}
            />
        </HStack>
    );
};
export default DynamicTablePagination;
