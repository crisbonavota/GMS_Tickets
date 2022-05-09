import { Thead, Tr, Th, Tbody, Td, Table, Box, Text } from '@chakra-ui/react';
import { Employee } from '@gms-micro/api-utils';
import { useTable, Cell } from 'react-table';

const TABLE_DATA = [
    { header: "File number", accessor: "fileNumber" },
    { header: "Name", accessor: "legacyUser.fullName" },
    { header: "CUIT", accessor: "afipId" },
    { header: "Entry date", accessor: "entryDate" },
    { header: "Position", accessor: "position.name" },
    { header: "Gender", accessor: "gender" },
    { header: "Birth date", accessor: "birthDate" },
    { header: "Birth country", accessor: "birthCountry.name" },
    { header: "Childs", accessor: "childs" },
    { header: "Email", accessor: "email" },
    { header: "Home phone", accessor: "homePhone" },
    { header: "Mobile phone", accessor: "mobilePhone" },
    { header: "Salary currency", accessor: "salaryCurrency.code" },
    { header: "Medical coverage", accessor: "medicalCoverage.name" },
    { header: "Country", accessor: "country.name" },
    { header: "Active", accessor: "active" },
]

const columns = TABLE_DATA.map(column => {
    return {
        Header: column.header,
        accessor: column.accessor
    }
});

interface TableProps {
    tableData: Array<Employee>,
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
