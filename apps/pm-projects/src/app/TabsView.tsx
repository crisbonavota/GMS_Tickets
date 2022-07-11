import { Text, VStack, HStack, Hide, Flex } from '@chakra-ui/react';
import { BsGearFill } from 'react-icons/bs';
import AddNewButton from './AddNewButton';
import TabsSelector from './tabs/TabsSelector';
import { useState } from 'react';
import TabsContent from './tabs/TabsContent';

const TabsView = () => {
    const [tabIndex, setTabIndex] = useState(0);
    return (
        <VStack
            w={'full'}
            h={'full'}
            p={5}
            py={10}
            alignItems={'center'}
            spacing={8}
        >
            <Flex
                w={'full'}
                justifyContent={'space-evenly'}
                alignItems={{ base: 'flex-start', md: 'center' }}
                flexDir={{ base: 'column', md: 'row' }}
                gap={5}
            >
                <HStack alignItems={'center'} fontSize={'3xl'}>
                    <BsGearFill color={'orangered'} />
                    <Text color={'#448F85'} fontWeight={'bold'}>
                        MANAGEMENT
                    </Text>
                </HStack>
                <Hide above="md">
                    <AddNewButton />
                </Hide>
                <TabsSelector tabIndex={tabIndex} setTabIndex={setTabIndex} />
                <Hide below="md">
                    <AddNewButton />
                </Hide>
            </Flex>
            <TabsContent tabIndex={tabIndex} setTabIndex={setTabIndex} />
        </VStack>
    );
};

export default TabsView;
