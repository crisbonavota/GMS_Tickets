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
import { useState, useMemo, useEffect } from 'react';
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
    const [account, setAccount] = useState(0);

    const refetchTriggers = useMemo(
        () => [currentPage, sort, search, status, contractType, account],
        [currentPage, sort, search, status, contractType, account]
    );

    // Returning to first page on filters change
    useEffect(() => {
        setCurrentPage(0);
    }, [sort, search, status, contractType, account]);

    const query = useQuery(
        ['projects', refetchTriggers],
        async () =>
            await getResourceListFilteredAndPaginated<Project>(
                'projects',
                getAuthHeader(),
                [
                    { field: 'name', value: search },
                    { field: 'status', value: status ? status : undefined },
                    {
                        field: 'contractType',
                        value: contractType ? contractType : undefined,
                    },
                    {
                        field: 'proposal.account.id',
                        value: account ? account : undefined,
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
                account={account}
                setAccount={setAccount}
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
                elementsAmount={apiResponse?.headers['x-total-count']}
            />
        </VStack>
    );
}

export default App;
