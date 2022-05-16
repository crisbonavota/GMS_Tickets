import { VStack, Text, Input } from '@chakra-ui/react'

type Props = {
    afipId: string,
    setAfipId: (afipId: string) => void
}

const AfipIdInput = ({ afipId, setAfipId }: Props) => {

    return (
        <VStack alignItems={'flex-start'}>
            <Text fontSize={'sm'}>CUIT</Text>
                <>
                    <Input
                        type={'text'}
                        bgColor={'white'}
                        borderWidth={1}
                        borderColor={'lightgray'}
                        list={"afipIds-list"}
                        css={{
                            '&::-webkit-calendar-picker-indicator': {
                                display: 'none !important'
                            }
                        }}
                        value={afipId ? afipId : ''}
                        onChange={(e) => setAfipId(e.target.value)}
                    />
                </>
        </VStack>
    )
}

export default AfipIdInput