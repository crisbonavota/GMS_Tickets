import { useAuthHeader } from "react-auth-kit";
import { HStack, IconButton, Text, VStack, useToast } from "@chakra-ui/react";
import { useState, useRef } from "react";
import { useMutation, useQueryClient } from "react-query";
import { AxiosError } from "axios";
import { postResource } from "../../../../../api/api";
import { IoMdAdd } from "react-icons/io";
import SyncSingleValueDropdownFilter from "../../../../../components/SyncSingleValueDropdownFilter";

interface Props {
    legacyUserId: number;
}

const AddPermission = ({ legacyUserId }: Props) => {
    const ref = useRef<any>(null);
    const [selected, setSelected] = useState<number | null>(null);
    const queryClient = useQueryClient();
    const toast = useToast();
    const getAuthHeader = useAuthHeader();

    const { mutateAsync: addPermission, isLoading } = useMutation(
        () =>
            postResource("groups", getAuthHeader(), {
                groupId: selected,
                legacyUserId,
            }),
        {
            onSuccess: () => {
                queryClient.resetQueries("groups");
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
                    description: <>"Check if the permission already exists"</>,
                    status: "error",
                    duration: 5000,
                    isClosable: true,
                });
            },
        }
    );
    return (
        <VStack w={"full"} alignItems={"flex-start"}>
            <HStack w={"full"} spacing={3}>
                <SyncSingleValueDropdownFilter
                    setter={setSelected}
                    title="Add new permission"
                    valueProp="id"
                    resource="groups"
                    labelProp="name"
                    isClearable
                />
                <HStack paddingTop={8}>
                    <IconButton
                        icon={<IoMdAdd size={20} />}
                        colorScheme={"green"}
                        disabled={!selected || isLoading}
                        isLoading={isLoading}
                        onClick={() => addPermission()}
                        aria-label="Add new permission"
                    />
                </HStack>
            </HStack>
        </VStack>
    );
};

export default AddPermission;
