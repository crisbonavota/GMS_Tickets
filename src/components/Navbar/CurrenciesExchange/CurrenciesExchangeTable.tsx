import moment from "moment";
import {
    DynamicTable,
    DynamicTableFormat,
} from "../../DynamicTable/DynamicTable";
import DeleteButton from "../../DeleteButton";
import { CurrencyExchange, Sort } from "../../../api/types";

const format: DynamicTableFormat[] = [
    {
        header: "Rate",
        accessor: "price",
        accessorFn: (price: number) => "$" + price.toFixed(2),
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
                resource="currencies/exchange"
                resetQueries={"currencies-exchange"}
                id={id}
            />
        ),
        disableSort: true,
    },
];

interface Props {
    data: CurrencyExchange[];
    totalPages: number | null;
    page: number;
    setPage: (page: number) => void;
    sort: Sort;
    setSort: (sort: Sort) => void;
}

const CurrenciesExchangeTable = ({
    data,
    totalPages,
    page,
    setPage,
    sort,
    setSort,
}: Props) => {
    return (
        <DynamicTable
            format={format}
            currentPage={page}
            setCurrentPage={setPage}
            data={data}
            totalPages={totalPages}
            sort={sort}
            setSort={setSort}
        />
    );
};

export default CurrenciesExchangeTable;
