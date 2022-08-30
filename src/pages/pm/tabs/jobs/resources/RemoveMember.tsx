import {
    IconButton,
    Popover,
    PopoverArrow,
    PopoverBody,
    PopoverContent,
    PopoverFooter,
    PopoverTrigger,
} from "@chakra-ui/react";
import { MdRemoveCircleOutline } from "react-icons/md";
import { Button, useToast } from "@chakra-ui/react";
import { useAuthHeader } from "react-auth-kit";
import { useMutation, useQueryClient } from "react-query";
import { AxiosError } from "axios";
import { deleteResource } from "../../../../../api/api";

interface Props {
    projectId: number;
    memberId: number;
}

const RemoveMember = ({ projectId, memberId }: Props) => {
    const queryClient = useQueryClient();
    const toast = useToast();
    const getAuthHeader = useAuthHeader();
    const { mutateAsync: removeMember, isLoading } = useMutation(
        () =>
            deleteResource(
                `projects/${projectId}/members`,
                memberId,
                getAuthHeader()
            ),
        {
            onSuccess: () => {
                toast({
                    title: "Member removed",
                    status: "success",
                    duration: 3000,
                    isClosable: true,
                });
                queryClient.resetQueries(`project-${projectId}-members`);
            },
            onError: (err: AxiosError) => {
                console.log(err);
                toast({
                    title: "Error removing member",
                    description: <>Try again later</>,
                    status: "error",
                    duration: 3000,
                    isClosable: true,
                });
            },
        }
    );

    return (
        <Popover placement="auto-end">
            <PopoverTrigger>
                <IconButton
                    icon={<MdRemoveCircleOutline />}
                    aria-label="Remove member"
                    variant={"ghost"}
                    colorScheme={"red"}
                    size={"sm"}
                />
            </PopoverTrigger>
            <PopoverContent w={"fit-content"}>
                <PopoverArrow />
                <PopoverBody>Are you sure?</PopoverBody>
                <PopoverFooter w={"full"}>
                    <Button
                        isDisabled={isLoading}
                        isLoading={isLoading}
                        w={"full"}
                        colorScheme={"red"}
                        size={"sm"}
                        onClick={() => removeMember()}
                    >
                        Remove
                    </Button>
                </PopoverFooter>
            </PopoverContent>
        </Popover>
    );
};

export default RemoveMember;
