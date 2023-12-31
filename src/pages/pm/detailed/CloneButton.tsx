import { Button, useToast } from "@chakra-ui/react";
import { FaClone } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { useMutation } from "react-query";
import { client } from "../../../api/api";
import { useAuthHeader } from "react-auth-kit";

interface Props {
    id: number;
    resource: string;
    route: string;
}

const CloneButton = ({ id, resource, route }: Props) => {
    const navigate = useNavigate();
    const getAuthHeader = useAuthHeader();
    const toast = useToast();

    const { isLoading, mutateAsync: clone } = useMutation(
        () =>
            client.post<number>(
                `${resource}/${id}/clone`,
                {},
                {
                    headers: {
                        Authorization: getAuthHeader(),
                    },
                }
            ),
        {
            onSuccess: (res) => {
                toast({
                    status: "success",
                    title: `Cloned ${route.substring(
                        0,
                        route.length - 1
                    )}`,
                });
                navigate(`/project-management/${route}/${res.data}`);
            },
            onError: (err) => {
                console.error(err);
                toast({
                    status: "error",
                    title: "There was an error cloning the job",
                    description: "Try again later",
                });
            },
        }
    );

    return (
        <Button
            isLoading={isLoading}
            isDisabled={isLoading}
            colorScheme={"orange"}
            variant={"ghost"}
            leftIcon={<FaClone />}
            onClick={async () => await clone()}
        >
            Clone
        </Button>
    );
};

export default CloneButton;
