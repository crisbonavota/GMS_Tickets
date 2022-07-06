import { Company } from '@gms-micro/api-utils';
import moment from 'moment';
import { momentToLocaleDateString } from '@gms-micro/datetime-utils';
import { DynamicTable, DynamicTableFormat } from '@gms-micro/table-utils';
import { HStack, Link, Text } from '@chakra-ui/react';
import { BsSearch } from 'react-icons/bs';
import { Link as RouterLink } from 'react-router-dom';
import { Sort } from '@gms-micro/api-filters';

interface Props {
    clients: Company[];
    sort: Sort;
    setSort: (sort: Sort) => void;
}

const format: DynamicTableFormat[] = [
    {
        header: 'client',
        accessor: 'name',
    },
    {
        header: 'Country',
        accessor: 'country.name',
    },
    {
        header: 'Creation Date',
        accessor: 'creationDate',
        accessorFn: (r: string) => momentToLocaleDateString(moment(r)),
    },
    {
        header: 'Status',
        accessor: 'active',
        accessorFn: (r: boolean) => (
            <Text color={r ? 'green' : 'red'}>
                {r ? 'Active' : 'Not active'}
            </Text>
        ),
    },
    {
        header: 'Details',
        accessor: 'id',
        accessorFn: (id: string) => (
            <HStack w={'full'}>
                <Link as={RouterLink} to={`clients/${id}`} w={'fit-content'}>
                    <BsSearch color={'orangered'} />
                </Link>
            </HStack>
        ),
    },
];

const ClientsTable = ({ clients, sort, setSort }: Props) => {
    return (
        <DynamicTable
            format={format}
            data={clients}
            sort={sort}
            setSort={setSort}
        />
    );
};

export default ClientsTable;
