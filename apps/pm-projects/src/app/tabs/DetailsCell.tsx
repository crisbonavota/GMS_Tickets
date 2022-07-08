import { HStack, Link, Text } from '@chakra-ui/react';
import { BsSearch } from 'react-icons/bs';
import { Link as RouterLink } from 'react-router-dom';

interface Props {
    id: number;
    resource: string;
}

const DetailsCell = ({ id, resource }: Props) => {
    return (
        <Link as={RouterLink} to={`${resource}/${id}`} w={'fit-content'}>
            <HStack w={'fit-content'}>
                <BsSearch color={'#3B8A7F'} />
                <Text>See Details</Text>
            </HStack>
        </Link>
    );
};

export default DetailsCell;
