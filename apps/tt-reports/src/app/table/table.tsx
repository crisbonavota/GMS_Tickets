import { Thead, Tr, Th, Tbody, Td, Table, Box, HStack, Text, Icon } from '@chakra-ui/react';
import { useTable, Cell } from 'react-table';
import { TimetrackItem } from '@gms-micro/api-utils';
import { Sort } from '@gms-micro/api-filters';
import { BsChevronDown, BsChevronUp } from 'react-icons/bs';

const FILE_NUMBER_HEADER = 'File number';
const EMPLOYEE_HEADER = 'Employee';
const BUSINESS_UNIT_HEADER = 'Business unit';
const PROJECT_HEADER = 'Project';
const TASK_HEADER = 'Task';
const DATE_HEADER = 'Date';
const HOURS_HEADER = 'Hours';
const FILE_NUMBER_ACCESSOR = 'legacyUser.fileNumber';
const EMPLOYEE_ACCESSOR = 'legacyUser.fullName';
const BUSINESS_UNIT_ACCESSOR = 'legacyUser.businessUnit.name';
const PROJECT_ACCESSOR = 'project.name';
const TASK_ACCESSOR = 'task';
const DATE_ACCESSOR = 'date';
const HOURS_ACCESSOR = 'hours';

const columns = [
    { Header: FILE_NUMBER_HEADER, accessor: FILE_NUMBER_ACCESSOR },
    { Header: EMPLOYEE_HEADER, accessor: EMPLOYEE_ACCESSOR },
    { Header: BUSINESS_UNIT_HEADER, accessor: BUSINESS_UNIT_ACCESSOR },
    { Header: PROJECT_HEADER, accessor: PROJECT_ACCESSOR },
    { Header: TASK_HEADER, accessor: TASK_ACCESSOR },
    { Header: DATE_HEADER, accessor: DATE_ACCESSOR },
    { Header: HOURS_HEADER, accessor: HOURS_ACCESSOR },
];

const excludedFromSort = [FILE_NUMBER_ACCESSOR];

const onHeaderClick = (id: string, sort: Sort, setSort: (sort: Sort) => void) => {
    const isAlreadySorted = sort.field === id;
    setSort({ field: id, isAscending: isAlreadySorted ? !sort.isAscending : true });
}

interface TableProps {
    tableData: Array<TimetrackItem>,
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
                                    {!excludedFromSort.includes(column.id) ?
                                        <HStack cursor={'pointer'} w={'fit-content'} onClick={() => onHeaderClick(column.id, sort, setSort)}>
                                            <Text>{column.render('Header')}</Text>
                                            {sort.field === column.id &&
                                                (sort.isAscending ?
                                                    <Icon fontWeight={'bold'} as={BsChevronUp} /> :
                                                    <Icon fontWeight={'bold'} as={BsChevronDown} />)}
                                        </HStack> :
                                        <Text>{column.render('Header')}</Text>}
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
        case DATE_HEADER:
            return cell.value ? new Date(cell.value).toLocaleDateString() : '';

        case HOURS_HEADER:
            return cell.value ? cell.value.toFixed(2) : '';

        default:
            return cell.render('Cell')
    }
}

export default TableComponent;
