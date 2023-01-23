import { useMemo, useState } from "react";
import { ImportUpdate } from "./ImportButton";
import {
    DynamicTableFormat,
    DynamicTable,
} from "../../../../components/DynamicTable/DynamicTable";
import ImportPreviewValidation from "./ImportPreviewValidation";
import ImportPreviewEdit from "./ImportPreviewEdit";
import ImportPreviewEmployee from "./ImportPreviewEmployee";
import { List, ListItem, Text, VStack } from "@chakra-ui/react";

interface Props {
    updates: ImportUpdate[];
    setUpdates: React.Dispatch<React.SetStateAction<ImportUpdate[]>>;
    updateType: "monetary" | "structure" | null;
}

export function ImportPreview({ updates, setUpdates, updateType }: Props) {
    const [errors, setErrors] = useState<string[]>([]);
    const format: DynamicTableFormat[] = useMemo(
        () => [
            {
                header: "File number",
                accessor: "filenumber",
            },
            {
                header: "Employee/Provider",
                accessor: "filenumber",
                accessorFn: (fileNumber: number) => (
                    <ImportPreviewEmployee fileNumber={fileNumber} />
                ),
            },
            {
                header: "Date",
                accessor: "date",
            },
            {
                header: "Amount",
                accessor: "amount",
            },
        ],
        [updateType, updates]
    );

    // workaround for validation and edit to always be last columns
    const validationAndEdit = [
        {
            header: "",
            accessor: "",
            rawObject: true,
            accessorFn: (update: ImportUpdate) => (
                <ImportPreviewValidation
                    update={update}
                    setUpdates={setUpdates}
                    updateType={updateType}
                    setErrors={setErrors}
                />
            ),
        },
        {
            header: "",
            accessor: "",
            rawObject: true,
            accessorFn: (update: ImportUpdate) => (
                <ImportPreviewEdit
                    setUpdates={setUpdates}
                    update={update}
                    updateType={updateType}
                />
            ),
        },
    ];

    return (
        <VStack alignItems={"flex-start"}>
            <DynamicTable
                data={updates}
                format={
                    updateType === "monetary"
                        ? [
                              ...format,
                              { header: "Currency", accessor: "currency" },
                              ...validationAndEdit,
                          ]
                        : [...format, ...validationAndEdit]
                }
            />
            {errors.length && (
                <List>
                    {errors.map((error, index) => (
                        <ListItem fontSize={"sm"} key={index} color={"red.500"}>
                            {error}
                        </ListItem>
                    ))}
                </List>
            )}
        </VStack>
    );
}

export default ImportPreview;
