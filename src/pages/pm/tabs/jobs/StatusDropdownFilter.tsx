import {
    CheckboxGroup,
    VStack,
    Text,
    Checkbox,
    Icon,
    HStack,
} from '@chakra-ui/react';
import { BsFillCircleFill } from 'react-icons/bs';

interface Props {
    setter: (value: string[]) => void;
    value: {
        active: boolean;
        inactive: boolean;
    };
}

const StatusDropdownFilter = ({ setter, value }: Props) => {
    const parseValue = () => {
        const res = [];
        if (value.active) res.push('active');
        if (value.inactive) res.push('inactive');
        return res;
    };

    return (
        <VStack alignItems={'flex-start'} w={'full'}>
            <Text>Status</Text>
            <CheckboxGroup
                onChange={setter}
                defaultValue={['active', 'inactive']}
                value={parseValue()}
            >
                <VStack alignItems={'flex-start'}>
                    <Checkbox value={'active'}>
                        <HStack alignItems={'center'}>
                            <Icon as={BsFillCircleFill} color={'green'} />
                            <Text>Active</Text>
                        </HStack>
                    </Checkbox>
                    <Checkbox value={'inactive'}>
                        <HStack alignItems={'center'}>
                            <Icon as={BsFillCircleFill} color={'red'} />
                            <Text>Inactive</Text>
                        </HStack>
                    </Checkbox>
                </VStack>
            </CheckboxGroup>
        </VStack>
    );
};
export default StatusDropdownFilter;
