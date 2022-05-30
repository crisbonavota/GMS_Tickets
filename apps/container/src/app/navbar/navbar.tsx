import {
    Box,
    Image,
    Link,
    Text,
    HStack,
    Heading,
    VStack,
    IconButton,
    useBoolean,
} from '@chakra-ui/react';
import { Tonic3Logo } from '@gms-micro/assets';
import { config } from '@gms-micro/deploy';
import { VscSignOut } from 'react-icons/vsc';
import { useMemo } from 'react';
import { useSignOut } from 'react-auth-kit';
import { useNavigate } from 'react-router-dom';
import { AiFillHome } from 'react-icons/ai';

export function Navbar() {
    const [loading, setLoading] = useBoolean();
    const navigate = useNavigate();
    const currentApp = config.apps.find(
        (app) => app.path === window.location.pathname.substring(1)
    );
    const signOut = useSignOut();

    const onClick = useMemo(
        () => () => {
            setLoading.on();
            signOut();
        },
        []
    );

    return (
        <Box w={'full'} h={'8vh'} bgColor={'black'} mb={0}>
            <HStack
                w={'full'}
                h={'full'}
                py={2}
                ps={10}
                justifyContent={'space-evenly'}
                alignItems={'center'}
            >
                <HStack h={'full'} spacing={5}>
                    <Link href={'/'} h={'full'}>
                        <Image src={Tonic3Logo} alt={'Tonic3'} h={'full'} />
                    </Link>
                    <VStack alignItems={'flex-start'} spacing={0}>
                        <Text color={'white'} fontSize={'sm'}>
                            {currentApp?.module}
                        </Text>
                        <Heading fontSize={'2xl'} color={'white'}>
                            {currentApp?.label}
                        </Heading>
                    </VStack>
                </HStack>
                <HStack>
                    <IconButton
                        size={'lg'}
                        colorScheme={'blue'}
                        icon={<AiFillHome size={25} />}
                        onClick={() => navigate('/')}
                        aria-label="home"
                    />
                    <IconButton
                        size={'lg'}
                        isLoading={loading}
                        colorScheme={'orange'}
                        icon={<VscSignOut size={25} />}
                        onClick={onClick}
                        aria-label="sign-out"
                    />
                </HStack>
            </HStack>
        </Box>
    );
}

export default Navbar;
