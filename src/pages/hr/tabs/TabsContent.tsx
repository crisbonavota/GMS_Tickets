import { Tabs, TabPanels, TabPanel } from '@chakra-ui/react';
import Employees from './employees/Employees';
import Providers from './providers/Providers';
import BusinessUnits from './businessunits/BusinessUnits';
import Trainings from './trainings/Trainings';

interface Props {
    tabIndex: number;
    setTabIndex: (tabIndex: number) => void;
}

const TabsContent = ({ tabIndex, setTabIndex }: Props) => {
    localStorage.setItem('tabIndexHR', JSON.stringify(tabIndex));
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
                    <Employees />
                </TabPanel>
                <TabPanel>
                    <Providers />{' '}
                </TabPanel>
                <TabPanel>
                    <BusinessUnits />
                </TabPanel>
                <TabPanel>
                    <Trainings />
                </TabPanel>
            </TabPanels>
        </Tabs>
    );
};
export default TabsContent;
