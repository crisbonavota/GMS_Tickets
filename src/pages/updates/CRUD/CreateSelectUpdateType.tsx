import {
    Text,
    Menu,
    MenuButton,
    MenuList,
    IconButton,
    VStack,
} from "@chakra-ui/react";
import { useAuthHeader } from "react-auth-kit";
import { VscNewFile } from "react-icons/vsc";
import { useQuery } from "react-query";
import { getResourceList } from "../../../api/api";
import { UpdateType } from "../../../api/types";
import CreateButton from "./CreateButton";

const CreateSelectUpdateType = () => {
    const getAuthHeader = useAuthHeader();
    const updateTypesQuery = useQuery(["updateTypes"], () =>
        getResourceList<UpdateType>("updates/types", getAuthHeader())
    );

    if (updateTypesQuery.isError)
        return <Text>Error: {JSON.stringify(updateTypesQuery.error)}</Text>;

    return (
        <Menu>
            <VStack>
                <Text fontSize={"sm"}>Create</Text>
                <MenuButton>
                    <IconButton
                        isLoading={updateTypesQuery.isLoading}
                        size={"lg"}
                        icon={<VscNewFile />}
                        aria-label="Create"
                        colorScheme={"green"}
                    />
                </MenuButton>
            </VStack>
            <MenuList maxH={"50vh"} overflowY={"auto"}>
                {updateTypesQuery.isSuccess &&
                    updateTypesQuery.data.data.map((type) => (
                        <CreateButton updateType={type} key={type.id} />
                    ))}
            </MenuList>
        </Menu>
    );
};

export default CreateSelectUpdateType;
