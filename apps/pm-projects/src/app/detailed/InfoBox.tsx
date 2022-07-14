import { Box, VStack, Text } from '@chakra-ui/react';

interface Props {
    children: React.ReactNode;
}

const InfoBox = ({ children }: Props) => {
    return (
        <Box p={5} rounded={20} bgColor={'#3B8A7F'}>
            {children}
        </Box>
    );
};

interface InfoTitleProps {
    title: string;
    content: string;
}

export const InfoTitle = ({ title, content }: InfoTitleProps) => {
    return (
        <VStack alignItems={'flex-start'} spacing={2}>
            <Text fontSize={'md'} color={'#FBEAC0'}>
                {title}
            </Text>
            <Text fontSize={'lg'} color={'white'} fontWeight={'bold'}>
                {content && content.length > 0 ? content : 'N/A'}
            </Text>
        </VStack>
    );
};

export default InfoBox;
