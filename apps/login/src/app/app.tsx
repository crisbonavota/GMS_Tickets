import { Box, Text, VStack, Image, Heading, Center, Button } from '@chakra-ui/react';
import LoginBackground from '../assets/images/login-background.png';
import { Tonic3Logo } from '@gms-micro/assets';
import { GoogleLogin, GoogleLoginResponse } from 'react-google-login';
import { RiGoogleLine } from 'react-icons/ri';
import { environment } from '../environments/environment';
import { useState } from 'react';
import { signInWithExternalProvider } from './auth';

const App = () => {
    const googleClientId = environment.googleClientId;
    const [loading, setLoading] = useState(false);

    const onSuccess = async (response: GoogleLoginResponse) => {
        setLoading(true);
        const googleAuthResponse = response.getAuthResponse();
        try {
            const apiResponse = await signInWithExternalProvider("google", googleAuthResponse.id_token);
        }
        catch (err) {
            console.log(err);
        }
    }

    const onFailure = (e: any) => {
        console.log(e);
    }

    return (
        <Box minW={'full'} minH={'100vh'}>
            <Box
                bgImage={LoginBackground}
                w={'full'} minH={'50vh'}
                bgPos={"center center"}
            >
                <VStack
                    minW={'full'}
                    minH={'50vh'}
                    bgColor={'blackAlpha.600'}
                    pb={10}
                    justifyContent={'flex-end'}
                    borderBottom={'8px solid orangered'}
                    spacing={8}
                >
                    <Image src={Tonic3Logo} alt={'Tonic3'} w={'10rem'} />
                    <Box bgColor={'#999898'} px={3} py={1} borderRadius={5} w={'fit-content'}>
                        <Heading pt={1} color={'blackAlpha.600'} letterSpacing={2} fontSize={'sm'}>GMS 2022</Heading>
                    </Box>
                </VStack>
            </Box>
            <Center w={'full'} minHeight={'46vh'}>
                <GoogleLogin
                    clientId={googleClientId}
                    onSuccess={(r) => onSuccess(r as GoogleLoginResponse)}
                    onRequest={() => setLoading(true)}
                    onFailure={onFailure}
                    render={renderProps => (
                        <Button
                            onClick={renderProps.onClick}
                            disabled={renderProps.disabled}
                            colorScheme={'orange'}
                            bgColor={'orangered'}
                            leftIcon={<RiGoogleLine size={25} />}
                            size={'lg'}
                            iconSpacing={4}
                            isLoading={loading}
                        >
                            <Text pt={1}>SIGN IN</Text>
                        </Button>
                    )}
                />
            </Center>
            <Center bgColor={'black'} w={'full'} h={'4vh'}>
                <Text color={'whitesmoke'} fontSize={'xs'}>© {new Date().getFullYear()} - TONIC3 GMS</Text>
            </Center>
        </Box>
    );
}

export default App;
