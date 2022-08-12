import { HStack, Radio, RadioGroup, Text, VStack } from '@chakra-ui/react';
import { AiOutlineMinus, AiOutlinePlus } from 'react-icons/ai';

interface Props {
    setter: (value: boolean) => void;
}

const StatusField = ({ setter }: Props) => {
    const handleChange = (e: string) => {
        setter(e === 'active');
    };

    return (
        <VStack alignItems={'flex-start'} w={'full'}>
            <Text>Status</Text>
            <RadioGroup onChange={handleChange} defaultValue={'active'}>
                <HStack spacing={5}>
                    <Radio value={'active'}>
                        <HStack>
                            <AiOutlinePlus color={'#3B8A7F'} />{' '}
                            <Text>Active</Text>
                        </HStack>
                    </Radio>
                    <Radio value={'inactive'}>
                        <HStack>
                            <AiOutlineMinus color={'orangered'} />{' '}
                            <Text>Inactive</Text>
                        </HStack>
                    </Radio>
                </HStack>
            </RadioGroup>
        </VStack>
    );
};

export default StatusField;
