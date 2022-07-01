import { VStack, Text, Select } from '@chakra-ui/react'

const currentYear = new Date().getFullYear();
const last10Years = new Array(10).fill(0).map((_, index) => currentYear - index);

type Props = {
    year: number,
    setYear: (year: number) => void
}

const YearFilter = ({ year, setYear }: Props) => {
    return (
        <VStack alignItems={'flex-start'}>
            <Text fontSize={'sm'}>Year</Text>
            <Select w={'fit-content'} value={year} bgColor={'white'} onChange={(e) => setYear(parseInt(e.target.value))}>
                {last10Years.map((year) => <option key={year} value={year}>{year}</option>)}
            </Select>
        </VStack>
    )
}

export default YearFilter