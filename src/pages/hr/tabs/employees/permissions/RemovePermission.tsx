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
    id: number;
}

const RemovePermission = ({ id }: Props) => {
    const queryClient = useQueryClient();
    const toast = useToast();
    const getAuthHeader = useAuthHeader();
    const { mutateAsync: removePermission, isLoading } = useMutation(
        () =>
            deleteResource(
                `groups/${id}`,
                id,
                getAuthHeader()
            ),
        {
            onSuccess: () => {
                toast({
                    title: "Permission removed",
                    status: "success",
                    duration: 3000,
                    isClosable: true,
                });
                queryClient.resetQueries(`group-${id}`);
            },
            onError: (err: AxiosError) => {
                console.log(err);
                toast({
                    title: "Error removing permission",
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
                    aria-label="Remove permission"
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
                        onClick={() => removePermission()}
                    >
                        Remove
                    </Button>
                </PopoverFooter>
            </PopoverContent>
        </Popover>
    );
};

export default RemovePermission;
