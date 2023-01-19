import { useParams } from "react-router-dom";
import { useQuery } from "react-query";
import { getResource } from "../../../../api/api";
import { Provider } from "../../../../api/types";
import { useAuthHeader } from "react-auth-kit";
import { Flex, VStack, Text, HStack, Box } from "@chakra-ui/react";
import { BsFillPersonFill } from "react-icons/bs";
import ProviderInfo from "./ProviderInfo";
import ProviderHeader from "./ProviderHeader";

const ProviderDetailedView = () => {
  const { id } = useParams();
  const getAuthHeader = useAuthHeader();

  const { data: provider, isSuccess } = useQuery(
    "provider",
    async () => getResource<Provider>(`providers/${id}`, getAuthHeader()),
    { select: (r) => r.data }
  );

  return (
    <>
      <VStack w={"full"} alignItems={"center"}>
        <HStack alignItems={"center"} fontSize={"3xl"} p={1}>
          <BsFillPersonFill color={"#3B8A7F"} />
          <Text color={"#448F85"} fontWeight={"bold"}>
            PROVIDER DETAILS
          </Text>
        </HStack>
        <Box>
        {isSuccess && <ProviderHeader provider={provider} />}
        {isSuccess && <ProviderInfo provider={provider} />}
        </Box>
      </VStack>
    </>
  );
};

export default ProviderDetailedView;
