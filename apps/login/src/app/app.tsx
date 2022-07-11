import {
    Box,
    Text,
    Image,
    Heading,
    VStack,
    Button,
    useToast,
    Center,
} from '@chakra-ui/react';
import LoginBackground from '../assets/images/login-background.png';
import { Tonic3Logo } from '@gms-micro/assets';
import { GoogleLogin, GoogleLoginResponse } from 'react-google-login';
import { RiGoogleLine } from 'react-icons/ri';
import { environment } from '../environments/environment';
import { useState } from 'react';
import { signInWithExternalProvider } from './auth';
import { useIsAuthenticated, useSignIn } from 'react-auth-kit';
import queryString from 'query-string';

const App = () => {
    const googleClientId = environment.googleClientId;
    const [loading, setLoading] = useState(false);
    const signIn = useSignIn();
    const getAuthenticated = useIsAuthenticated();
    const toast = useToast();
    const queries = queryString.parse(window.location.search);

    if (getAuthenticated())
        window.location.href = `${window.location.origin}/${
            queries['redirect'] || ''
        }`;

    const onSuccess = async (response: GoogleLoginResponse) => {
        setLoading(true);

        // This response comes from the Google OAuth client
        const googleAuthResponse = response.getAuthResponse();
        try {
            // This response comes from our API, that takes the google token and returns a JWT
            const apiResponse = await signInWithExternalProvider(
                'google',
                googleAuthResponse.id_token
            );
            signIn({
                token: apiResponse.data.authToken.token,
                expiresIn: apiResponse.data.authToken.expiresIn,
                tokenType: apiResponse.data.tokenType,
                authState: apiResponse.data.authState,
                /*refreshToken: apiResponse.data.refreshToken.token,
                refreshTokenExpireIn: apiResponse.data.refreshToken.expiresIn*/
            });
            window.location.reload();
        } catch (err: any) {
            console.log(err);
            setLoading(false);
            toast({
                title: 'Error signing in, try again later',
                description: err.message || err,
                status: 'error',
                position: 'top',
                duration: 2000,
            });
        }
        setLoading(false);
    };

    const onFailure = (err: any) => {
        console.log(err);
        toast({
            title: "Can't connect to Google for signing in, try again later",
            description: err.message || JSON.stringify(err),
            status: 'error',
            position: 'top',
            duration: 2000,
        });
    };

    return (
        <Box minW={'full'} minH={'100vh'}>
            <Box
                bgImage={LoginBackground}
                w={'full'}
                minH={'50vh'}
                bgPos={'center center'}
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
                    <Box
                        bgColor={'#999898'}
                        px={3}
                        py={1}
                        borderRadius={5}
                        w={'fit-content'}
                    >
                        <Heading
                            pt={1}
                            color={'blackAlpha.600'}
                            letterSpacing={2}
                            fontSize={'sm'}
                        >
                            GMS v2.0.1
                        </Heading>
                    </Box>
                </VStack>
            </Box>
            <Center w={'full'} minHeight={'46vh'}>
                <GoogleLogin
                    clientId={googleClientId}
                    onSuccess={(r) => onSuccess(r as GoogleLoginResponse)}
                    onRequest={() => setLoading(true)}
                    onFailure={onFailure}
                    render={(renderProps) => (
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
                <Text color={'whitesmoke'} fontSize={'xs'}>
                    © {new Date().getFullYear()} - TONIC3 GMS
                </Text>
            </Center>
        </Box>
    );
};

export default App;
