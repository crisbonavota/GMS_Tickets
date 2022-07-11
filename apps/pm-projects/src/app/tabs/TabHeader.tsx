import { HStack, Icon, Heading } from '@chakra-ui/react';
import { IconType } from 'react-icons/lib';

interface Props {
    label: string;
    icon: IconType;
}
const TabHeader = ({ label, icon }: Props) => {
    return (
        <HStack spacing={2} fontSize={'4xl'}>
            <Icon as={icon} color={'#3B8A7F'} />
            <Heading fontSize={'inherit'}>{label}</Heading>
        </HStack>
    );
};
export default TabHeader;
