import { Heading, Img, VStack } from "@chakra-ui/react";
import logo from "../assets/logo.png";
import Signup from "../components/signup";

const SignupPage = () => {
  return (
    <VStack h="100vh" alignItems={"center"} spacing={10} p={10}>
      <Heading className="title">Sign Up</Heading>
      <Img w="5rem" src={logo} alt="logo" />
      <Signup />
    </VStack>
  );
};

export default SignupPage;
