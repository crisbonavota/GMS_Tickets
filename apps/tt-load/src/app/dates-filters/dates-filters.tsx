import { VStack, Heading, Input, Stack } from '@chakra-ui/react';

interface Props {
    from: string,
    to: string,
    setFrom: (from: string) => void,
    setTo: (to: string) => void
 }

const DatesFilters = ({ from, to, setFrom, setTo }: Props) => {
    return (
        <VStack alignItems={'flex-start'} spacing={3}>
            <Heading fontSize={'lg'}>Date</Heading>
            <Stack flexDir={{ base: 'column', md: 'row' }} direction={{ base: 'column', md: 'row' }}>
                <DatesFilterItem label={'From'} value={from} setter={setFrom} />
                <DatesFilterItem label={'To'} value={to} setter={setTo} />
            </Stack>
        </VStack>
    )
}

interface DatesFilterItemProps {
    label: string,
    value: string,
    setter: (value: string) => void
}

const DatesFilterItem = ({ label, value, setter }: DatesFilterItemProps) => {
    return (
        <VStack alignItems={'flex-start'}>
            <Heading fontSize={'sm'}>{label}</Heading>
            <Input type={'date'} value={value} onChange={(e) => setter(e.target.value)} />
        </VStack>
    )
}

export default DatesFilters
