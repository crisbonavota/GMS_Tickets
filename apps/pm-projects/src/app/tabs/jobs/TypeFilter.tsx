import {
    CheckboxGroup,
    VStack,
    Text,
    Checkbox,
    Icon,
    HStack,
} from '@chakra-ui/react';
import { IoIosRocket } from 'react-icons/io';
import { RiSendBackward } from 'react-icons/ri';

interface Props {
    setter: (value: string[]) => void;
    value: {
        project: boolean;
        proposal: boolean;
    };
}

const TypeFilter = ({ setter, value }: Props) => {
    const parseValue = () => {
        const res = [];
        if (value.project) res.push('project');
        if (value.proposal) res.push('proposal');
        return res;
    };

    return (
        <VStack alignItems={'flex-start'} w={'full'}>
            <Text>Type</Text>
            <CheckboxGroup
                onChange={setter}
                defaultValue={['project', 'proposal']}
                value={parseValue()}
            >
                <VStack alignItems={'flex-start'}>
                    <Checkbox value={'project'}>
                        <HStack alignItems={'center'}>
                            <Icon as={IoIosRocket} color={'#3B8A7F'} />
                            <Text>Project</Text>
                        </HStack>
                    </Checkbox>
                    <Checkbox value={'proposal'}>
                        <HStack alignItems={'center'}>
                            <Icon as={RiSendBackward} color={'#3B8A7F'} />
                            <Text>Proposal</Text>
                        </HStack>
                    </Checkbox>
                </VStack>
            </CheckboxGroup>
        </VStack>
    );
};
export default TypeFilter;
