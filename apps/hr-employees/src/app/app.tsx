import { useQuery } from "react-query"
import { Employee, getResourceListFilteredAndPaginated } from '@gms-micro/api-utils';
import { Heading, VStack, Text } from '@chakra-ui/react';
import TableComponent from './table/table';
import { TablePaginationWithChakra } from '@gms-micro/table-utils';
import { useState, useMemo } from 'react';

const App = ({ authHeader }: { authHeader: string }) => {
    const [currentPage, setCurrentPage] = useState(0);

    const refetchTriggers = useMemo(() => [currentPage], [currentPage]);

    const employeesQuery = useQuery(['employees', refetchTriggers], () => getResourceListFilteredAndPaginated<Employee>(
        "employees",
        authHeader,
        [],
        [],
        undefined,
        undefined
    ));

    return (
        <VStack w={'full'} maxW={'full'} p={5}>
            <VStack w={'90%'} spacing={5}>
                <Heading fontSize={'2xl'}>Employees</Heading>
                {employeesQuery.isLoading && <Text>Loading...</Text>}
                {employeesQuery.isError && <Text>There was an error generating the table, try again later</Text>}
                {employeesQuery.isSuccess && <TableComponent tableData={employeesQuery.data.data} authHeader={authHeader} />}
                <TablePaginationWithChakra
                    isLoading={employeesQuery.isLoading}
                    currentPage={currentPage}
                    setCurrentPage={setCurrentPage}
                    pagesAmountHeader={employeesQuery.data?.headers['pages-amount']}
                />
            </VStack>
        </VStack>
    )
}

export default App
