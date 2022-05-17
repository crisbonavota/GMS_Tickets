import { Table, Thead, Th, Tr, Td, Box, Tbody, IconButton, Text, HStack, Icon } from '@chakra-ui/react';
import { Employee, getCurrencies, getResourceListFilteredAndPaginated } from '@gms-micro/api-utils';
import { useQuery } from 'react-query';
import { useAuthHeader } from 'react-auth-kit';
import { ImportRow } from '../import-button/import-button';
import { Row, usePagination, useTable } from 'react-table';
import { GrPrevious, GrNext } from 'react-icons/gr';
import { MdOutlineError } from 'react-icons/md';
import { AiFillCheckCircle } from 'react-icons/ai';

const columns = [
    {
        Header: 'File number',
        accessor: 'fileNumber'
    },
    {
        Header: 'Date',
        accessor: 'date'
    },
    {
        Header: 'Currency',
        accessor: 'currency'
    },
    {
        Header: 'Amount',
        accessor: 'amount'
    }
]

interface BulkCheckProps {
    items: ImportRow[],
    setRows: (rows: ImportRow[]) => void
}

export function BulkCheck({ items, setRows }: BulkCheckProps) {
    const getAuthHeader = useAuthHeader();

    const employeesQuery = useQuery(['employees'], () => getResourceListFilteredAndPaginated<Employee>(
        'employees',
        getAuthHeader(),
        [],
        [],
        { field: 'legacyUser.fullName', isAscending: true },
        0,
        10000
    ));

    const tableInstance = useTable({
        // @ts-ignore
        columns,
        data: items,
        initialState: {
            // @ts-ignore
            pageSize: 5
        }
    }, usePagination);

    const {
        getTableProps,
        getTableBodyProps,
        headerGroups,
        prepareRow,
        //@ts-ignore
        page, canPreviousPage, canNextPage, nextPage, previousPage, state: { pageIndex }
    } = tableInstance;

    return (
        <Box w={'full'} maxW={'full'} overflowX={'auto'} bgColor={'white'} borderRadius={5}>
            {employeesQuery.isSuccess &&
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
                        {page.map((row: Row<ImportRow>) => {
                            prepareRow(row);
                            const validation = validateRow(row.original, employeesQuery.data.data);
                            return (
                                    <Tr {...row.getRowProps()}>
                                        {row.cells.map(cell => {
                                            return (
                                                <Td {...cell.getCellProps()}>
                                                    {cell.render('Cell')}
                                                </Td>

                                            )
                                        })}
                                        <Td>
                                            <Text>
                                                {validation.isValid ? 
                                                <Icon boxSize={6} as={AiFillCheckCircle} color={'green'} /> : 
                                                <Icon boxSize={6} as={MdOutlineError} color={'red'} />}
                                            </Text>
                                        </Td>
                                    </Tr>
                            )
                        })}
                    </Tbody>
                    <HStack p={5}>
                        <IconButton aria-label="Previous page" icon={<GrPrevious />} disabled={!canPreviousPage} onClick={previousPage} />
                        <Text>{pageIndex + 1}</Text>
                        <IconButton aria-label="Next page" icon={<GrNext />} disabled={!canNextPage} onClick={nextPage} />
                    </HStack>
                </Table>}
        </Box>
    );
}

const validateRow = (item: ImportRow, employees: Employee[]) => {
    const employee = employees.find(e => e.fileNumber.toString() === item.fileNumber?.toString());
    const currency = getCurrencies().find(c => c.code === item.currency);
    const errors: string[] = [];

    if (!employee) errors.push('Employee not found');
    if (!currency) errors.push('Currency not found');
    if (!item.amount) errors.push('Amount is required');
    if (!item.date) errors.push('Date is required');

    if (errors.length) return {
        isValid: false,
        errors
    }

    return {
        isValid: true,
        errors: []
    }
}

export default BulkCheck;
