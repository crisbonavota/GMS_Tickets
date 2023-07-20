import { Heading, Img, VStack } from "@chakra-ui/react";
import logo from "../../assets/logo.png";
import Signin from "../../components/TicketsModule/signin";

const SigninPage = () => {
  return (
    <VStack h="100vh" alignItems={"center"} spacing={10} p={10}>
      <Heading className="title">Sign In</Heading>
      <Img w="5rem" src={logo} alt="logo" />
      <Signin />
    </VStack>
  );
};

export default SigninPage;
