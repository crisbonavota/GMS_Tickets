import {
    VStack,
    Skeleton,
    Text,
    Link,
    HStack,
    Heading,
} from '@chakra-ui/react';
import {
    getResourceListFilteredAndPaginated,
    TimetrackItem,
} from '@gms-micro/api-utils';
import moment from 'moment';
import { useQuery } from 'react-query';
import { useMemo } from 'react';
import { TablePaginationWithChakra } from '@gms-micro/table-utils';
import { useAuthHeader } from 'react-auth-kit';
import TableRow from '../table-row/table-row';
import { hoursToHHMMstring } from '@gms-micro/datetime-utils';
import { useAppSelector, useAppDispatch } from '../../../redux/hooks';
import {
    clearCustomFilters,
    setCustomFiltersPage,
} from 'apps/tt-load/src/redux/slices/timetrackSlice';

const CustomTab = () => {
    const dispatch = useAppDispatch();
    const getAuthHeader = useAuthHeader();
    const { startDate, endDate, project, page } = useAppSelector(
        (state) => state.timetrack.table.custom
    );

    const {
        isLoading,
        isSuccess,
        data: axiosResponse,
    } = useQuery(['owned-custom', startDate, endDate, page, project], () =>
        getResourceListFilteredAndPaginated<TimetrackItem>(
            'timetrack/owned',
            getAuthHeader(),
            [
                {
                    field: 'date_bgr',
                    value:
                        startDate !== ''
                            ? moment(startDate).format('YYYY-MM-DD')
                            : undefined,
                },
                {
                    field: 'date_sml',
                    value:
                        endDate !== ''
                            ? moment(endDate).format('YYYY-MM-DD')
                            : undefined,
                },
                {
                    field: 'projectId',
                    value: project ? project : undefined,
                },
            ],
            [],
            { field: 'date', isAscending: false },
            page,
            5
        )
    );

    const totalHours = useMemo(
        () =>
            isSuccess && axiosResponse
                ? parseInt(axiosResponse.headers['total-hours'])
                : 0,
        [axiosResponse, isSuccess]
    );

    const clearFilters = () => {
        dispatch({
            type: clearCustomFilters,
        });
    };

    const setPage = (value: number) => {
        dispatch({
            type: setCustomFiltersPage,
            payload: value,
        });
    };

    return (
        <VStack w={'full'} spacing={5}>
            <HStack w={'full'} justifyContent={'space-between'}>
                {isLoading && <Skeleton h={'20px'} w={'3rem'} />}
                {isSuccess && (
                    <Heading fontSize={'lg'}>
                        {hoursToHHMMstring(totalHours)} total
                    </Heading>
                )}
                <Link ms={'auto'} color={'steelblue'} onClick={clearFilters}>
                    Clear filters
                </Link>
            </HStack>
            {isLoading && <Loading />}
            {isSuccess && (
                <>
                    <VStack
                        w={'full'}
                        spacing={0}
                        maxH={{ base: '35vh', md: '40vh' }}
                        overflowY={'auto'}
                    >
                        {axiosResponse?.data.map((item, index) => (
                            <TableRow
                                key={item.id}
                                index={index}
                                item={item}
                                withDay
                            />
                        ))}
                    </VStack>
                    {!axiosResponse?.data.length && (
                        <Text>No hours found for this filter</Text>
                    )}
                </>
            )}
            <TablePaginationWithChakra
                currentPage={page}
                setCurrentPage={setPage}
                isLoading={isLoading}
                pagesAmountHeader={axiosResponse?.headers['pages-amount']}
            />
        </VStack>
    );
};

const Loading = () => {
    return (
        <VStack w={'full'} spacing={0}>
            {Array.from(Array(5).keys()).map((item, index) => (
                <Skeleton
                    key={index}
                    w={'full'}
                    h={'5rem'}
                    startColor={index % 2 ? 'white' : '#F6ECD4'}
                    endColor={index % 2 ? '#F6ECD4' : 'white'}
                />
            ))}
        </VStack>
    );
};

export default CustomTab;
