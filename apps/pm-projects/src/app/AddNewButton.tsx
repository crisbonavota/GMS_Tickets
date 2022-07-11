import { Button } from '@chakra-ui/react';

const AddNewButton = () => {
    return (
        <Button
            colorScheme={'orange'}
            px={10}
            w={{ base: 'full', md: 'fit-content' }}
            disabled
            title="Coming soon"
        >
            ADD NEW
        </Button>
    );
};
export default AddNewButton;
