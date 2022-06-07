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
import { useState, useMemo } from 'react';
import { TablePaginationWithChakra } from '@gms-micro/table-utils';
import { useAuthHeader } from 'react-auth-kit';
import TableRow from '../table-row/table-row';
import { hoursToHoursMinutesString } from '../../app';

type Props = {
    from: string;
    to: string;
    selected: number | null;
    project?: number;
    clearFilters: () => void;
    resetForm: () => void;
    setType: (type: 'edit' | 'create') => void;
    setSelected: (id: number | null) => void;
    fillForm: (item: TimetrackItem) => void;
};

const CustomTab = ({
    from,
    to,
    selected,
    project,
    clearFilters,
    resetForm,
    setType,
    setSelected,
    fillForm,
}: Props) => {
    const [currentPage, setCurrentPage] = useState(0);
    const getAuthHeader = useAuthHeader();

    const itemsQuery = useQuery(
        ['owned-custom', from, to, currentPage, project],
        () =>
            getResourceListFilteredAndPaginated<TimetrackItem>(
                'timetrack/owned',
                getAuthHeader(),
                [
                    {
                        field: 'date_bgr',
                        value:
                            from !== ''
                                ? moment(from).format('YYYY-MM-DD')
                                : undefined,
                    },
                    {
                        field: 'date_sml',
                        value:
                            to !== ''
                                ? moment(to).format('YYYY-MM-DD')
                                : undefined,
                    },
                    { field: 'projectId', value: project },
                ],
                [],
                { field: 'date', isAscending: false },
                currentPage,
                5
            )
    );

    const totalHours = useMemo(
        () =>
            itemsQuery.isSuccess
                ? parseInt(itemsQuery.data.headers['total-hours'])
                : 0,
        [itemsQuery]
    );

    return (
        <VStack w={'full'} spacing={5}>
            <HStack w={'full'} justifyContent={'space-between'}>
                {itemsQuery.isLoading && <Skeleton h={'20px'} w={'3rem'} />}
                {itemsQuery.isSuccess && (
                    <Heading fontSize={'lg'}>
                        {hoursToHoursMinutesString(totalHours)} total
                    </Heading>
                )}
                <Link ms={'auto'} color={'steelblue'} onClick={clearFilters}>
                    Clear filters
                </Link>
            </HStack>
            {itemsQuery.isLoading && <Loading />}
            {itemsQuery.isSuccess && (
                <>
                    <VStack
                        w={'full'}
                        spacing={0}
                        maxH={{ base: '35vh', md: '40vh' }}
                        overflowY={'auto'}
                    >
                        {itemsQuery.data.data.map((item, index) => (
                            <TableRow
                                key={item.id}
                                index={index}
                                item={item}
                                selected={selected}
                                withDay
                                setSelected={setSelected}
                                setType={setType}
                                fillForm={fillForm}
                                resetForm={resetForm}
                            />
                        ))}
                    </VStack>
                    {!itemsQuery.data.data.length && (
                        <Text>No hours found for this filter</Text>
                    )}
                </>
            )}
            <TablePaginationWithChakra
                currentPage={currentPage}
                setCurrentPage={setCurrentPage}
                isLoading={itemsQuery.isLoading}
                pagesAmountHeader={itemsQuery.data?.headers['pages-amount']}
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
