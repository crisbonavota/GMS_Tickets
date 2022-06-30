import { Heading, HStack, Skeleton, VStack, Text } from '@chakra-ui/react';
import {
    getResourceListFilteredAndPaginated,
    TimetrackItem,
} from '@gms-micro/api-utils';
import { useMemo, useEffect } from 'react';
import { useAuthHeader } from 'react-auth-kit';
import { GrPrevious, GrNext } from 'react-icons/gr';
import { useQuery } from 'react-query';
import { hoursToHHMMstring } from '@gms-micro/datetime-utils';
import WeeklyTabAccordion from './weekly-tab-accordion';
import { IconButton } from '@chakra-ui/react';
import { useAppSelector, useAppDispatch } from '../../../redux/hooks';
import { momentToLocaleDateString } from '@gms-micro/datetime-utils';
import {
    openWeeklyAccordion,
    setTableWeeklyDate,
} from 'apps/tt-load/src/redux/slices/timetrackSlice';

const WeeklyTab = () => {
    const dispatch = useAppDispatch();
    const startDate = useAppSelector(
        (state) => state.timetrack.table.weekly.startDate
    );

    const endDate = useAppSelector(
        (state) => state.timetrack.table.weekly.endDate
    );

    const getAuthHeader = useAuthHeader();

    const {
        isLoading,
        isSuccess,
        data: axiosResponse,
    } = useQuery(['owned-weekly', startDate, endDate], () =>
        getResourceListFilteredAndPaginated<Array<TimetrackItem>>(
            'timetrack/owned/grouped',
            getAuthHeader(),
            [
                {
                    field: 'date_bgr',
                    value: startDate.format('YYYY-MM-DD'),
                },
                {
                    field: 'date_sml',
                    value: endDate.format('YYYY-MM-DD'),
                },
            ],
            [],
            { field: 'date', isAscending: true },
            0,
            100
        )
    );

    const totalHoursHeader = useMemo(
        () => axiosResponse?.headers['total-hours'],
        [axiosResponse]
    );

    const totalHoursMinutes = useMemo(
        () =>
            isSuccess && totalHoursHeader
                ? hoursToHHMMstring(totalHoursHeader)
                : null,
        [isSuccess]
    );

    const onPreviousWeekClick = () => {
        dispatch({
            type: setTableWeeklyDate,
            payload: {
                startDate: startDate.clone().subtract(1, 'week'),
                endDate: endDate.clone().subtract(1, 'week'),
            },
        });
    };

    const onNextWeekClick = () => {
        dispatch({
            type: setTableWeeklyDate,
            payload: {
                startDate: startDate.clone().add(1, 'week'),
                endDate: endDate.clone().add(1, 'week'),
            },
        });
    };

    useEffect(() => {
        dispatch({
            type: openWeeklyAccordion,
        });
    }, [startDate, endDate]);

    return (
        <VStack w={'full'} spacing={5} h={'full'}>
            <HStack
                justifyContent={'space-between'}
                w={'full'}
                bgColor={'white'}
                p={3}
            >
                <IconButton
                    icon={<GrPrevious />}
                    onClick={onPreviousWeekClick}
                    aria-label="Previous week"
                    variant={'ghost'}
                />
                <HStack justifyContent={'space-between'} w={'full'} px={3}>
                    <Text as={'span'}>
                        {momentToLocaleDateString(startDate)} -{' '}
                        {momentToLocaleDateString(endDate)}
                    </Text>
                    {(isLoading || !totalHoursMinutes) && (
                        <Skeleton width={'50px'} height={'20px'} />
                    )}
                    {isSuccess && totalHoursMinutes && (
                        <Heading fontSize={'md'}>{totalHoursMinutes}</Heading>
                    )}
                </HStack>
                <IconButton
                    icon={<GrNext />}
                    onClick={onNextWeekClick}
                    aria-label="Next week"
                    variant={'ghost'}
                />
            </HStack>
            {isSuccess && !axiosResponse?.data.length && (
                <Text>No hours found for this week</Text>
            )}
            {isSuccess && axiosResponse?.data.length && (
                <WeeklyTabAccordion days={axiosResponse.data} />
            )}
            {isLoading && <Loading />}
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

export default WeeklyTab;
