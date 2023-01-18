import { HStack, Box, Avatar } from "@chakra-ui/react";
import { useQuery } from "react-query";
import { client } from "../../../api/api";
import { Employee } from "../../../api/types";
import EditEmployeeButton from "../creation-edition/EditEmployeeButton";
import { useAuthHeader } from "react-auth-kit";
import { InfoTitle } from "../../pm/detailed/InfoBox"; 

type Props = {
  resource: Employee;
  tabIndex: number;
  setTabIndex: (tabIndex: number) => void;
};

const EmployeeDetailedViewHeaderComponent = ({
  resource,
  tabIndex,
  setTabIndex,
}: Props) => {
  const getAuthHeader = useAuthHeader();

  const { data: employeeImage, isError } = useQuery(
    ["getEmployeeImage", resource.id],
    async () =>
      await client.get<string>(`employees/${resource.legacyUser.id}/image`, {
        headers: { Authorization: getAuthHeader() },
      }),
    { select: (r) => r.data },
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
          <Avatar variant={"circle"} size={"xl"} src={employeeImage} />
        </Box>
        <Box>
          <InfoTitle title={"File Number"} content={resource?.fileNumber.toString()} colour={"#FFFFFF"}/>
        </Box>
        <Box>
          <InfoTitle title={"First Name"} content={resource?.firstName} colour={"#FFFFFF"}/>
        </Box>
        <Box>
          <InfoTitle title={"Last Name"} content={resource?.lastName} colour={"#FFFFFF"}/>
        </Box>
        <Box>
          <InfoTitle title={"Status"} content={resource?.active === true ? "Active" : "Inactive"} colour={"#FFFFFF"}/>
        </Box>
        <Box>
          <InfoTitle title={"Team"} content={resource?.legacyUser?.businessUnit?.name.split("(")[0]} colour={"#FFFFFF"}/>
        </Box>
        <Box>
          <InfoTitle title={"Role"} content={resource?.position?.name} colour={"#FFFFFF"}/>
        </Box>
        <Box>
          <InfoTitle title={"Location"} content={resource?.country?.name} colour={"#FFFFFF"} />
        </Box>
        <EditEmployeeButton
          employee={resource}
          tabIndex={tabIndex}
          setTabIndex={setTabIndex}
          colour={"whiteAlpha"}
          variant={"outline"}
          size={"lg"}
        />
      </HStack>
    </Box>
  );
};

export default EmployeeDetailedViewHeaderComponent;


