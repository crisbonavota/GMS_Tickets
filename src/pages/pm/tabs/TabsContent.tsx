import { Tabs, TabPanels, TabPanel } from '@chakra-ui/react';
import Clients from './clients/Clients';
import Accounts from './accounts/Accounts';
import Jobs from './jobs/Jobs';

interface Props {
    tabIndex: number;
    setTabIndex: (tabIndex: number) => void;
}

const TabsContent = ({ tabIndex, setTabIndex }: Props) => {
    localStorage.setItem('tabIndex', JSON.stringify(tabIndex));
    return (
        <Tabs
            index={tabIndex}
            onChange={setTabIndex}
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
                    <Clients />
                </TabPanel>
                <TabPanel>
                    <Accounts />{' '}
                </TabPanel>
                <TabPanel>
                    <Jobs />
                </TabPanel>
            </TabPanels>
        </Tabs>
    );
};
export default TabsContent;
