import { Flex, VStack, Wrap, Text, HStack } from '@chakra-ui/react';
import {
    getResourceListFilteredAndPaginated,
    KeyValuePair,
    Update,
} from '@gms-micro/api-utils';
import { TablePaginationWithChakra } from '@gms-micro/table-utils';
import { useState, useEffect, useMemo } from 'react';
import TableComponent from './table/table';
import UpdateTypeFilter from './update-type-filter/update-type-filter';
import { useQuery } from 'react-query';
import { CustomFilter, FilterItem } from '@gms-micro/api-filters';
import ExportButton from './export-button/export-button';
import CreateSelectUpdateType from './create-select-update-type/create-select-update-type';
import MonthFilter from './month-filter/month-filter';
import YearFilter from './year-filter/year-filter';
import { useAuthHeader } from 'react-auth-kit';
import ImportButton from './import-button/import-button';
import EmployeeProviderSwitch from './employee-provider-switch/employee-provider-switch';
import EmployeeProviderSelect from './employee-provider-select/employee-provider-select';

const App = () => {
    const legacyUserEmptyValue = useMemo(
        () => ({ value: '', label: 'All' }),
        []
    );

    const [currentPage, setCurrentPage] = useState(0);
    const [updateType, setUpdateType] = useState<string>('');
    const [legacyUser, setLegacyUser] =
        useState<KeyValuePair>(legacyUserEmptyValue);
    // index starts at 1 on the backend
    const [month, setMonth] = useState(new Date().getMonth() + 1);
    const [year, setYear] = useState(new Date().getFullYear());
    const [userType, setUserType] = useState<'employees' | 'providers'>(
        'employees'
    );
    const getAuthHeader = useAuthHeader();

    // Go to first page if any filter changes
    useEffect(() => {
        setCurrentPage(0);
    }, [updateType, legacyUser, month, year]);

    const filters: FilterItem[] = useMemo(
        () => [
            {
                field: 'updateTypeId',
                value: updateType !== '' ? updateType : undefined,
            },
            {
                field: 'legacyUserId',
                value: legacyUser.value !== '' ? legacyUser.value : undefined,
            },
        ],
        [legacyUser, updateType]
    );

    const customFilters: CustomFilter[] = useMemo(
        () => [
            { name: 'month', value: month },
            { name: 'year', value: year },
            {
                name: userType === 'employees' ? 'isEmployee' : 'isProvider',
                value: true,
            },
        ],
        [month, year, userType]
    );

    const updatesQueriesSort = useMemo(() => {
        return {
            field: 'date',
            isAscending: false,
        };
    }, [legacyUser, updateType]);

    const refetchTriggers = useMemo(
        () => [currentPage, filters, customFilters],
        [currentPage, filters, customFilters]
    );

    const updatesQuery = useQuery(['updates', refetchTriggers], () =>
        getResourceListFilteredAndPaginated<Update>(
            'updates',
            getAuthHeader(),
            filters,
            customFilters,
            updatesQueriesSort,
            currentPage
        )
    );

    return (
        <VStack w={'full'} maxW={'full'} p={5}>
            <VStack w={'90%'} spacing={5}>
                <Flex
                    justifyContent={'space-between'}
                    alignItems={'flex-start'}
                    w={'full'}
                    flexDir={{ base: 'column-reverse', md: 'row' }}
                >
                    <Wrap
                        w={'full'}
                        spacing={5}
                        justifyContent={'flex-start'}
                        alignItems={'flex-end'}
                    >
                        <EmployeeProviderSwitch
                            userType={userType}
                            setUserType={setUserType}
                        />
                        <EmployeeProviderSelect
                            legacyUser={legacyUser}
                            setLegacyUser={setLegacyUser}
                            userType={userType}
                            emptyValue={legacyUserEmptyValue}
                        />
                        <UpdateTypeFilter
                            updateType={updateType}
                            setUpdateType={setUpdateType}
                            isLoading={updatesQuery.isLoading}
                        />
                        <MonthFilter month={month} setMonth={setMonth} />
                        <YearFilter year={year} setYear={setYear} />
                    </Wrap>
                    <HStack mb={{ base: 3, md: 0 }} spacing={5}>
                        <ExportButton
                            sort={updatesQueriesSort}
                            filters={filters}
                            customFilters={customFilters}
                            refetchTriggers={refetchTriggers}
                        />
                        <CreateSelectUpdateType />
                        <ImportButton />
                    </HStack>
                </Flex>
                {updatesQuery.isLoading && <Text>Loading...</Text>}
                {updatesQuery.isError && (
                    <Text>
                        There was an error generating the table, try again later
                    </Text>
                )}
                {updatesQuery.isSuccess && (
                    <TableComponent tableData={updatesQuery.data.data} />
                )}
                <TablePaginationWithChakra
                    isLoading={updatesQuery.isLoading}
                    currentPage={currentPage}
                    setCurrentPage={setCurrentPage}
                    pagesAmountHeader={
                        updatesQuery.data?.headers['pages-amount']
                    }
                />
            </VStack>
        </VStack>
    );
};

export default App;
