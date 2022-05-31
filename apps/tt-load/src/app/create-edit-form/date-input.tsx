import { VStack, Input, Heading } from '@chakra-ui/react';

type Props = {
    date: string;
    setDate: (date: string) => void;
};

const DateInput = ({ date, setDate }: Props) => {
    return (
        <VStack alignItems={'flex-start'}>
            <Heading fontSize={'md'}>Date</Heading>
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
