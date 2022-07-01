import { Input, VStack, Text } from '@chakra-ui/react'

type Props = {
    setter: (value: string) => void,
    value: string
}

const NameInput = ({ setter, value }: Props) => {
    return (
        <VStack alignItems={'flex-start'}>
            <Text fontSize={'sm'}>Name</Text>
            <Input
                bgColor={'white'}
                value={value}
                onChange={(e) => setter(e.target.value)}
            />
        </VStack>
    )
}

export default NameInput