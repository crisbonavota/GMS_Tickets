import { Button } from '@chakra-ui/react';
import { FaClone } from 'react-icons/fa';

const CloneButton = () => {
    return (
        <Button colorScheme={'orange'} variant={'ghost'} leftIcon={<FaClone />}>
            Clone
        </Button>
    );
};

export default CloneButton;
