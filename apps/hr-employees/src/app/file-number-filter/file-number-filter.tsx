import { VStack, Text, Input } from '@chakra-ui/react'

type Props = {
    fileNumber?: number,
    setFileNumber: (fileNumber: number) => void
}

const FileNumberInput = ({ fileNumber, setFileNumber }: Props) => {

    return (
        <VStack alignItems={'flex-start'}>
            <Text fontSize={'sm'}>File Number</Text>
                <>
                    <Input
                        type={'text'}
                        bgColor={'white'}
                        borderWidth={1}
                        borderColor={'lightgray'}
                        list={"fileNumbers-list"}
                        css={{
                            '&::-webkit-calendar-picker-indicator': {
                                display: 'none !important'
                            }
                        }}
                        value={fileNumber ? fileNumber.toString() : ''}
                        onChange={(e) => setFileNumber(parseInt(e.target.value))}
                    />
                </>
        </VStack>
    )
}

export default FileNumberInput