import { Input, Text, VStack, Flex } from '@chakra-ui/react';
import { useCallback } from 'react';
import moment from 'moment';

interface Props {
    from: string;
    to: string;
    setFrom: (from: string) => void;
    setTo: (to: string) => void;
}
const DatesFilters = ({ from, to, setFrom, setTo }: Props) => {
    const onFromChange = useCallback(
        (e: React.ChangeEvent<HTMLInputElement>) => {
            setFrom(e.target.value);
            if (to !== '' && moment(e.target.value).isAfter(moment(to))) {
                setTo('');
            }
        },
        [setTo, from, setFrom, to]
    );

    const onToChange = useCallback(
        (e: React.ChangeEvent<HTMLInputElement>) => {
            setTo(e.target.value);
            if (from !== '' && moment(e.target.value).isBefore(moment(from))) {
                setFrom('');
            }
        },
        [setTo, from, setFrom, to]
    );
    return (
        <Flex w={'full'} flexDir={['column', 'row']} gap={3}>
            <VStack flex={1} alignItems={'flex-start'}>
                <Text fontSize={'sm'}>From</Text>
                <Input
                    type={'date'}
                    bgColor={'white'}
                    w={'full'}
                    value={from}
                    onChange={onFromChange}
                />
            </VStack>
            <VStack flex={1} alignItems={'flex-start'}>
                <Text fontSize={'sm'}>To</Text>
                <Input
                    type={'date'}
                    bgColor={'white'}
                    w={'full'}
                    value={to}
                    onChange={onToChange}
                />
            </VStack>
        </Flex>
    );
};

export default DatesFilters;
