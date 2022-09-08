import { useMemo } from "react";
import { ImportUpdate } from "./ImportButton";
import {
    DynamicTableFormat,
    DynamicTable,
} from "../../../../components/DynamicTable/DynamicTable";
import ImportPreviewValidation from "./ImportPreviewValidation";
import ImportPreviewEdit from "./ImportPreviewEdit";
import ImportPreviewEmployee from "./ImportPreviewEmployee";

interface Props {
    updates: ImportUpdate[];
    setUpdates: React.Dispatch<React.SetStateAction<ImportUpdate[]>>;
}

export function ImportPreview({ updates, setUpdates }: Props) {
    const format: DynamicTableFormat[] = useMemo(
        () => [
            {
                header: "File number",
                accessor: "filenumber",
            },
            {
                header: "Employee",
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
                header: "Currency",
                accessor: "currency",
            },
            {
                header: "Amount",
                accessor: "amount",
            },
            {
                header: "",
                accessor: "",
                rawObject: true,
                accessorFn: (update: ImportUpdate) => (
                    <ImportPreviewValidation
                        update={update}
                        setUpdates={setUpdates}
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
                    />
                ),
            },
        ],
        []
    );

    return <DynamicTable data={updates} format={format} />;
}

export default ImportPreview;
