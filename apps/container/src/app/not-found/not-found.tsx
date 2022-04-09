import { VStack, Heading, Link, Center } from '@chakra-ui/react';
import { Link as RouterLink } from 'react-router-dom';

const NotFound = () => {
    return (
        <Center w={'full'} h={'92vh'} justifyContent={'center'} color={'red'}>
            <VStack p={10} bgColor={'white'} spacing={5} borderRadius={5} borderColor={'lightgray'} borderWidth={1}>
                <Heading fontSize={'7xl'}>404</Heading>
                <Heading fontSize={'3xl'}>Page not found</Heading>
                <Link fontSize={'2xl'} color={'green'}><RouterLink to={'/'}>Return to home</RouterLink></Link>
                <Link fontSize={'md'} color={'blue'} href="mailto:itteam@tonic3.com">This is a mistake? Contact the admins</Link>
            </VStack>
        </Center>
    )
}

export default NotFound;
