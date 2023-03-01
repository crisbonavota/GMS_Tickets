import { useParams } from "react-router-dom";
import { useQuery } from "react-query";
import { getResource } from "../../../../api/api";
import { Training } from "../../../../api/types";
import { useAuthHeader } from "react-auth-kit";
import { VStack, Text, HStack, Box } from "@chakra-ui/react";
import { BsFillPersonFill } from "react-icons/bs";
import TrainingHeader from "./TrainingHeader";
import TrainingInfo from "./TrainingInfo";

const TrainingDetailedView = () => {
    const { id } = useParams();
    const getAuthHeader = useAuthHeader();

    const { data: training, isSuccess } = useQuery(
        "training",
        async () => getResource<Training>(`trainings/${id}`, getAuthHeader()),
        { select: (r) => r.data }
    );

    return (
        <VStack w={"full"}>
            <VStack alignItems={"flex-start"} w={"full"}>
                <HStack
                    alignItems={"center"}
                    fontSize={"3xl"}
                    p={1}
                    marginLeft={"10%"}
                    marginTop={"2rem"}
                >
                    <BsFillPersonFill color={"#3B8A7F"} />
                    <Text color={"#448F85"} fontWeight={"bold"}>
                        TRAINING DETAILS
                    </Text>
                </HStack>
            </VStack>
            <Box alignItems={"center"} paddingTop={10} w={"80%"}>
                {isSuccess && <TrainingHeader training={training} />}
                {isSuccess && <TrainingInfo training={training} />}
            </Box>
        </VStack>
    );
};

export default TrainingDetailedView;
