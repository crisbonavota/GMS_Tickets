import { Thead, Tr, Th, Tbody, Td, Table, Box, Text, HStack, Icon } from '@chakra-ui/react';
import { Sort } from '@gms-micro/api-filters';
import { Employee } from '@gms-micro/api-utils';
import { useTable, Cell } from 'react-table';
import { BsChevronDown, BsChevronUp } from 'react-icons/bs';
import EditModal from '../edit-modal/edit-modal';

const TABLE_DATA = [
    { header: "File number", accessor: "fileNumber" },
    { header: "Name", accessor: "legacyUser.fullName" },
    { header: "CUIT", accessor: "afipId" },
    { header: "Position", accessor: "position.name" },
    { header: "Birth date", accessor: "birthDate" },
    { header: "Email", accessor: "email" },
    { header: "Mobile phone", accessor: "mobilePhone" },
    { header: "Salary currency", accessor: "salaryCurrency.code" },
    { header: "Country", accessor: "country.name" },
    { header: "Active", accessor: "active" }
]

const columns = TABLE_DATA.map(column => {
    return {
        Header: column.header,
        accessor: column.accessor
    }
});

const onHeaderClick = (id: string, sort: Sort, setSort: (sort: Sort) => void) => {
    const isAlreadySorted = sort.field === id;
    setSort({ field: id, isAscending: isAlreadySorted ? !sort.isAscending : true });
}

interface TableProps {
    tableData: Array<Employee>,
    sort: Sort,
    setSort: (sort: Sort) => void
}

export const TableComponent = ({ tableData, sort, setSort }: TableProps) => {
    // @ts-ignore
    const tableInstance = useTable({ columns, data: tableData });

    const {
        getTableProps,
        getTableBodyProps,
        headerGroups,
        rows,
        prepareRow,
    } = tableInstance;

    return (
        <Box w={'full'} maxW={'full'} overflowX={'auto'} bgColor={'white'} borderRadius={5}>
            <Table {...getTableProps()} w={'full'} h={'fit-content'}>
                <Thead>
                    {headerGroups.map(headerGroup => (
                        <Tr {...headerGroup.getHeaderGroupProps()}>
                            {headerGroup.headers.map(column => (
                                <Th {...column.getHeaderProps()}>
                                    {<HStack cursor={'pointer'} w={'fit-content'} onClick={() => onHeaderClick(column.id, sort, setSort)}>
                                        <Text>{column.render('Header')}</Text>
                                        {sort.field === column.id &&
                                            (sort.isAscending ?
                                                <Icon fontWeight={'bold'} as={BsChevronUp} /> :
                                                <Icon fontWeight={'bold'} as={BsChevronDown} />)}
                                    </HStack>}
                                </Th>
                            ))}
                        </Tr>
                    ))}
                </Thead>
                <Tbody {...getTableBodyProps()}>
                    {rows.map(row => {
                        prepareRow(row)
                        return (
                            <Tr {...row.getRowProps()}>
                                {row.cells.map(cell => {
                                    return (
                                        <Td {...cell.getCellProps()}>
                                            {renderTableCell(cell)}
                                        </Td>
                                    )
                                })}
                                <Td>
                                    <EditModal employee={row.original} />
                                </Td>
                            </Tr>
                        )
                    })}
                </Tbody>
            </Table>
        </Box>
    );
}

const renderTableCell = (cell: Cell<Employee | any>) => {
    switch (cell.column.Header) {
        case 'Entry date':
        case 'Birth date':
            return (cell.value && cell.value !== "0001-01-01T00:00:00") ? new Date(cell.value).toLocaleDateString() : '';

        case 'Active':
            return cell.value ? <Text color={'green'}>Yes</Text> : <Text color={'red'}>No</Text>;

        default:
            return cell.render('Cell');
    }
}

export default TableComponent;
