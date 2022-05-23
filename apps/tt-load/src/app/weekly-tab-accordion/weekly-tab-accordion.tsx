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

type Props = {
    days: Array<Array<TimetrackItem>>;
    selected: number | null;
    onEdit: (item: TimetrackItem) => void;
    onCopy: (item: TimetrackItem) => void;
    onDelete: () => void;
};

const WeeklyTabAccordion = ({
    days,
    selected,
    onEdit,
    onCopy,
    onDelete,
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
                                    {day
                                        .map((item) => item.hours)
                                        .reduce((a, b) => a + b)}{' '}
                                    hs
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
                                onEdit={onEdit}
                                selected={selected}
                                onCopy={onCopy}
                                key={item.id}
                                onDelete={onDelete}
                            />
                        ))}
                    </AccordionPanel>
                </AccordionItem>
            ))}
        </Accordion>
    );
};

export default WeeklyTabAccordion;
