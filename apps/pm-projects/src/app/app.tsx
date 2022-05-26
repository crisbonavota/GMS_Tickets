import { Text, VStack } from '@chakra-ui/react';
import {
    getResourceListFilteredAndPaginated,
    Project,
} from '@gms-micro/api-utils';
import { useQuery } from 'react-query';
import Filters from './filters/filters';
import { useAuthHeader } from 'react-auth-kit';
import TableComponent from './table-component/table-component';
import { TablePaginationWithChakra } from '@gms-micro/table-utils';
import { useState } from 'react';
import { Sort } from '@gms-micro/api-filters';

export function App() {
    const getAuthHeader = useAuthHeader();
    const [currentPage, setCurrentPage] = useState(0);
    const [sort, setSort] = useState<Sort>({
        field: 'creationDate',
        isAscending: false,
    });

    const [search, setSearch] = useState('');
    // 0 is all in dropdown
    const [status, setStatus] = useState<number>(0);
    const [contractType, setContractType] = useState<number>(0);

    const query = useQuery(
        ['projects', currentPage, sort, search, status, contractType],
        async () =>
            await getResourceListFilteredAndPaginated<Project>(
                'projects/leader',
                getAuthHeader(),
                [
                    { field: 'name', value: search },
                    { field: 'status', value: status ? status : undefined },
                    {
                        field: 'contractType',
                        value: contractType ? contractType : undefined,
                    },
                ],
                [],
                sort,
                currentPage
            )
    );
    const { isSuccess, isLoading, data: apiResponse } = query;

    return (
        <VStack p={5} w={'full'} spacing={5}>
            <Filters
                setSearch={setSearch}
                search={search}
                status={status}
                setStatus={setStatus}
                contractType={contractType}
                setContractType={setContractType}
            />
            {isSuccess && apiResponse ? (
                <TableComponent
                    tableData={apiResponse.data}
                    sort={sort}
                    setSort={setSort}
                />
            ) : (
                isLoading && <Text>Loading...</Text>
            )}
            <TablePaginationWithChakra
                isLoading={isLoading}
                currentPage={currentPage}
                setCurrentPage={setCurrentPage}
                pagesAmountHeader={apiResponse?.headers['pages-amount']}
            />
        </VStack>
    );
}

export default App;
