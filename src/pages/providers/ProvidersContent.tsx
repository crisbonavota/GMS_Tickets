import { Tabs, TabPanels, TabPanel } from '@chakra-ui/react';
import Providers from './Providers';

const ProvidersContent = () => {
    return (
        <Tabs
            w={{ base: 'full', md: '80%' }}
        >
            <TabPanels
                bgColor={'gray.200'}
                rounded={10}
                borderWidth={1}
                borderColor={'lightgray'}
                borderStyle={'solid'}
                p={5}
                w={'full'}
            >
                <TabPanel w={'full'}>
                    <Providers />
                </TabPanel>
            </TabPanels>
        </Tabs>
    );
};
export default ProvidersContent;
