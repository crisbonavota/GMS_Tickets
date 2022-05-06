import { Select, VStack, Text } from '@chakra-ui/react';

const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

type Props = {
    month: number,
    setMonth: (month: number) => void
}

const MonthFilter = ({ month, setMonth }: Props) => {
    return (
        <VStack alignItems={'flex-start'}>
            <Text fontSize={'sm'}>Month</Text>
            <Select w={'fit-content'} value={month} bgColor={'white'} onChange={(e) => setMonth(parseInt(e.target.value))}>
                {months.map((month, index) => <option key={month} value={index + 1}>{month}</option>)}
            </Select>
        </VStack>
    )
}

export default MonthFilter
