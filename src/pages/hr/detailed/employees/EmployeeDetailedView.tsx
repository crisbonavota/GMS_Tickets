import EmployeeDetailsTabsView from "./EmployeeDetailsTabsView";
import { useParams } from "react-router-dom";
import { useQuery } from "react-query";
import { getResource } from "../../../../api/api";
import { Employee } from "../../../../api/types";
import { useAuthHeader } from "react-auth-kit";
import { Flex, VStack, Text, HStack } from "@chakra-ui/react";
import { BsFillPersonFill } from "react-icons/bs";

const EmployeeDetailedView = () => {
  const { id } = useParams();
  const getAuthHeader = useAuthHeader();

  const { data, isSuccess } = useQuery(
    "employee",
    async () => getResource<Employee>(`employees/${id}`, getAuthHeader()),
    { select: (r) => r.data }
  );

  return (
    <>
      <VStack w={"full"} alignItems={"flex-start"}>
        <HStack alignItems={"center"} fontSize={"3xl"} p={1} marginLeft={"10%"}>
          <BsFillPersonFill color={"#3B8A7F"} />
          <Text color={"#448F85"} fontWeight={"bold"}>
            EMPLOYEE DETAILS
          </Text>
        </HStack>
        <Flex justifyContent={"space-between"} width={"100%"}>
          {isSuccess && <EmployeeDetailsTabsView employee={data} />}
        </Flex>
      </VStack>
    </>
  );
};

export default EmployeeDetailedView;
