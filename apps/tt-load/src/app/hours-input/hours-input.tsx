import { VStack, Heading, Input } from '@chakra-ui/react'

type Props = {
    hours: string,
    setHours: (hours: string) => void
}

const HoursInput = ({ hours, setHours }: Props) => {
    return (
        <VStack alignItems={'flex-start'}>
            <Heading fontSize={'md'}>Hours</Heading>
            <Input 
                value={hours} 
                onChange={(e) => setHours(e.target.value)} 
                type={'time'} 
                bgColor={'white'} 
                borderWidth={1} 
                borderColor={'lightgray'} 
            />
        </VStack>
    )
}

export default HoursInput;
