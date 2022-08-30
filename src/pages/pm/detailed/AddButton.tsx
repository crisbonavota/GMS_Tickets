import { Button } from '@chakra-ui/react';
import { FaPlus } from 'react-icons/fa';

interface Props {
    label: string;
}

const AddButton = ({ label }: Props) => {
    return (
        <Button
            variant={'ghost'}
            colorScheme={'orange'}
            size={'sm'}
            leftIcon={<FaPlus />}
        >
            Add {label}
        </Button>
    );
};

export default AddButton;
