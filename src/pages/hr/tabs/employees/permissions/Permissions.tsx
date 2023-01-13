import { useQuery } from "react-query";
import { useAuthHeader } from "react-auth-kit";
import { HStack, Icon, Text, VStack } from "@chakra-ui/react";
import { getResourceList } from "../../../../../api/api";
import { GroupLegacyUser} from "../../../../../api/types";
import Loading from "../../../../pm/tabs/Loading";
import RemovePermission from "./RemovePermission";
import { VscGear } from "react-icons/vsc";

interface Props {
    legacyUserId: number;
}

const Permissions = ({ legacyUserId }: Props) => {
    const getAuthHeader = useAuthHeader();
    const {
        data: permissions,
        isLoading,
        isSuccess,
    } = useQuery(
        ["groups", legacyUserId],
        () =>
            getResourceList<GroupLegacyUser>(
                `/groups/${legacyUserId}`,
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
                            <Icon boxSize={"2rem"} as={VscGear} />
                            <VStack alignItems={"flex-start"} w={"full"}>
                                <HStack alignItems={"center"} w={"full"}>
                                    <Text>{p.group.name}</Text>
                                    <RemovePermission
                                        groupId={p.id}
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
