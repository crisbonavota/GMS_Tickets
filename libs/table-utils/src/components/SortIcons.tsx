import { Icon, VStack } from '@chakra-ui/react';
import { TiArrowSortedUp, TiArrowSortedDown } from 'react-icons/ti';

interface Props {
    isSorted: boolean;
    isSortedAscending: boolean;
    onClick: () => void;
}

const SortIcons = ({ isSorted, isSortedAscending, onClick }: Props) => {
    return (
        <VStack
            alignItems={'center'}
            w={'fit-content'}
            spacing={0}
            px={2}
            cursor={'pointer'}
            onClick={onClick}
        >
            <Icon
                as={TiArrowSortedUp}
                color={isSorted && isSortedAscending ? 'orangered' : '#3B8A7F'}
            />
            <Icon
                as={TiArrowSortedDown}
                color={isSorted && !isSortedAscending ? 'orangered' : '#3B8A7F'}
            />
        </VStack>
    );
};
export default SortIcons;
