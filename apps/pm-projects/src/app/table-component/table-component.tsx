import {
    Box,
    Table,
    Thead,
    Tr,
    Th,
    Tbody,
    Td,
    HStack,
    Text,
    Icon,
} from '@chakra-ui/react';
import { Sort } from '@gms-micro/api-filters';
import {
    getProjectStatus,
    Project,
    getContractTypes,
} from '@gms-micro/api-utils';
import { Cell, useTable } from 'react-table';
import { useCallback } from 'react';
import { BsChevronDown, BsChevronUp } from 'react-icons/bs';
import EditModal from '../edit-modal/edit-modal';
import UsersAssignmentModal from '../users-assignment-modal/users-assignment-modal';

const NAME = 'Name';
const NAME_ACCESSOR = 'name';
const BUSINESS_UNIT = 'Business Unit';
const BUSINESS_UNIT_ACCESSOR = 'businessUnit.name';
const PROPOSAL = 'Proposal';
const PROPOSAL_ACCESSOR = 'proposal.name';
const STATUS = 'Status';
const STATUS_ACCESSOR = 'status';
const CONTRACT_TYPE = 'Contract Type';
const CONTRACT_TYPE_ACCESSOR = 'contractType';
const START_DATE = 'Start Date';
const START_DATE_ACCESSOR = 'startDate';
const END_DATE = 'End Date';
const END_DATE_ACCESSOR = 'endDate';
const CREATION_DATE = 'Creation Date';
const CREATION_DATE_ACCESSOR = 'creationDate';

const columns = [
    { Header: NAME, accessor: NAME_ACCESSOR },
    { Header: BUSINESS_UNIT, accessor: BUSINESS_UNIT_ACCESSOR },
    { Header: PROPOSAL, accessor: PROPOSAL_ACCESSOR },
    { Header: STATUS, accessor: STATUS_ACCESSOR },
    { Header: CONTRACT_TYPE, accessor: CONTRACT_TYPE_ACCESSOR },
    { Header: START_DATE, accessor: START_DATE_ACCESSOR },
    { Header: END_DATE, accessor: END_DATE_ACCESSOR },
    { Header: CREATION_DATE, accessor: CREATION_DATE_ACCESSOR },
];

interface Props {
    tableData: Array<Project>;
    sort: Sort;
    setSort: (sort: Sort) => void;
}

export const TableComponent = ({ tableData, sort, setSort }: Props) => {
    // @ts-ignore
    const tableInstance = useTable({ columns, data: tableData });

    const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
        tableInstance;

    const onHeaderClick = useCallback(
        (id: string) => {
            const isAlreadySorted = sort.field === id;
            setSort({
                field: id,
                isAscending: isAlreadySorted ? !sort.isAscending : true,
            });
        },
        [sort, setSort]
    );

    return (
        <Box
            w={'full'}
            maxW={'full'}
            overflowX={'auto'}
            bgColor={'white'}
            borderRadius={5}
        >
            <Table {...getTableProps()} w={'full'} h={'fit-content'}>
                <Thead>
                    {headerGroups.map((headerGroup) => (
                        <Tr {...headerGroup.getHeaderGroupProps()}>
                            {headerGroup.headers.map((column) => (
                                <Th {...column.getHeaderProps()}>
                                    <HStack
                                        cursor={'pointer'}
                                        w={'fit-content'}
                                        onClick={() => onHeaderClick(column.id)}
                                    >
                                        <Text>{column.render('Header')}</Text>
                                        {sort.field === column.id &&
                                            (sort.isAscending ? (
                                                <Icon
                                                    fontWeight={'bold'}
                                                    as={BsChevronUp}
                                                />
                                            ) : (
                                                <Icon
                                                    fontWeight={'bold'}
                                                    as={BsChevronDown}
                                                />
                                            ))}
                                    </HStack>
                                </Th>
                            ))}
                        </Tr>
                    ))}
                </Thead>
                <Tbody {...getTableBodyProps()}>
                    {rows.map((row) => {
                        prepareRow(row);
                        return (
                            <Tr {...row.getRowProps()}>
                                {row.cells.map((cell) => {
                                    return (
                                        <Td {...cell.getCellProps()}>
                                            {renderTableCell(cell)}
                                        </Td>
                                    );
                                })}
                                <Td>
                                    <HStack>
                                        <EditModal project={row.original} />
                                        <UsersAssignmentModal
                                            project={row.original}
                                        />
                                    </HStack>
                                </Td>
                            </Tr>
                        );
                    })}
                </Tbody>
            </Table>
        </Box>
    );
};

const renderTableCell = (cell: Cell<Project | any>) => {
    switch (cell.column.Header) {
        case START_DATE:
        case END_DATE:
        case CREATION_DATE:
            return cell.value ? new Date(cell.value).toLocaleDateString() : '';

        case STATUS:
            return cell.value
                ? getProjectStatus().find((p) => p.value === cell.value)?.label
                : '';

        case CONTRACT_TYPE:
            return cell.value
                ? getContractTypes().find((p) => p.value === cell.value)?.label
                : '';

        default:
            return cell.render('Cell');
    }
};

export default TableComponent;
