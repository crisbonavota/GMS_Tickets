import { Project } from "../../../api/types";
import {
    DynamicTableFormat,
    DynamicTable,
} from "../../../components/DynamicTable/DynamicTable";
import JobType from "../tabs/jobs/JobType";
import DetailsButton from "./DetailsButton";

interface Props {
    jobs: Project[];
    totalPages: number;
    page: number;
    setPage: (page: number) => void;
}

const format: DynamicTableFormat[] = [
    {
        header: "Job",
        accessor: "name",
    },
    {
        header: "Type",
        accessor: "sold",
        accessorFn: (sold: boolean) => <JobType sold={sold} />,
    },
    {
        header: "Details",
        accessor: "id",
        accessorFn: (id: number) => <DetailsButton path="jobs" id={id} />,
    },
];

const JobsTable = ({ jobs, totalPages, page, setPage }: Props) => {
    return (
        <DynamicTable
            format={format}
            currentPage={page}
            setCurrentPage={setPage}
            data={jobs}
            totalPages={isNaN(totalPages) ? null : totalPages}
        />
    );
};

export default JobsTable;
