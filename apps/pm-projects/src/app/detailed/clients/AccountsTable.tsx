import { Account } from '@gms-micro/api-utils';
import { DynamicTable, DynamicTableFormat } from '@gms-micro/table-utils';
import { Link } from '@chakra-ui/react';
import { Link as RouterLink } from 'react-router-dom';
import { BiSearch } from 'react-icons/bi';
import DetailsButton from '../DetailsButton';

interface Props {
    accounts: Account[];
    totalPages: number;
    page: number;
    setPage: (page: number) => void;
}

const format: DynamicTableFormat[] = [
    {
        header: 'account',
        accessor: 'name',
    },
    {
        header: 'Country',
        accessor: 'country.name',
    },
    {
        header: 'Details',
        accessor: 'id',
        accessorFn: (id: number) => <DetailsButton path="accounts" id={id} />,
    },
];

const AccountsTable = ({ accounts, totalPages, page, setPage }: Props) => {
    return (
        <DynamicTable
            format={format}
            currentPage={page}
            setCurrentPage={setPage}
            data={accounts}
            totalPages={isNaN(totalPages) ? null : totalPages}
        />
    );
};

export default AccountsTable;
