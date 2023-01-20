import { Text } from "@chakra-ui/react";
import { useAuthHeader } from "react-auth-kit";
import { useQuery } from "react-query";
import { getResource } from "../../../../api/api";
import { LegacyUserPublic } from "../../../../api/types";

interface Props {
    fileNumber: number;
}

const ImportPreviewEmployee = ({ fileNumber }: Props) => {
    const getAuthHeader = useAuthHeader();

    const {
        data: legacyUser,
        isSuccess,
        isLoading,
    } = useQuery(
        ["legacyUser", fileNumber],
        () =>
            getResource<LegacyUserPublic>(
                `users/legacy/${fileNumber}`,
                getAuthHeader()
            ),
        {
            select: (r) => r.data,
            retry: false,
            refetchOnWindowFocus: false,
        }
    );

    return (
        <Text fontStyle={isLoading || !isSuccess ? "italic" : "normal"}>
            {isLoading
                ? "Loading..."
                : isSuccess
                ? legacyUser.fullName
                : "Not found"}
        </Text>
    );
};

export default ImportPreviewEmployee;
