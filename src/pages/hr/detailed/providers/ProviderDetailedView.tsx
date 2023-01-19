import { useParams } from "react-router-dom";
import { useQuery } from "react-query";
import { getResource } from "../../../../api/api";
import { Provider } from "../../../../api/types";
import { useAuthHeader } from "react-auth-kit";
import { Flex, VStack, Text, HStack } from "@chakra-ui/react";
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
      <VStack w={"full"} alignItems={"flex-start"}>
        <HStack alignItems={"center"} fontSize={"3xl"} p={1} marginLeft={"10%"}>
          <BsFillPersonFill color={"#3B8A7F"} />
          <Text color={"#448F85"} fontWeight={"bold"}>
            PROVIDER DETAILS
          </Text>
        </HStack>
        {isSuccess && <ProviderHeader provider={provider} />}
        <Flex justifyContent={"space-between"} width={"100%"}>
          {isSuccess && <ProviderInfo provider={provider} />}
        </Flex>
      </VStack>
    </>
  );
};

export default ProviderDetailedView;