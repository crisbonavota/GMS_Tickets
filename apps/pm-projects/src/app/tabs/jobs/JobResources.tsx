import { HStack, Icon, Text } from '@chakra-ui/react';
import { HiPuzzle } from 'react-icons/hi';

interface Props {
    id: number;
}

const JobResources = ({ id }: Props) => {
    return (
        <HStack spacing={1} alignItems={'center'}>
            <Icon as={HiPuzzle} color={'#3B8A7F'} />
            <Text>Resources</Text>
        </HStack>
    );
};
export default JobResources;
