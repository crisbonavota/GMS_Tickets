import { Text } from "@chakra-ui/react";
import { useMemo } from "react";
import { useAuthHeader } from "react-auth-kit";
import { useQuery } from "react-query";
import { getResourceListFilteredAndPaginated } from "../../../../api/api";
import { Employee } from "../../../../api/types";

interface Props {
    fileNumber: number;
}

const ImportPreviewEmployee = ({ fileNumber }: Props) => {
    const getAuthHeader = useAuthHeader();

    const {
        data: employees,
        isSuccess,
        isLoading,
    } = useQuery(
        ["employees"],
        () =>
            getResourceListFilteredAndPaginated<Employee>(
                "employees",
                getAuthHeader(),
                [],
                [],
                { field: "legacyUser.fullName", isAscending: true },
                0,
                10000
            ),
        {
            select: (r) => r.data,
        }
    );

    const employee = useMemo(
        () =>
            isSuccess
                ? employees.find((e) => e.fileNumber == fileNumber)
                : null,
        [isSuccess, employees, fileNumber]
    );

    return (
        <Text fontStyle={isLoading || !employee ? "italic" : "normal"}>
            {isLoading
                ? "Loading..."
                : employee
                ? employee.legacyUser.fullName
                : "Not found"}
        </Text>
    );
};

export default ImportPreviewEmployee;
