import { Box } from '@chakra-ui/react';

interface Props {
    children: React.ReactNode;
}

const TablesBox = ({ children }: Props) => {
    return (
        <Box p={8} px={10} rounded={20} bgColor={'#F0F0F0'}>
            {children}
        </Box>
    );
};

export default TablesBox;
