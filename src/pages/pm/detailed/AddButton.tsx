import { Button } from '@chakra-ui/react';
import { FaPlus } from 'react-icons/fa';

interface Props {
    label: string;
    onOpen: () => void;
}

const AddButton = ({ label, onOpen }: Props) => {
    return (
        <Button
            variant={'ghost'}
            colorScheme={'orange'}
            size={'sm'}
            leftIcon={<FaPlus />}
            onClick={onOpen}
        >
            Add {label}
        </Button>
    );
};

export default AddButton;
