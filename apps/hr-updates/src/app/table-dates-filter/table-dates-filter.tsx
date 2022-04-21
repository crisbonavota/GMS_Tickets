import { HStack, VStack, Text, chakra } from '@chakra-ui/react';

export interface TableDatesFilterProps {
    from: string,
    to: string,
    setFrom: (date: string) => void,
    setTo: (date: string) => void,
    isLoading: boolean
}

export function TableDatesFilter({ from, to, setFrom, setTo, isLoading }: TableDatesFilterProps) {
    const onFromChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFrom(e.target.value);
        if (to && Date.parse(to) < Date.parse(e.target.value)) {
            setTo("");
        }
    }

    const onToChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setTo(e.target.value);
        if (from && Date.parse(from) > Date.parse(e.target.value)) {
            setFrom("");
        }
    }

    return (
        <HStack>
            <VStack alignItems={'flex-start'}>
                <Text fontSize={'sm'}>From</Text>
                <chakra.input 
                    disabled={isLoading} 
                    onChange={onFromChange} 
                    value={from} 
                    p={1.5}
                    borderRadius={5} 
                    borderColor={'lightgray'} 
                    borderWidth={1} 
                    type={'date'} 
                />
            </VStack>
            <VStack alignItems={'flex-start'}>
                <Text fontSize={'sm'}>To</Text>
                <chakra.input 
                    disabled={isLoading} 
                    onChange={onToChange} 
                    value={to} 
                    p={1.5} 
                    borderRadius={5} 
                    borderColor={'lightgray'} 
                    borderWidth={1} 
                    type={'date'} 
                />
            </VStack>
        </HStack>
    );
}

export default TableDatesFilter;
