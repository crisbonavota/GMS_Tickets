import { HStack, Icon, Text } from '@chakra-ui/react';
import { IoIosRocket } from 'react-icons/io';
import { RiSendBackward } from 'react-icons/ri';

interface Props {
    sold: boolean;
}

const JobType = ({ sold }: Props) => {
    return (
        <HStack spacing={1} alignItems={'center'}>
            <Icon as={sold ? IoIosRocket : RiSendBackward} color={'#3B8A7F'} />
            <Text>{sold ? 'Project' : 'Proposal'}</Text>
        </HStack>
    );
};
export default JobType;
