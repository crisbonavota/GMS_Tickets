import { Button, useDisclosure } from '@chakra-ui/react';
import CreateClientModal from './creation/CreateClientModal';
import { useEffect } from 'react';
import CreateAccountModal from './creation/CreateAccountModal';

interface Props {
    tabIndex: number;
}

const AddNewButton = ({ tabIndex }: Props) => {
    const { isOpen, onOpen, onClose } = useDisclosure();

    useEffect(onClose, [tabIndex]);

    return (
        <>
            <Button
                colorScheme={'orange'}
                px={10}
                w={{ base: 'full', md: 'fit-content' }}
                onClick={onOpen}
            >
                ADD NEW
            </Button>
            {tabIndex === 0 && (
                <CreateClientModal
                    isOpen={isOpen}
                    onOpen={onOpen}
                    onClose={onClose}
                />
            )}
            {tabIndex === 1 && (
                <CreateAccountModal
                    isOpen={isOpen}
                    onOpen={onOpen}
                    onClose={onClose}
                />
            )}
        </>
    );
};
export default AddNewButton;
