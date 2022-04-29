import { Thead, Tr, Th, Tbody, Td, Table, Box, Text } from '@chakra-ui/react';
import { Update } from '@gms-micro/api-utils';
import { useTable, Cell } from 'react-table';

const columns = [
    { Header: 'Employee', accessor: 'legacyUser.fullName' },
    { Header: 'Update Type', accessor: 'updateType.caption' },
    { Header: 'Date', accessor: 'date' },
    { Header: 'End Date', accessor: 'endDate' },
    { Header: 'Amount', accessor: 'amount' },
    { Header: 'Currency', accessor: 'amountCurrency.code' },
    { Header: 'Motive', accessor: 'motive' },
    { Header: 'Date Telegram', accessor: 'dateTelegram' },
    //{ Header: 'Week Day', accessor: 'weekDay' },
    { Header: 'New Date', accessor: 'newDate' },
    { Header: 'Notes', accessor: 'note' },
];

interface TableProps {
    tableData: Array<Update>
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

const renderTableCell = (cell: Cell<Update | any>) => {
    switch (cell.column.Header) {
        case 'Date':
        case 'Date Telegram':
        case 'New Date':
        case 'End Date':
            return (cell.value && cell.value !== "0001-01-01T00:00:00") ? new Date(cell.value).toLocaleDateString() : '';

        case 'Amount':
            return cell.value ? <Text fontStyle={'italic'}>hidden</Text> : '';

        default:
            return cell.render('Cell')
    }
}

export default TableComponent;
