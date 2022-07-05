import { Tabs, TabPanels, TabPanel } from '@chakra-ui/react';
import Clients from './Clients';
import Accounts from './Accounts';
import Jobs from './Jobs';

interface Props {
    tabIndex: number;
    setTabIndex: (tabIndex: number) => void;
}

const TabsContent = ({ tabIndex, setTabIndex }: Props) => {
    return (
        <Tabs index={tabIndex} onChange={setTabIndex} w={'full'}>
            <TabPanels>
                <TabPanel>
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
