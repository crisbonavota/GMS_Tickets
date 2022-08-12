import { Button } from '@chakra-ui/react';
import { BiPencil } from 'react-icons/bi';

interface Props {}

const EditButton = (props: Props) => {
    return (
        <Button colorScheme={'ghost'} leftIcon={<BiPencil />}>
            Edit
        </Button>
    );
};
export default EditButton;
