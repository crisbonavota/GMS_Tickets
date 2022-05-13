import { Heading, HStack, Icon, Skeleton, VStack, Text, Stack } from "@chakra-ui/react"
import { getResourceListFilteredAndPaginated, TimetrackItem } from "@gms-micro/api-utils";
import moment from "moment";
import { useState, useEffect } from 'react';
import { GrPrevious, GrNext } from "react-icons/gr"
import { useQuery } from "react-query";
import WeeklyTabAccordion from "../weekly-tab-accordion/weekly-tab-accordion";

type Props = {
    authHeader: string,
    selected: number | null,
    onEdit: (item: TimetrackItem) => void
}

const WeeklyTab = ({ authHeader, selected, onEdit }: Props) => {
    const [fromDate, setFromDate] = useState(moment().startOf('week').add(1, "day"));
    const [toDate, setToDate] = useState(moment().endOf('week').add(1, "day"));
    const [dateShift, setDateShift] = useState(0);

    const itemsQuery = useQuery(['owned-weekly', dateShift], () => getResourceListFilteredAndPaginated<Array<TimetrackItem>>(
        "timetrack/owned/grouped",
        authHeader,
        [
            { field: "date_bgr", value: dateShiftToISOString(dateShift, true) },
            { field: "date_sml", value: dateShiftToISOString(dateShift, false) },
        ],
    ));

    useEffect(() => {
        setFromDate(moment().startOf('week').add(dateShift * 7 + 1, 'days'));
        setToDate(moment().endOf('week').add(dateShift * 7 + 1, 'days'));
    }, [dateShift]);

    return (
        <VStack w={'full'} spacing={5} h={'full'}>
            <HStack justifyContent={'space-between'} w={'full'} bgColor={'white'} p={3}>
                <Icon as={GrPrevious} cursor={'pointer'} onClick={() => setDateShift(dateShift - 1)} />
                <HStack justifyContent={'space-between'} w={'full'} px={3}>
                    <Stack flexDir={{ base: 'column', md: 'row' }} direction={{ base: 'column', md: 'row' }} spacing={{ base: 0, md: 2 }}>
                        <Text>
                            {fromDate.locale(navigator.language).format(navigator.language.includes('en') ? 'YYYY-MM-DD' : 'DD/MM/YYYY')}
                        </Text>
                        <Text>-</Text>
                        <Text>
                            {toDate.locale(navigator.language).format(navigator.language.includes('en') ? 'YYYY-MM-DD' : 'DD/MM/YYYY')}
                        </Text>
                    </Stack>
                    {itemsQuery.isLoading && <Skeleton width={'50px'} height={'20px'} />}
                    {itemsQuery.isSuccess && <Heading fontSize={'md'}>{itemsQuery.data.headers['total-hours']} hs</Heading>}
                </HStack>
                <Icon as={GrNext} cursor={'pointer'} onClick={() => setDateShift(dateShift + 1)} />
            </HStack>
            {itemsQuery.isSuccess && !itemsQuery.data.data.length && <Text>No hours found for this week</Text>}
            {itemsQuery.isSuccess && itemsQuery.data.data.length && <WeeklyTabAccordion selected={selected} onEdit={onEdit} items={itemsQuery.data.data} />}
            {itemsQuery.isLoading && <Loading />}
        </VStack>
    )
}

const Loading = () => {
    return (
        <VStack w={'full'} spacing={0}>
            {Array.from(Array(7).keys()).map((item, index) =>
                <Skeleton key={index} w={'full'} h={'2.5rem'} borderRadius={0} startColor={index % 2 ? 'white' : '#F6ECD4'} endColor={index % 2 ? '#F6ECD4' : 'white'} />)}
        </VStack>
    )
}

export const dateShiftToISOString = (dateShift: number, start: boolean) => {
    var date = start ? moment().startOf('week') : moment().endOf('week');
    // + 1 because moment.js considers the week starting at sundays
    return date.add(dateShift * 7 + (start ? 1 : 0), 'days').format('YYYY-MM-DD');
}

export default WeeklyTab
