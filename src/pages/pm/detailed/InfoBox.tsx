import { Box, VStack, Text, BoxProps } from '@chakra-ui/react';

const InfoBox = (props: BoxProps) => {
    return <Box p={5} rounded={20} bgColor={'#3B8A7F'} {...props} />;
};

interface InfoTitleProps {
    title: string;
    content?: string;
    color?: string;
}

export const InfoTitle = ({ title, content, color }: InfoTitleProps) => {
    return (
        <VStack alignItems={'flex-start'} spacing={2}>
            <Text fontSize={'md'} color={color ||'#FBEAC0'}>
                {title}
            </Text>
            <Text fontSize={'lg'} color={'white'} fontWeight={'bold'}>
                {content && content.length > 0 ? content : 'N/A'}
            </Text>
        </VStack>
    );
};

export default InfoBox;
