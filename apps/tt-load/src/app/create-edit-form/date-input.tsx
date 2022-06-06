import { VStack, Input, Heading, IconButton, HStack } from '@chakra-ui/react';
import moment from 'moment';
import { useCallback } from 'react';
import { GrNext, GrPrevious } from 'react-icons/gr';

type Props = {
    date: string;
    setDate: (date: string) => void;
};
const DateInput = ({ date, setDate }: Props) => {
    const onArrowClick = useCallback((add: boolean) => {
        const currentDate = moment(date, 'YYYY-MM-DD');
        const newDate = currentDate.add(add? 1 : -1, 'days').format('YYYY-MM-DD');
        setDate(newDate);	
    }, [date, setDate]);

    return (
        <VStack alignItems={'flex-start'}>
            <HStack w='full' justifyContent={'space-between'}>
                <Heading fontSize={'md'}>Date</Heading>
                <HStack>
                    <IconButton
                        size={'sm'}
                        icon={<GrPrevious/>} 
                        cursor={'pointer'} 
                        onClick={() => onArrowClick(false)} 
                        aria-label="Previous day"
                        isDisabled={date == ""}
                    />
                    <IconButton 
                        size={'sm'} 
                        icon={<GrNext/>} 
                        cursor={'pointer'} 
                        onClick={() => onArrowClick(true)}
                        aria-label="Next day"
                        isDisabled={date == ""}
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
            />
        </VStack>
    );
};

export default DateInput;
