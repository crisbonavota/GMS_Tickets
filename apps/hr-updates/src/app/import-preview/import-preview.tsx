import { Table, Thead, Th, Tr, Td, Box, Tbody, IconButton, Text, HStack, Icon } from '@chakra-ui/react';
import { Employee, getCurrencies, getResourceListFilteredAndPaginated } from '@gms-micro/api-utils';
import { useQuery } from 'react-query';
import { useAuthHeader } from 'react-auth-kit';
import { ImportUpdate } from '../import-button/import-button';
import { Row, usePagination, useTable } from 'react-table';
import { GrPrevious, GrNext } from 'react-icons/gr';
import { MdModeEditOutline, MdOutlineError } from 'react-icons/md';
import { AiFillCheckCircle } from 'react-icons/ai';
import ImportPreviewEdit from '../import-preview-edit/import-preview-edit';
import { useState, useEffect, useMemo } from 'react';

const columns = [
    { Header: 'Update #', accessor: 'index' },
    { Header: 'File number', accessor: 'fileNumber' },
    { Header: 'Employee', accessor: '' },
    { Header: 'Date', accessor: 'date' },
    { Header: 'Currency', accessor: 'currency' },
    { Header: 'Amount', accessor: 'amount' }
]

interface Props {
    updates: ImportUpdate[],
    setUpdates: (rows: ImportUpdate[]) => void,
    setValid: (isValid: boolean) => void,
}

export function ImportPreview({ updates, setUpdates, setValid }: Props) {
    const getAuthHeader = useAuthHeader();
    const [selectedEdit, setSelectedEdit] = useState<number | null>(null);

    const employeesQuery = useQuery(['employees'], () => getResourceListFilteredAndPaginated<Employee>(
        'employees',
        getAuthHeader(),
        [],
        [],
        { field: 'legacyUser.fullName', isAscending: true },
        0,
        10000
    ));

    const tableData = useMemo(() => [...updates], [updates]);

    const tableInstance = useTable({
        // @ts-ignore
        columns,
        data: tableData,
        initialState: {
            // @ts-ignore
            pageSize: 5
        },
        autoResetPage: false
    }, usePagination);

    const {
        getTableProps,
        getTableBodyProps,
        headerGroups,
        prepareRow,
        //@ts-ignore
        page, canPreviousPage, canNextPage, nextPage, previousPage, state: { pageIndex }
    } = tableInstance;

    useEffect(() => {
        if (employeesQuery.isSuccess) {
            setValid(validateAllRows(updates, employeesQuery.data.data));
        }
    }, [updates, employeesQuery]);

    if (employeesQuery.isLoading) return <Text>Loading...</Text>

    return (
        <Box w={'full'} maxW={'full'} overflowX={'auto'} bgColor={'white'} borderRadius={5}>
            {employeesQuery.isSuccess &&
                <>
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
                            {page.map((row: Row<ImportUpdate>) => {
                                prepareRow(row);
                                const validation = validateRow(row.original, employeesQuery.data.data);
                                return (
                                    <Tr {...row.getRowProps()} bgColor={row.index === selectedEdit ? 'blue.100': 'white'}>
                                        {row.cells.map((cell) => {
                                            if (cell.column.id === "index") return (
                                                <Td key={cell.column.id}>
                                                    <Text fontWeight={'bold'}>{row.index + 1}</Text>
                                                </Td>
                                            )

                                            if (cell.column.Header === "Employee") return (
                                                <Td key={cell.column.id}>
                                                    {employeesQuery.data.data.find(e =>
                                                        e.fileNumber.toString() === cell.row.original.fileNumber?.toString())?.legacyUser.fullName}
                                                </Td>
                                            )

                                            return (
                                                <Td {...cell.getCellProps()}>
                                                    {cell.render('Cell')}
                                                </Td>
                                            )
                                        })}
                                        <Td>
                                            <HStack spacing={5}>
                                                {validation.isValid ?
                                                    <Icon boxSize={6} as={AiFillCheckCircle} color={'green'} /> :
                                                    <Icon boxSize={6} as={MdOutlineError} color={'red'} />}
                                                <IconButton
                                                    icon={<MdModeEditOutline />}
                                                    aria-label="Edit"
                                                    onClick={() => selectedEdit === row.index ? setSelectedEdit(null) : setSelectedEdit(row.index)}
                                                    colorScheme={'blue'}
                                                    size={'xs'}
                                                />
                                            </HStack>
                                        </Td>
                                    </Tr>
                                )
                            })}
                        </Tbody>
                    </Table>
                    <HStack p={5}>
                        <IconButton aria-label="Previous page" icon={<GrPrevious />} disabled={!canPreviousPage} onClick={previousPage} />
                        <Text>{pageIndex + 1}</Text>
                        <IconButton aria-label="Next page" icon={<GrNext />} disabled={!canNextPage} onClick={nextPage} />
                    </HStack>
                    {selectedEdit !== null &&
                        <ImportPreviewEdit
                            updateIndex={selectedEdit}
                            update={updates[selectedEdit]}
                            updates={updates}
                            setUpdates={setUpdates}
                            validation={validateRow(updates[selectedEdit], employeesQuery.data.data)}
                        />}
                </>}
        </Box>
    );
}

const validateRow = (update: ImportUpdate, employees: Employee[]) => {
    const employee = employees.find(e => e.fileNumber.toString() === update.fileNumber?.toString());
    const currency = getCurrencies().find(c => c.code === update.currency);
    const errors: string[] = [];

    if (!employee) errors.push('Employee not found');
    if (!currency) errors.push('Currency not found');
    if (!update.amount) errors.push('Amount is required');
    if (!update.date) errors.push('Date is required');

    if (errors.length) return {
        isValid: false,
        errors
    }

    return {
        isValid: true,
        errors: []
    }
}

const validateAllRows = (updates: ImportUpdate[], employees: Employee[]) => {
    const validations = updates.map(u => validateRow(u, employees));
    return !validations.some(v => !v.isValid);
}

export default ImportPreview;
