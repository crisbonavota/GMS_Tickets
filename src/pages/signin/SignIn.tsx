import {
    Box,
    Text,
    Image,
    Heading,
    VStack,
    Button,
    Center,
    Link,
} from "@chakra-ui/react";
import { RiGoogleLine } from "react-icons/ri";
import LoginBackground from "../../assets/images/login-background.png";
import Tonic3Logo from "../../assets/images/tonic3-logo.webp";

const googleData = {
    clientId: import.meta.env.VITE_GOOGLE_CLIENT_ID,
    responseType: "token id_token",
    scope:
        "openid " +
        "https://www.googleapis.com/auth/userinfo.email " +
        "https://www.googleapis.com/auth/userinfo.profile ",
    redirectUri: `${window.location.origin}/sign-in/redirect`,
    accessType: "online",
};

const SignIn = () => {
    return (
        <Box minW={"full"} minH={"100vh"}>
            <Box
                bgImage={LoginBackground}
                w={"full"}
                minH={"50vh"}
                bgPos={"center center"}
            >
                <VStack
                    minW={"full"}
                    minH={"50vh"}
                    bgColor={"blackAlpha.600"}
                    pb={10}
                    justifyContent={"flex-end"}
                    borderBottom={"8px solid orangered"}
                    spacing={8}
                >
                    <Image src={Tonic3Logo} alt={"Tonic3"} w={"10rem"} />
                    <Box
                        bgColor={"#999898"}
                        px={3}
                        py={1}
                        borderRadius={5}
                        w={"fit-content"}
                    >
                        <Heading
                            pt={1}
                            color={"blackAlpha.600"}
                            letterSpacing={2}
                            fontSize={"sm"}
                        >
                            GMS v2.0.1
                        </Heading>
                    </Box>
                </VStack>
            </Box>
            <Center w="full" h={"46vh"}>
                <Button
                    colorScheme={"orange"}
                    bgColor={"orangered"}
                    leftIcon={<RiGoogleLine size={25} />}
                    size={"lg"}
                    iconSpacing={4}
                    as={Link}
                    href={
                        "https://accounts.google.com/o/oauth2/v2/auth" +
                        `?client_id=${googleData.clientId}` +
                        `&response_type=${googleData.responseType}` +
                        `&scope=${googleData.scope}` +
                        `&redirect_uri=${googleData.redirectUri}` +
                        `&nonce=${crypto.randomUUID()}` +
                        `&access_type=${googleData.accessType}`
                    }
                >
                    SIGN IN
                </Button>
            </Center>
            <Center bgColor={"black"} w={"full"} h={"4vh"}>
                <Text color={"whitesmoke"} fontSize={"xs"}>
                    All GMS W3 Rights Reserved | GMS is a W3 Trendmark | ©{" "}
                    {new Date(Date.now()).getFullYear()}
                </Text>
            </Center>
        </Box>
    );
};

export default SignIn;
