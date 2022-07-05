import { Button } from '@chakra-ui/react';

const AddNewButton = () => {
    return (
        <Button
            colorScheme={'orange'}
            px={10}
            w={{ base: 'full', md: 'fit-content' }}
        >
            ADD NEW
        </Button>
    );
};
export default AddNewButton;
