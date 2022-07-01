import { Accordion, ExpandedIndex } from '@chakra-ui/react';
import { TimetrackItem } from '@gms-micro/api-utils';
import { useAppSelector, useAppDispatch } from '../../../redux/hooks';
import { setWeeklyAccordionIndex } from 'apps/tt-load/src/redux/slices/timetrackSlice';
import WeeklyTabAccordionItem from './weekly-tab-accordion-item';

type Props = {
    days: Array<Array<TimetrackItem>>;
};

const WeeklyTabAccordion = ({ days }: Props) => {
    const dispatch = useAppDispatch();
    const accordionIndex = useAppSelector(
        (state) => state.timetrack.table.weekly.accordion.index
    );

    const onChange = (index: ExpandedIndex) => {
        if (!Array.isArray(index)) return;
        dispatch({
            type: setWeeklyAccordionIndex,
            payload: index as number[],
        });
    };

    return (
        <Accordion
            allowMultiple
            allowToggle
            w={'full'}
            bgColor={'white'}
            index={accordionIndex}
            onChange={onChange}
        >
            {/* Each accordion item is a day of the week containing every timetrack item of that day */}
            {days.map((day, index) => (
                <WeeklyTabAccordionItem key={index} dayOfWeek={day} />
            ))}
        </Accordion>
    );
};

export default WeeklyTabAccordion;
