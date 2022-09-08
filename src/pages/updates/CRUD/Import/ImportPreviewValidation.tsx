import { ImportUpdate } from "./ImportButton";
import { useAuthHeader } from "react-auth-kit";
import { useQuery } from "react-query";
import {
    getCurrencies,
    getResourceListFilteredAndPaginated,
} from "../../../../api/api";
import { Employee } from "../../../../api/types";
import { Icon, Spinner } from "@chakra-ui/react";
import { AiFillCheckCircle } from "react-icons/ai";
import { MdOutlineError } from "react-icons/md";
import { useMemo, useEffect } from "react";

interface Props {
    update: ImportUpdate;
    setUpdates: React.Dispatch<React.SetStateAction<ImportUpdate[]>>;
}

const ImportPreviewValidation = ({ update, setUpdates }: Props) => {
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

    const validation = useMemo(
        () => (isSuccess ? validateRow(update, employees) : null),
        [isSuccess, update, employees]
    );

    useEffect(() => {
        if (validation?.isValid) {
            setUpdates((updates) =>
                updates.map((u) => (u === update ? { ...u, valid: true } : u))
            );
        }
    }, [validation]);

    return (
        <>
            {isLoading && <Spinner />}
            {isSuccess && (
                <>
                    {validation?.isValid ? (
                        <Icon
                            boxSize={6}
                            as={AiFillCheckCircle}
                            color={"green"}
                        />
                    ) : (
                        <Icon boxSize={6} as={MdOutlineError} color={"red"} />
                    )}
                </>
            )}
        </>
    );
};

const validateRow = (update: ImportUpdate, employees: Employee[]) => {
    const employee = employees.find(
        (e) => e.fileNumber.toString() === update.filenumber?.toString()
    );
    const currency = getCurrencies().find((c) => c.code === update.currency);
    const errors: string[] = [];

    if (!employee) errors.push("Employee not found");
    if (!currency) errors.push("Currency not found");
    if (!update.amount) errors.push("Amount is required");
    if (!update.date) errors.push("Date is required");

    if (errors.length)
        return {
            isValid: false,
            errors,
        };

    return {
        isValid: true,
        errors: [],
    };
};

export default ImportPreviewValidation;
