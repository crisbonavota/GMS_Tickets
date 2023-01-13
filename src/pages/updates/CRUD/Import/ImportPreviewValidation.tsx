import { ImportUpdate } from "./ImportButton";
import { useAuthHeader } from "react-auth-kit";
import { useQuery } from "react-query";
import { getCurrencies, getResource } from "../../../../api/api";
import { LegacyUserPublic } from "../../../../api/types";
import { Icon, Spinner } from "@chakra-ui/react";
import { AiFillCheckCircle } from "react-icons/ai";
import { MdOutlineError } from "react-icons/md";

interface Props {
    update: ImportUpdate;
    setUpdates: React.Dispatch<React.SetStateAction<ImportUpdate[]>>;
    updateType: "monetary" | "structure" | null;
    setErrors: (errors: string[]) => void;
}

const ImportPreviewValidation = ({
    update,
    setUpdates,
    updateType,
    setErrors,
}: Props) => {
    const getAuthHeader = useAuthHeader();

    const {
        data: validation,
        isSuccess,
        isLoading,
    } = useQuery(
        ["validation", update],
        () => validateRow(update, getAuthHeader(), updateType),
        {
            onSuccess: (r) => {
                if (r.isValid) {
                    setUpdates((updates) =>
                        updates.map((u) =>
                            u === update ? { ...u, valid: true } : u
                        )
                    );
                }
                setErrors(r.errors);
            },
            retry: false,
            refetchOnWindowFocus: false,
        }
    );

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

const validateRow = async (
    update: ImportUpdate,
    authHeader: string,
    updateType: "monetary" | "structure" | null
) => {
    const errors: string[] = [];

    try {
        await getResource<LegacyUserPublic>(
            `users/legacy/${update.filenumber}`,
            authHeader
        );
    } catch (err) {
        errors.push("Employee not found");
    }

    const currency = getCurrencies().find((c) => c.code === update.currency);
    if (!currency && updateType === "monetary")
        errors.push("Currency not found");
    if (!update.amount) errors.push("Amount is required");
    if (
        updateType === "structure" &&
        update.amount !== undefined &&
        (update.amount < 0 || update.amount > 100)
    )
        errors.push("Amount must be between 0 and 100");
    if (!update.date) errors.push("Date is required");

    return {
        isValid: !errors.length,
        errors,
    };
};

export default ImportPreviewValidation;
