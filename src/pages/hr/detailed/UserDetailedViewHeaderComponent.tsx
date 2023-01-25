import { HStack, Box, Avatar } from "@chakra-ui/react";
import { useQuery } from "react-query";
import { getResource } from "../../../api/api";
import { Employee } from "../../../api/types";
import EditDetailedButton from "./EditDetailedButton";
import { useAuthHeader } from "react-auth-kit";
import { InfoTitle } from "../../pm/detailed/InfoBox";

interface Props {
    resource: Employee;
    tabIndex: number;
    setTabIndex: (tabIndex: number) => void;
}

const EmployeeDetailedViewHeaderComponent = ({
    resource,
    tabIndex,
    setTabIndex,
}: Props) => {
    const getAuthHeader = useAuthHeader();

    const { data: userImage } = useQuery(
        ["user-image", resource.id],
        async () =>
            getResource<string>(
                `users/${resource.legacyUser.id}/image`,
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
                    <Avatar
                        bg={"teal.500"}
                        variant={"circle"}
                        size={"xl"}
                        src={userImage}
                    />
                </Box>
                <Box>
                    <InfoTitle
                        title={"File Number"}
                        content={resource.fileNumber.toString()}
                        color={"#FFFFFF"}
                    />
                </Box>
                <Box>
                    <InfoTitle
                        title={"First Name"}
                        content={resource.firstName}
                        color={"#FFFFFF"}
                    />
                </Box>
                <Box>
                    <InfoTitle
                        title={"Last Name"}
                        content={resource.lastName}
                        color={"#FFFFFF"}
                    />
                </Box>
                <Box>
                    <InfoTitle
                        title={"Status"}
                        content={
                            resource.active === true ? "Active" : "Inactive"
                        }
                        color={"#FFFFFF"}
                    />
                </Box>
                <Box>
                    <InfoTitle
                        title={"Business Unit"}
                        content={
                            resource.legacyUser?.businessUnit?.name.split(
                                "("
                            )[0]
                        }
                        color={"#FFFFFF"}
                    />
                </Box>
                <Box>
                    <InfoTitle
                        title={"Role"}
                        content={resource.position?.name}
                        color={"#FFFFFF"}
                    />
                </Box>
                <Box>
                    <InfoTitle
                        title={"Location"}
                        content={resource.country?.name}
                        color={"#FFFFFF"}
                    />
                </Box>
                <EditDetailedButton
                    employee={resource}
                    tabIndex={tabIndex}
                    setTabIndex={setTabIndex}
                />
            </HStack>
        </Box>
    );
};

export default EmployeeDetailedViewHeaderComponent;
