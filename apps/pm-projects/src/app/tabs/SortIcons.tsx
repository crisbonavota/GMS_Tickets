import { Icon, VStack } from '@chakra-ui/react';
import { TiArrowSortedUp, TiArrowSortedDown } from 'react-icons/ti';

const SortIcons = () => {
    return (
        <VStack
            alignItems={'center'}
            w={'fit-content'}
            spacing={0}
            px={2}
            cursor={'pointer'}
        >
            <Icon as={TiArrowSortedUp} />
            <Icon as={TiArrowSortedDown} color={'#3B8A7F'} />
        </VStack>
    );
};
export default SortIcons;
