import {
    Accordion,
    AccordionItem,
    AccordionButton,
    Box,
    AccordionIcon,
    AccordionPanel,
    Text,
    HStack,
    ExpandedIndex,
} from '@chakra-ui/react';
import { TimetrackItem } from '@gms-micro/api-utils';
import moment from 'moment';
import TableRow from '../table-row/table-row';
import { hoursToHoursMinutesString } from '../../app';
import { useState, useEffect } from 'react';

type Props = {
    days: Array<Array<TimetrackItem>>;
    selected: number | null;
    resetForm: () => void;
    setType: (type: 'edit' | 'create') => void;
    setSelected: (id: number | null) => void;
    fillForm: (item: TimetrackItem) => void;
    expansionTrigger: 'collapse' | 'expand' | null;
    setExpansionTrigger: (trigger: 'collapse' | 'expand' | null) => void;
    index: ExpandedIndex;
    setIndex: (index: ExpandedIndex) => void;
};

const WeeklyTabAccordion = ({
    days,
    selected,
    resetForm,
    setType,
    setSelected,
    fillForm,
    expansionTrigger,
    setExpansionTrigger,
    index,
    setIndex,
}: Props) => {
    // Every accordion open by default
    useEffect(() => {
        setIndex(days.map((_, i) => i));
    }, [days, setIndex]);

    useEffect(() => {
        if (expansionTrigger === 'expand') {
            setIndex(days.map((_, i) => i));
        } else if (expansionTrigger === 'collapse') {
            setIndex([]);
        }
        setExpansionTrigger(null);
    }, [expansionTrigger, setExpansionTrigger, setIndex]);

    return (
        <Accordion
            allowMultiple
            allowToggle
            w={'full'}
            bgColor={'white'}
            index={index}
            onChange={setIndex}
        >
            {days.map((day, index) => (
                <AccordionItem key={index}>
                    <h2>
                        <AccordionButton
                            bgColor={'gray'}
                            color={'white'}
                            _hover={{ bgColor: 'lightgray', color: 'black' }}
                        >
                            <HStack
                                justifyContent={'space-between'}
                                w={'full'}
                                pe={2}
                            >
                                <Text as={'span'}>
                                    {moment(day[0].date)
                                        .locale(navigator.language)
                                        .format('ddd')
                                        .toUpperCase()}
                                    &nbsp;-&nbsp;
                                    {moment(day[0].date)
                                        .locale(navigator.language)
                                        .format(
                                            navigator.language.includes('en')
                                                ? 'MM-DD'
                                                : 'DD/MM'
                                        )}
                                </Text>
                                <Text fontSize={'md'} fontWeight={'bold'}>
                                    {hoursToHoursMinutesString(
                                        day
                                            .map((item) => item.hours)
                                            .reduce((a, b) => a + b)
                                    )}
                                </Text>
                            </HStack>
                            <Box flex="1" textAlign="left"></Box>
                            <AccordionIcon />
                        </AccordionButton>
                    </h2>
                    <AccordionPanel p={0}>
                        {day.map((item, index) => (
                            <TableRow
                                index={index}
                                item={item}
                                selected={selected}
                                key={item.id}
                                setSelected={setSelected}
                                fillForm={fillForm}
                                setType={setType}
                                resetForm={resetForm}
                            />
                        ))}
                    </AccordionPanel>
                </AccordionItem>
            ))}
        </Accordion>
    );
};

export default WeeklyTabAccordion;
