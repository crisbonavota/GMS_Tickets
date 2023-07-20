import {
  VStack,
  Heading,
  Text,
  HStack,
  Avatar,
  Link,
  SimpleGrid,
  GridItem,
  Box,
} from "@chakra-ui/react";
import ticketing_logo from "../../assets/ticketing_logo.png";

const App = () => {
  return (
    <Box
      w={"full"}
      p={10}
      display="flex"
      justifyContent="center"
      alignItems="center"
    >
      <Box
        key={1}
        bgColor={"white"}
        p={5}
        borderColor={"lightgray"}
        borderWidth={1}
        w={"40%"}
        maxH={"92vh"}
      >
        <Link href={"/tickets"} w={"full"} h={"full"}>
          <VStack spacing={5} justifyContent={"center"} h={"full"} w={"full"}>
            <HStack>
              <Avatar
                borderColor={"lightgray"}
                borderWidth={2}
                src={ticketing_logo}
                size={"lg"}
              />
              <Heading fontSize={"lg"}>{"Ticketing"}</Heading>
            </HStack>
            <Text textAlign={"center"}>
              {"Manage and track your tickets efficiently."}
            </Text>
          </VStack>
        </Link>
      </Box>
    </Box>
  );
};

export default App;
