import { Thead, Tr, Th, Tbody, Td, Table, Box } from '@chakra-ui/react';
import { useTable, Cell } from 'react-table';
import { TimetrackItem } from '../api';

const columns = [
    { Header: 'File number', accessor: 'legacyUser.fileNumber' },
    { Header: 'Employee', accessor: 'legacyUser.fullName' },
    { Header: 'Business Unit', accessor: 'legacyUser.businessUnit.name' },
    { Header: 'Project', accessor: 'project.name' },
    { Header: 'Task', accessor: 'task' },
    { Header: 'Date', accessor: 'date' },
    { Header: 'Hours', accessor: 'hours' },
];

interface TableProps {
    tableData: Array<TimetrackItem>
}

export const TableComponent = ({ tableData }: TableProps) => {
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
                                    {column.render('Header')}
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
                            </Tr>
                        )
                    })}
                </Tbody>
            </Table>
        </Box>
    );
}

const renderTableCell = (cell: Cell<TimetrackItem | any>) => {
    switch (cell.column.Header) {
        case 'Date':
            return cell.value ? new Date(cell.value).toLocaleDateString() : '';

        case 'Hours':
            return cell.value ? cell.value.toFixed(2) : '';

        default:
            return cell.render('Cell')
    }
}

export default TableComponent;
