import {
    Popover,
    PopoverTrigger,
    PopoverContent,
    PopoverArrow,
    PopoverCloseButton,
    PopoverHeader,
    PopoverBody,
    IconButton,
    PopoverFooter,
    Button,
    HStack,
} from "@chakra-ui/react";
import { HiUserRemove } from "react-icons/hi";
import { useDisclosure, useToast, useBoolean } from "@chakra-ui/react";
import { useMutation, useQueryClient } from "react-query";
import { useAuthHeader } from "react-auth-kit";
import { deleteResource } from "../../../api/api";
import { LegacyUserPublic } from "../../../api/types";

interface Props {
    active: boolean;
    member: LegacyUserPublic;
    projectId: number;
}

const RemoveMemberButton = ({ active, member, projectId }: Props) => {
    const { isOpen, onOpen, onClose } = useDisclosure();
    const [isMutating, setIsMutating] = useBoolean();
    const getAuthHeader = useAuthHeader();
    const queryClient = useQueryClient();
    const toast = useToast();

    const removeMemberMutation = useMutation(
        async () =>
            await deleteResource(
                `projects/${projectId}/members`,
                member.id,
                getAuthHeader()
            ),
        {
            onMutate: () => {
                onClose();
                setIsMutating.on();
                queryClient.cancelQueries([`members-${projectId}`]);
                queryClient.cancelQueries([`members-possible-${projectId}`]);
            },
            onSuccess: () => {
                queryClient.resetQueries([`members-${projectId}`]);
                queryClient.resetQueries([`members-possible-${projectId}`]);
                toast({
                    title: "Removed member from project",
                    status: "success",
                    position: "top",
                    duration: 2000,
                });
                setIsMutating.off();
            },
            onError: (err: any) => {
                toast({
                    title: "Failed to remove member to project",
                    description: err.message | err,
                    status: "error",
                    position: "top",
                    duration: 2000,
                });
                setIsMutating.off();
            },
        }
    );

    return (
        <Popover isOpen={isOpen} onOpen={onOpen} onClose={onClose}>
            <PopoverTrigger>
                <IconButton
                    icon={<HiUserRemove />}
                    aria-label="Remove member"
                    colorScheme={"red"}
                    size={"xs"}
                    disabled={!active || isMutating}
                    isLoading={isMutating}
                />
            </PopoverTrigger>
            <PopoverContent>
                <PopoverArrow />
                <PopoverCloseButton />
                <PopoverHeader>Confirmation</PopoverHeader>
                <PopoverBody>
                    Are you sure you want to remove {member.fullName} from the
                    project?
                </PopoverBody>
                <PopoverFooter>
                    <HStack w={"full"} justifyContent={"flex-end"}>
                        <Button
                            colorScheme={"gray"}
                            onClick={onClose}
                            size={"sm"}
                        >
                            Cancel
                        </Button>
                        <Button
                            colorScheme={"red"}
                            size={"sm"}
                            onClick={async () =>
                                await removeMemberMutation.mutateAsync()
                            }
                        >
                            Confirm
                        </Button>
                    </HStack>
                </PopoverFooter>
            </PopoverContent>
        </Popover>
    );
};
export default RemoveMemberButton;
