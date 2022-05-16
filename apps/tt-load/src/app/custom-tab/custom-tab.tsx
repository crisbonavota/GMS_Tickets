import { VStack, HStack, Icon, Heading, Skeleton, Text, Link } from '@chakra-ui/react';
import { getResourceListFilteredAndPaginated, TimetrackItem } from '@gms-micro/api-utils';
import moment from 'moment';
import { MdModeEditOutline } from 'react-icons/md';
import { useQuery } from 'react-query';
import { useState } from 'react';
import { TablePaginationWithChakra } from '@gms-micro/table-utils';
import { useAuthHeader } from 'react-auth-kit';

type Props = {
    from: string,
    to: string,
    selected: number | null,
    onEdit: (item: TimetrackItem) => void,
    project?: number,
    clearFilters: () => void
}

const CustomTab = ({ from, to, selected, onEdit, project, clearFilters }: Props) => {
    const [currentPage, setCurrentPage] = useState(0);
    const getAuthHeader = useAuthHeader();

    const itemsQuery = useQuery(['owned-custom', from, to, currentPage, project], () => getResourceListFilteredAndPaginated<TimetrackItem>(
        "timetrack/owned",
        getAuthHeader(),
        [
            { field: "date_bgr", value: from !== "" ? moment(from).toISOString().split('T')[0] : undefined },
            { field: "date_sml", value: to !== "" ? moment(to).toISOString().split('T')[0] : undefined },
            { field: "projectId", value: project },
        ],
        [],
        { field: 'date', isAscending: false },
        currentPage,
        5
    ));

    return (
        <VStack w={'full'} spacing={5}>
            <Link ms={'auto'} color={'steelblue'} onClick={clearFilters}>Clear filters</Link>
            {itemsQuery.isLoading && <Loading />}
            {itemsQuery.isSuccess &&
                <>
                    <VStack w={'full'} spacing={0} maxH={{ base: '35vh', md: '40vh' }} overflowY={'auto'}>
                        {itemsQuery.data.data.map((item, index) =>
                            <HStack
                                justify={'space-between'}
                                w={'full'}
                                key={item.id}
                                bgColor={selected === item.id ? 'green.100' : (index % 2 ? 'white' : '#F6ECD4')}
                                p={3}
                                borderWidth={1}
                                border={selected === item.id ? '5px solid steelblue' : 'none'}
                            >
                                <HStack spacing={5}>
                                    <Icon cursor={'pointer'} size={'sm'} color={'steelblue'} as={MdModeEditOutline} onClick={() => onEdit(item)} />
                                    <VStack w={'fit-content'} alignItems={'flex-start'}>
                                        <Text>{item.project.name}</Text>
                                        <Text>{item.task}</Text>
                                    </VStack>
                                </HStack>
                                <VStack alignItems={'flex-end'}>
                                    <Heading fontSize={'sm'}>{item.hours}h</Heading>
                                    <Text fontSize={'xs'}>{moment(item.date).format(navigator.language.includes('en') ? 'YYYY-MM-DD' : 'DD/MM/YYYY')}</Text>
                                </VStack>
                            </HStack>

                        )}
                    </VStack>
                    {!itemsQuery.data.data.length && <Text>No hours found for this filter</Text>}
                </>}
            <TablePaginationWithChakra
                currentPage={currentPage}
                setCurrentPage={setCurrentPage}
                isLoading={itemsQuery.isLoading}
                pagesAmountHeader={itemsQuery.data?.headers['pages-amount']}
            />
        </VStack>
    )
}

const Loading = () => {
    return (
        <VStack w={'full'} spacing={0}>
            {Array.from(Array(5).keys()).map((item, index) =>
                <Skeleton key={index} w={'full'} h={'5rem'} startColor={index % 2 ? 'white' : '#F6ECD4'} endColor={index % 2 ? '#F6ECD4' : 'white'} />)}
        </VStack>
    )
}

export default CustomTab
