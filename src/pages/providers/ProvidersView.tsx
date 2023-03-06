import { VStack, Hide, Flex } from '@chakra-ui/react';
import AddNewButton from './AddNewButton';
import ProvidersContent from './ProvidersContent';

const ProvidersView = () => {
    return (
        <VStack
            w={'full'}
            h={'full'}
            p={5}
            py={10}
            alignItems={'center'}
            spacing={8}
        >
            <Flex
                w={'80%'}
                justifyContent={'flex-end'}
                gap={5}
            >
                <Hide above="md">
                    <AddNewButton />
                </Hide>
                <Hide below="md">
                    <AddNewButton />
                </Hide>
            </Flex>
            <ProvidersContent />
        </VStack>
    );
};

export default ProvidersView;
