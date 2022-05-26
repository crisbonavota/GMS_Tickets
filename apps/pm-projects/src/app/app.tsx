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
    const query = useQuery(
        ['projects', currentPage, sort],
        async () =>
            await getResourceListFilteredAndPaginated<Project>(
                'projects/leader',
                getAuthHeader(),
                [],
                [],
                sort,
                currentPage
            )
    );
    const { isSuccess, isLoading, data: apiResponse } = query;

    return (
        <VStack p={5} w={'full'}>
            <Filters />
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
