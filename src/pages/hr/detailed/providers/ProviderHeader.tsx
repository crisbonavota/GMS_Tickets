import { HStack, Box, Avatar } from "@chakra-ui/react";
import { useQuery } from "react-query";
import { useAuthHeader } from "react-auth-kit";
import { Provider } from "../../../../api/types";
import { getResource } from "../../../../api/api";
import { InfoTitle } from "../../../pm/detailed/InfoBox";

type Props = {
  provider: Provider;
};

const ProviderHeader = ({ provider }: Props) => {
  const getAuthHeader = useAuthHeader();

  const { data: userImage } = useQuery(
    ["user-image", provider.id],
    async () =>
      getResource<string>(
        `users/${provider.legacyUser.id}/image`,
        getAuthHeader()
      ),
    { select: (r) => r.data }
  );

  return (
    <Box>
      <HStack
        justifyContent={"space-evenly"}
        alignItems={"center"}
        bgColor={"#4F968C"}
        borderTopLeftRadius={"1.18rem"}
        borderTopRightRadius={"1.18rem"}
        boxShadow={"2xl"}
        padding={"2rem"}
        marginLeft={"12rem"}
        marginRight={"12rem"}
      >
        <Box>
          <Avatar bg={"teal.500"} variant={"circle"} size={"xl"} src={userImage} />
        </Box>
        <Box>
          <InfoTitle
            title={"File Number"}
            content={provider.fileNumber.toString()}
            color={"#FFFFFF"}
          />
        </Box>
        <Box>
          <InfoTitle
            title={"First Name"}
            content={provider.firstName}
            color={"#FFFFFF"}
          />
        </Box>
        <Box>
          <InfoTitle
            title={"Last Name"}
            content={provider.lastName}
            color={"#FFFFFF"}
          />
        </Box>
        <Box>
          <InfoTitle
            title={"Status"}
            content={provider.active === true ? "Active" : "Inactive"}
            color={"#FFFFFF"}
          />
        </Box>
        <Box>
          <InfoTitle
            title={"Business Unit"}
            content={provider.legacyUser?.businessUnit?.name.split("(")[0]}
            color={"#FFFFFF"}
          />
        </Box>
      </HStack>
    </Box>
  );
};

export default ProviderHeader;