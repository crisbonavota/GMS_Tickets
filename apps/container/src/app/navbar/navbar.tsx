import { Box, Image, Link, Text, HStack, Heading, VStack } from '@chakra-ui/react';
import { Tonic3Logo } from '@gms-micro/assets';
import { config } from '@gms-micro/deploy';


export function Navbar() {
    const currentApp = config.apps.find(app => app.path === window.location.pathname.substring(1));
    return (
        <Box w={'full'} h={'8vh'} bgColor={'black'} mb={0}>
            <HStack w={'full'} h={'full'} py={2} ps={10} justifyContent={'flex-start'} alignItems={'center'} spacing={5}>
                <Link href={'/'} h={'full'}>
                    <Image src={Tonic3Logo} alt={"Tonic3"} h={'full'} />
                </Link>
                <VStack alignItems={'flex-start'} spacing={0}>
                    <Text color={'white'} fontSize={'sm'}>{currentApp?.module}</Text>
                    <Heading fontSize={'2xl'} color={'white'}>{currentApp?.label}</Heading>
                </VStack>
            </HStack>
        </Box>
    );
}

export default Navbar;
