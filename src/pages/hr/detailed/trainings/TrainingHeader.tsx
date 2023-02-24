import { HStack, Box, Avatar } from "@chakra-ui/react";
import { useQuery } from "react-query";
import { useAuthHeader } from "react-auth-kit";
import { Training } from "../../../../api/types";
import { getResource } from "../../../../api/api";
import { InfoTitle } from "../../../pm/detailed/InfoBox";
// import ProviderDetailedEditButton from "./ProviderDetailedEditButton";

type Props = {
  training: Training;
};

const TrainingHeader = ({ training }: Props) => {
  const getAuthHeader = useAuthHeader();

  const { data: userImage } = useQuery(
    ["user-image", training.id],
    async () =>
      getResource<string>(
        `users/${training.legacyUser.id}/image`,
        getAuthHeader()
      ),
    { select: (r) => r.data }
  );

  return (
    <Box>
      <HStack
        justifyContent={"space-evenly"}
        bgColor={"#4F968C"}
        borderTopLeftRadius={"1.18rem"}
        borderTopRightRadius={"1.18rem"}
        boxShadow={"2xl"}
        padding={"1.5rem"}
        width={"full"}
      >
        <Box>
          <Avatar bg={"teal.500"} variant={"circle"} size={"xl"} src={userImage} />
        </Box>
        <Box>
          <InfoTitle
            title={"Full Name"}
            content={training.legacyUser.fullName}
            color={"#FFFFFF"}
          />
        </Box>
        <Box>
          <InfoTitle
            title={"Training Name"}
            content={training.name}
            color={"#FFFFFF"}
          />
        </Box>
        <Box>
          <InfoTitle
            title={"Company Name"}
            content={training.companyName}
            color={"#FFFFFF"}
          />
        </Box>
        {/* <ProviderDetailedEditButton provider={provider}/> */}
      </HStack>
    </Box>
  );
};

export default TrainingHeader;