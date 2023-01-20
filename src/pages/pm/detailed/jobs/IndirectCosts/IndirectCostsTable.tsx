import { IndirectCost } from "../../../../../api/types";
import moment from "moment";
import DeleteButton from "../../../../../components/DeleteButton";
import {
    DynamicTable,
    DynamicTableFormat,
} from "../../../../../components/DynamicTable/DynamicTable";

const format: DynamicTableFormat[] = [
    {
        header: "Description",
        accessor: "description",
    },
    {
        header: "Cost",
        accessor: "amount",
    },
    {
        header: "Currency",
        accessor: "currency.code",
    },
    {
        header: "Date (MM/DD/YYYY)",
        accessor: "date",
        accessorFn: (date: string) => moment(date).format("MM/DD/YYYY"),
    },
    {
        header: "",
        accessor: "id",
        accessorFn: (id: number) => (
            <DeleteButton
                resource="indirectCosts"
                resetQueries={"indirect-costs"}
                id={id}
            />
        ),
    },
];

interface Props {
    indirectCosts: IndirectCost[];
}

const IndirectCostsTable = ({ indirectCosts }: Props) => {
    return (
        <DynamicTable
            data={indirectCosts}
            format={format}
            emptyMessage="No indirect costs assigned in this project"
        />
    );
};

export default IndirectCostsTable;
