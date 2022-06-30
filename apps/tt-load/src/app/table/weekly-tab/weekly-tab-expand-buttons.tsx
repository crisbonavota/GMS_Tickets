import { HStack, IconButton } from '@chakra-ui/react';
import {
    closeWeeklyAccordion,
    openWeeklyAccordion,
} from 'apps/tt-load/src/redux/slices/timetrackSlice';
import { BsArrowsAngleContract, BsArrowsAngleExpand } from 'react-icons/bs';
import { useAppDispatch } from '../../../redux/hooks';

const WeeklyTabExpandButtons = () => {
    const dispatch = useAppDispatch();
    const onCollapseClick = () => {
        dispatch({ type: closeWeeklyAccordion });
    };

    const onExpandClick = () => {
        dispatch({ type: openWeeklyAccordion });
    };

    return (
        <HStack w={'fit-content'} position={'absolute'} top={0} right={0} m={5}>
            <IconButton
                icon={<BsArrowsAngleContract />}
                aria-label="Collapse all"
                colorScheme={'blue'}
                onClick={onCollapseClick}
                size={'sm'}
            />
            <IconButton
                icon={<BsArrowsAngleExpand />}
                aria-label="Expand all"
                colorScheme={'orange'}
                onClick={onExpandClick}
                size={'sm'}
            />
        </HStack>
    );
};
export default WeeklyTabExpandButtons;
