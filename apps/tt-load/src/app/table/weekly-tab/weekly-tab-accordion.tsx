import {
    Accordion,
    AccordionItem,
    AccordionButton,
    Box,
    AccordionIcon,
    AccordionPanel,
    Text,
    HStack,
} from '@chakra-ui/react';
import { TimetrackItem } from '@gms-micro/api-utils';
import moment from 'moment';
import TableRow from '../table-row/table-row';
import { hoursToHoursMinutesString } from '../../app';

type Props = {
    days: Array<Array<TimetrackItem>>;
    selected: number | null;
    resetForm: () => void;
    setType: (type: 'edit' | 'create') => void;
    setSelected: (id: number | null) => void;
    fillForm: (item: TimetrackItem) => void;
};

const WeeklyTabAccordion = ({
    days,
    selected,
    resetForm,
    setType,
    setSelected,
    fillForm,
}: Props) => {
    return (
        <Accordion
            allowMultiple
            allowToggle
            w={'full'}
            bgColor={'white'}
            // Every accordion open by default
            defaultIndex={days.map((_, i) => i)}
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
