import { useQuery } from "react-query";
import { useAuthHeader } from "react-auth-kit";
import { HStack, Icon, Text, VStack } from "@chakra-ui/react";
import { AiOutlineUser } from "react-icons/ai";
import { getResourceList } from "../../../../../api/api";
import { GroupLegacyUser, LegacyUserPublic } from "../../../../../api/types";
import Loading from "../../../../pm/tabs/Loading";
import RemovePermission from "./RemovePermission";

interface Props {
    id: number;
}

const Permissions = ({ id }: Props) => {
    const getAuthHeader = useAuthHeader();
    const {
        data: permissions,
        isLoading,
        isSuccess,
    } = useQuery(
        `groups-${id}`,
        () =>
            getResourceList<GroupLegacyUser>(
                `/groups/${id}`,
                getAuthHeader()
            ),
        { select: (r) => r.data }
    );

    return (
        <VStack
            w={"full"}
            alignItems={"flex-start"}
            spacing={3}
            maxH={"50vh"}
            overflowY={"auto"}
        >
            {isLoading && <Loading />}
            {isSuccess && permissions && (
                <>
                    {permissions.map((p) => (
                        <HStack key={p.id} alignItems={"center"} w={"full"}>
                            <Icon boxSize={"2rem"} as={AiOutlineUser} />
                            <VStack alignItems={"flex-start"} w={"full"}>
                                <HStack alignItems={"center"} w={"full"}>
                                    <Text>{p.group.name}</Text>
                                    <RemovePermission
                                        id={id}
                                    />
                                </HStack>
                            </VStack>
                        </HStack>
                    ))}
                </>
            )}
            {isSuccess && !permissions?.length && (
                <Text>This user has no permissions</Text>
            )}
        </VStack>
    );
};

export default Permissions;
