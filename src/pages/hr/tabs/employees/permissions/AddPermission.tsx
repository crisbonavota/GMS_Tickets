import { useAuthHeader } from "react-auth-kit";
import { HStack, IconButton, Text, VStack, useToast } from "@chakra-ui/react";
import AsyncSelect from "react-select/async";
import { useState, useRef } from "react";
import { AiOutlineUserAdd } from "react-icons/ai";
import { useMutation, useQueryClient } from "react-query";
import { AxiosError } from "axios";
import { getResourceList, postResource, getResourceListFilteredAndPaginated } from '../../../../../api/api';
import { GroupLegacyUser, LegacyUserPublic } from "../../../../../api/types";

interface Props {
    groupId: number;
    businessUnitId: number;
    legacyUserId: number;
}

const AddPermission = ({ groupId, businessUnitId, legacyUserId }: Props) => {
    const ref = useRef<any>(null);
    const [selected, setSelected] = useState<number | null>(null);
    const queryClient = useQueryClient();
    const toast = useToast();
    const getAuthHeader = useAuthHeader();

    const getGroups = async (input: string) => {
        const res = await getResourceListFilteredAndPaginated<GroupLegacyUser>(
            "groups",
            getAuthHeader(),
            [{ field: "name", value: input }],
        );

        return res.data.map((permission) => ({
            label: permission.group.name,
            value: permission.group.id,
        }));
    };

    const { mutateAsync: addPermission, isLoading } = useMutation(
        () =>
            postResource(`groups`, getAuthHeader(), {
                groupId: selected,
            }),
        {
            onSuccess: () => {
                queryClient.resetQueries(`group`);
                toast({
                    title: "Permission added",
                    status: "success",
                    duration: 5000,
                    isClosable: true,
                });
                setSelected(null);
                ref.current?.clearValue();
            },
            onError: (err: AxiosError) => {
                console.error(err);
                toast({
                    title: "Error adding permission",
                    description: <>"Try again later"</>,
                    status: "error",
                    duration: 5000,
                    isClosable: true,
                });
            },
        }
    );
    return (
        <VStack w={"full"} alignItems={"flex-start"}>
            <Text>Add new permission</Text>
            <HStack w={"full"} spacing={3}>
                <AsyncSelect
                    placeholder="Type for results..."
                    cacheOptions
                    loadOptions={getGroups}
                    isClearable
                    styles={{
                        container: (base) => ({
                            ...base,
                            width: "100%",
                        }),
                    }}
                    noOptionsMessage={(props) =>
                        props.inputValue !== ""
                            ? "No results found, try different keywords"
                            : "Start typing to search for members"
                    }
                    onChange={(s) => setSelected(s ? s.value : null)}
                    ref={ref}
                />

                <IconButton
                    icon={<AiOutlineUserAdd size={20} />}
                    colorScheme={"green"}
                    disabled={!selected || isLoading}
                    isLoading={isLoading}
                    onClick={() => addPermission()}
                    aria-label="Add new permission"
                />
            </HStack>
        </VStack>
    );
};

export default AddPermission;
