import {
    VStack,
    HStack,
    Text,
    Icon,
    Heading,
    Skeleton,
} from '@chakra-ui/react';
import {
    getResourceListFilteredAndPaginated,
    TimetrackItem,
} from '@gms-micro/api-utils';
import { useState, useEffect } from 'react';
import { useQuery } from 'react-query';
import { GrNext, GrPrevious } from 'react-icons/gr';
import moment from 'moment';
import { useAuthHeader } from 'react-auth-kit';
import TableRow from '../table-row/table-row';

type Props = {
    selected: number | null;
    onEdit: (item: TimetrackItem) => void;
    onCopy: (item: TimetrackItem) => void;
    onDelete: () => void;
};

const DailyTab = ({ selected, onEdit, onCopy, onDelete }: Props) => {
    const getAuthHeader = useAuthHeader();
    const [dateShift, setDateShift] = useState(0);
    const [displayDate, setDisplayDate] = useState(
        moment().add(dateShift, 'days')
    );

    const itemsQuery = useQuery(['owned-daily', dateShift], () =>
        getResourceListFilteredAndPaginated<TimetrackItem>(
            'timetrack/owned',
            getAuthHeader(),
            [
                {
                    field: 'date',
                    value: moment().add(dateShift, 'days').format('YYYY-MM-DD'),
                },
            ],
            [],
            undefined,
            0,
            100
        )
    );

    useEffect(() => {
        console.log(displayDate.toISOString());
        setDisplayDate(moment().add(dateShift, 'days'));
    }, [dateShift]);

    return (
        <VStack w={'full'} spacing={5} h={'full'}>
            <HStack
                justifyContent={'space-between'}
                w={'full'}
                bgColor={'white'}
                p={3}
            >
                <Icon
                    as={GrPrevious}
                    cursor={'pointer'}
                    onClick={() => setDateShift(dateShift - 1)}
                />
                <HStack justifyContent={'space-between'} w={'full'} px={3}>
                    <HStack>
                        <Text>{displayDate.format('ddd').toUpperCase()}</Text>
                        <Text>-</Text>
                        <Text>
                            {displayDate
                                .locale(navigator.language)
                                .format(
                                    navigator.language.includes('en')
                                        ? 'YYYY-MM-DD'
                                        : 'DD/MM/YYYY'
                                )}
                        </Text>
                    </HStack>
                    {itemsQuery.isLoading && (
                        <Skeleton width={'50px'} height={'20px'} />
                    )}
                    {itemsQuery.isSuccess && (
                        <Heading fontSize={'md'}>
                            {itemsQuery.data.headers['total-hours']} hs
                        </Heading>
                    )}
                </HStack>
                <Icon
                    as={GrNext}
                    cursor={'pointer'}
                    onClick={() => setDateShift(dateShift + 1)}
                />
            </HStack>
            <VStack
                w={'full'}
                spacing={'0'}
                maxH={{ base: '35vh', md: '40vh' }}
                overflowY={'auto'}
            >
                {itemsQuery.isLoading && <Loading />}
                {itemsQuery.isSuccess && (
                    <>
                        {itemsQuery.data.data.map((item, index) => (
                            <TableRow
                                index={index}
                                item={item}
                                onEdit={onEdit}
                                selected={selected}
                                onCopy={onCopy}
                                onDelete={onDelete}
                            />
                        ))}
                        {!itemsQuery.data.data.length && (
                            <Text>No hours found for this day</Text>
                        )}
                    </>
                )}
            </VStack>
        </VStack>
    );
};

const Loading = () => {
    return (
        <VStack w={'full'} spacing={0}>
            {Array.from(Array(4).keys()).map((item, index) => (
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

export default DailyTab;
