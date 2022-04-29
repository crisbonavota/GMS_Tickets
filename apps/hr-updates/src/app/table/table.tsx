import { Thead, Tr, Th, Tbody, Td, Table, Box, Text, HStack } from '@chakra-ui/react';
import { Update } from '@gms-micro/api-utils';
import { useTable, Cell } from 'react-table';
import EditModal from '../edit-modal/edit-modal';

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
    { Header: 'Notes', accessor: 'notes' },
];

interface TableProps {
    tableData: Array<Update>,
    authHeader: string
}

export const TableComponent = ({ tableData, authHeader }: TableProps) => {
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
                                <Td>
                                    <HStack h={'full'} px={2}>
                                        <EditModal update={row.original} authHeader={authHeader} />
                                    </HStack>
                                </Td>
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
