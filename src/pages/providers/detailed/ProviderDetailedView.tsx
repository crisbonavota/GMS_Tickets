import { useParams } from "react-router-dom";
import { useQuery } from "react-query";
import { useAuthHeader } from "react-auth-kit";
import { VStack, Text, HStack, Box } from "@chakra-ui/react";
import { BsFillPersonFill } from "react-icons/bs";
import ProviderInfo from "./ProviderInfo";
import ProviderHeader from "./ProviderHeader";
import { getResource } from "../../../api/api";
import { Provider } from "../../../api/types";

const ProviderDetailedView = () => {
  const { id } = useParams();
  const getAuthHeader = useAuthHeader();

  const { data: provider, isSuccess } = useQuery(
    "provider",
    async () => getResource<Provider>(`providers/${id}`, getAuthHeader()),
    { select: (r) => r.data }
  );

  return (
      <VStack w={"full"}>
        <VStack alignItems={"flex-start"} w={"full"} >
          <HStack alignItems={"center"} fontSize={"3xl"} p={1} marginLeft={"10%"} marginTop={"2rem"}>
            <BsFillPersonFill color={"#3B8A7F"} />
            <Text color={"#448F85"} fontWeight={"bold"}>
              PROVIDER DETAILS
            </Text>
          </HStack>
        </VStack>
        <Box alignItems={"center"} paddingTop={10} w={"80%"}>
        {isSuccess && <ProviderHeader provider={provider} />}
        {isSuccess && <ProviderInfo provider={provider} />}
        </Box>
      </VStack>
  );
};

export default ProviderDetailedView;
