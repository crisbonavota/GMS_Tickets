import { Button } from '@chakra-ui/react';
import { BiEdit, BiPencil } from 'react-icons/bi';

interface Props {}

const EditClient = (props: Props) => {
    return (
        <Button colorScheme={'ghost'} leftIcon={<BiPencil />}>
            Edit
        </Button>
    );
};
export default EditClient;
