import { HStack, IconButton } from '@chakra-ui/react';
import { BsArrowsAngleContract, BsArrowsAngleExpand } from 'react-icons/bs';
import { useCallback } from 'react';

interface Props {
    setTrigger: (trigger: 'collapse' | 'expand' | null) => void;
}
const WeeklyTabExpandButtons = ({ setTrigger }: Props) => {
    const onCollapseClick = useCallback(() => {
        setTrigger('collapse');
    }, [setTrigger]);

    const onExpandClick = useCallback(() => {
        setTrigger('expand');
    }, [setTrigger]);

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
