import { VStack, HStack, Text, Icon, Heading, Skeleton } from '@chakra-ui/react';
import { getResourceListFilteredAndPaginated, TimetrackItem } from '@gms-micro/api-utils';
import { useState, useEffect } from 'react';
import { useQuery } from 'react-query';
import { GrNext, GrPrevious } from 'react-icons/gr';
import moment from 'moment';
import { MdModeEditOutline } from 'react-icons/md';

type Props = {
    authHeader: string,
    selected: number | null,
    onEdit: (item: TimetrackItem) => void
}

const DailyTab = ({ authHeader, selected, onEdit }: Props) => {
    const [dateShift, setDateShift] = useState(0);
    const [displayDate, setDisplayDate] = useState(moment().add(dateShift, 'days'));

    const itemsQuery = useQuery(['owned-daily', dateShift], () => getResourceListFilteredAndPaginated<TimetrackItem>(
        "timetrack/owned",
        authHeader,
        [{ field: "date", value: moment().add(dateShift, 'days').toISOString().split('T')[0] }],
    ));

    useEffect(() => {
        setDisplayDate(moment().add(dateShift, 'days'));
    }, [dateShift]);

    return (
        <VStack w={'full'} spacing={5} h={'full'}>
            <HStack justifyContent={'space-between'} w={'full'} bgColor={'white'} p={3}>
                <Icon as={GrPrevious} cursor={'pointer'} onClick={() => setDateShift(dateShift - 1)} />
                <HStack justifyContent={'space-between'} w={'full'} px={3}>
                    <HStack>
                        <Text>
                            {displayDate.format('ddd').toUpperCase()}
                        </Text>
                        <Text>-</Text>
                        <Text>
                            {displayDate.locale(navigator.language).format(navigator.language.includes('en') ? 'YYYY-MM-DD' : 'DD/MM/YYYY')}
                        </Text>
                    </HStack>
                    {itemsQuery.isLoading && <Skeleton width={'50px'} height={'20px'} />}
                    {itemsQuery.isSuccess && <Heading fontSize={'md'}>{itemsQuery.data.headers['total-hours']} hs</Heading>}
                </HStack>
                <Icon as={GrNext} cursor={'pointer'} onClick={() => setDateShift(dateShift + 1)} />
            </HStack>
            <VStack w={'full'} spacing={'0'} maxH={'full'} overflowY={'auto'}>
                {itemsQuery.isLoading && <Loading />}
                {itemsQuery.isSuccess &&
                    <>
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
                                <Heading fontSize={'sm'}>{item.hours}h</Heading>
                            </HStack>)}
                        {!itemsQuery.data.data.length && <Text>No hours found for this day</Text>}
                    </>}
            </VStack>
        </VStack>
    )
}

const Loading = () => {
    return (
        <VStack w={'full'} spacing={0}>
            {Array.from(Array(4).keys()).map((item, index) =>
                <Skeleton key={index} w={'full'} h={'5rem'} startColor={index % 2 ? 'white' : '#F6ECD4'} endColor={index % 2 ? '#F6ECD4' : 'white'} />)}
        </VStack>
    )
}

export default DailyTab;