import { useAuthHeader } from "react-auth-kit";
import { HStack, IconButton, Text, VStack, useToast } from "@chakra-ui/react";
import AsyncSelect from "react-select/async";
import { useState, useRef } from "react";
import { AiOutlineUserAdd } from "react-icons/ai";
import { useMutation, useQueryClient } from "react-query";
import { AxiosError } from "axios";
import { getResourceList, postResource } from "../../../../../api/api";
import { LegacyUserPublic } from "../../../../../api/types";

interface Props {
    projectId: number;
}

const AddMember = ({ projectId }: Props) => {
    const ref = useRef<any>(null);
    const [selected, setSelected] = useState<number | null>(null);
    const queryClient = useQueryClient();
    const toast = useToast();
    const getAuthHeader = useAuthHeader();

    const getMembers = async (query: string) => {
        const res = await getResourceList<LegacyUserPublic>(
            `/projects/${projectId}/members/possible?query=${query}`,
            getAuthHeader()
        );

        return res.data.map((member) => ({
            label: member.fullName,
            value: member.id,
        }));
    };

    const { mutateAsync: addMember, isLoading } = useMutation(
        () =>
            postResource(`projects/${projectId}/members`, getAuthHeader(), {
                memberId: selected,
            }),
        {
            onSuccess: () => {
                queryClient.resetQueries(`project-${projectId}-members`);
                toast({
                    title: "Member added",
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
                    title: "Error adding member",
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
            <Text>Add new resource</Text>
            <HStack w={"full"} spacing={3}>
                <AsyncSelect
                    placeholder="Type for results..."
                    cacheOptions
                    loadOptions={getMembers}
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
                    onClick={() => addMember()}
                    aria-label="Add new member"
                />
            </HStack>
        </VStack>
    );
};

export default AddMember;
