import { Box, Flex, Image } from '@chakra-ui/react';
import { Tonic3Logo } from '@gms-micro/assets';


export function Navbar() {
    return (
        <Box w={'full'} h={'8vh'} bgColor={'black'} mb={0}>
            <Flex w={'full'} h={'full'} py={2} justifyContent={'center'} alignItems={'center'}>
                <Image src={Tonic3Logo} alt={"Tonic3"} h={'full'} />
            </Flex>
        </Box>
    );
}

export default Navbar;
