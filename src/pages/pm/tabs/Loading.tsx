import { Spinner, Center } from '@chakra-ui/react';

const Loading = () => {
    return (
        <Center minH={'30vh'} w={'full'}>
            <Spinner size={'xl'} color={'steelblue'} />
        </Center>
    );
};

export default Loading;
