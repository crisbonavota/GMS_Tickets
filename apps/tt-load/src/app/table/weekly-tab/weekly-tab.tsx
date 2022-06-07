import {
    Heading,
    HStack,
    Icon,
    Skeleton,
    VStack,
    Text,
} from '@chakra-ui/react';
import {
    getResourceListFilteredAndPaginated,
    TimetrackItem,
} from '@gms-micro/api-utils';
import moment from 'moment';
import { useState, useEffect, useMemo } from 'react';
import { useAuthHeader } from 'react-auth-kit';
import { GrPrevious, GrNext } from 'react-icons/gr';
import { useQuery } from 'react-query';
import { hoursToHoursMinutesString } from '../../app';
import WeeklyTabAccordion from './weekly-tab-accordion';
import { Flex } from '@chakra-ui/react';

type Props = {
    selected: number | null;
    resetForm: () => void;
    setType: (type: 'edit' | 'create') => void;
    setSelected: (id: number | null) => void;
    fillForm: (item: TimetrackItem) => void;
    expansionTrigger: 'collapse' | 'expand' | null;
    setExpansionTrigger: (trigger: 'collapse' | 'expand' | null) => void;
};

const WeeklyTab = ({
    selected,
    resetForm,
    setType,
    setSelected,
    fillForm,
    expansionTrigger,
    setExpansionTrigger,
}: Props) => {
    const [fromDate, setFromDate] = useState(
        moment().startOf('week').add(1, 'day')
    );
    const [toDate, setToDate] = useState(moment().endOf('week').add(1, 'day'));
    const [dateShift, setDateShift] = useState(0);
    const getAuthHeader = useAuthHeader();

    const itemsQuery = useQuery(['owned-weekly', dateShift], () =>
        getResourceListFilteredAndPaginated<Array<TimetrackItem>>(
            'timetrack/owned/grouped',
            getAuthHeader(),
            [
                {
                    field: 'date_bgr',
                    value: dateShiftToISOString(dateShift, true),
                },
                {
                    field: 'date_sml',
                    value: dateShiftToISOString(dateShift, false),
                },
            ],
            [],
            { field: 'date', isAscending: true },
            0,
            100
        )
    );

    const totalHoursHeader = useMemo(
        () => itemsQuery.data?.headers['total-hours'],
        [itemsQuery]
    );

    const totalHoursMinutes = useMemo(
        () =>
            itemsQuery.isSuccess && totalHoursHeader
                ? hoursToHoursMinutesString(totalHoursHeader)
                : null,
        [itemsQuery]
    );

    useEffect(() => {
        setFromDate(
            moment()
                .startOf('week')
                .add(dateShift * 7 + 1, 'days')
        );
        setToDate(
            moment()
                .endOf('week')
                .add(dateShift * 7 + 1, 'days')
        );
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
                    <Flex
                        flexDir={{ base: 'column', md: 'row' }}
                        gap={{ base: 0, md: 2 }}
                    >
                        <Text>
                            {fromDate
                                .locale(navigator.language)
                                .format(
                                    navigator.language.includes('en')
                                        ? 'YYYY-MM-DD'
                                        : 'DD/MM/YYYY'
                                )}
                        </Text>
                        <Text>-</Text>
                        <Text>
                            {toDate
                                .locale(navigator.language)
                                .format(
                                    navigator.language.includes('en')
                                        ? 'YYYY-MM-DD'
                                        : 'DD/MM/YYYY'
                                )}
                        </Text>
                    </Flex>
                    {(itemsQuery.isLoading || !totalHoursMinutes) && (
                        <Skeleton width={'50px'} height={'20px'} />
                    )}
                    {itemsQuery.isSuccess && totalHoursMinutes && (
                        <Heading fontSize={'md'}>{totalHoursMinutes}</Heading>
                    )}
                </HStack>
                <Icon
                    as={GrNext}
                    cursor={'pointer'}
                    onClick={() => setDateShift(dateShift + 1)}
                />
            </HStack>
            {itemsQuery.isSuccess && !itemsQuery.data.data.length && (
                <Text>No hours found for this week</Text>
            )}
            {itemsQuery.isSuccess && itemsQuery.data.data.length && (
                <WeeklyTabAccordion
                    selected={selected}
                    days={itemsQuery.data.data}
                    setSelected={setSelected}
                    setType={setType}
                    fillForm={fillForm}
                    resetForm={resetForm}
                    expansionTrigger={expansionTrigger}
                    setExpansionTrigger={setExpansionTrigger}
                />
            )}
            {itemsQuery.isLoading && <Loading />}
        </VStack>
    );
};

const Loading = () => {
    return (
        <VStack w={'full'} spacing={0}>
            {Array.from(Array(7).keys()).map((item, index) => (
                <Skeleton
                    key={index}
                    w={'full'}
                    h={'2.5rem'}
                    borderRadius={0}
                    startColor={index % 2 ? 'white' : '#F6ECD4'}
                    endColor={index % 2 ? '#F6ECD4' : 'white'}
                />
            ))}
        </VStack>
    );
};

export const dateShiftToISOString = (dateShift: number, start: boolean) => {
    var date = start ? moment().startOf('week') : moment().endOf('week');
    // + 1 because moment.js considers the week starting at sundays
    return date.add(dateShift * 7 + 1, 'days').format('YYYY-MM-DD');
};

export default WeeklyTab;
