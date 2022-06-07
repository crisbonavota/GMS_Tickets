import { VStack, Input, Heading, IconButton, HStack } from '@chakra-ui/react';
import moment from 'moment';
import { useCallback } from 'react';
import { GrNext, GrPrevious } from 'react-icons/gr';

type Props = {
    date: string;
    setDate: (date: string) => void;
};
const DateInput = ({ date, setDate }: Props) => {
    const onPreviousDayClick = useCallback(() => {
        const currentDate = moment(date, 'YYYY-MM-DD');
        const newDate = currentDate.add(-1, 'days').format('YYYY-MM-DD');
        setDate(newDate);
    }, [date, setDate]);

    const onNextDayClick = useCallback(() => {
        const currentDate = moment(date, 'YYYY-MM-DD');
        const newDate = currentDate.add(1, 'days').format('YYYY-MM-DD');
        setDate(newDate);
    }, [date, setDate]);

    return (
        <VStack alignItems={'flex-start'}>
            <HStack w="full" justifyContent={'space-between'}>
                <Heading fontSize={'md'}>Date</Heading>
                <HStack>
                    <IconButton
                        size={'sm'}
                        icon={<GrPrevious />}
                        onClick={onPreviousDayClick}
                        aria-label="Previous day"
                        isDisabled={date == ''}
                        colorScheme={'ghost'}
                        w={'fit-content'}
                        h={'fit-content'}
                        boxShadow={'none !important'}
                    />
                    <IconButton
                        size={'sm'}
                        icon={<GrNext />}
                        onClick={onNextDayClick}
                        aria-label="Next day"
                        isDisabled={date == ''}
                        colorScheme={'ghost'}
                        w={'fit-content'}
                        h={'fit-content'}
                        boxShadow={'none !important'}
                    />
                </HStack>
            </HStack>
            <Input
                type={'date'}
                bgColor={'white'}
                borderWidth={1}
                borderColor={'lightgray'}
                value={date}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                    setDate(e.target.value)
                }
                id={'tt-load-date-input'}
            />
        </VStack>
    );
};

export default DateInput;
