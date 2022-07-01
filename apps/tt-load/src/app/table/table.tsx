import { Tab, TabList, TabPanel, TabPanels, Tabs, Box } from '@chakra-ui/react';
import DailyTab from './daily-tab/daily-tab';
import { useState, useMemo } from 'react';
import WeeklyTab from './weekly-tab/weekly-tab';
import CustomTab from './custom-tab/custom-tab';
import CustomTabPopoverFilters from './custom-tab/custom-tab-popover-filters';
import WeeklyTabExpandButtons from './weekly-tab/weekly-tab-expand-buttons';

const TableComponent = () => {
    const [tabIndex, setTabIndex] = useState(0);
    const onWeeklyTab = useMemo(() => tabIndex === 1, [tabIndex]);
    const onCustomTab = useMemo(() => tabIndex === 2, [tabIndex]);

    return (
        <Box
            w={{ base: '100%', md: '50%' }}
            p={5}
            bgColor={'#F0F0EF'}
            borderRadius={{ base: 0, md: 10 }}
            minH={'60vh'}
            h={'fit-content'}
            position={'relative'}
        >
            <Tabs index={tabIndex} onChange={setTabIndex}>
                <TabList
                    bgColor={'white'}
                    w={'fit-content'}
                    mb={5}
                    borderRadius={5}
                    px={5}
                    borderWidth={1}
                    borderColor={'lightgray'}
                >
                    <Tab>Daily</Tab>
                    <Tab>Weekly</Tab>
                    <Tab>Custom</Tab>
                </TabList>
                <TabPanels>
                    <TabPanel>
                        <DailyTab />
                    </TabPanel>
                    <TabPanel>
                        <WeeklyTab />
                    </TabPanel>
                    <TabPanel>
                        <CustomTab />
                    </TabPanel>
                </TabPanels>
            </Tabs>
            {onCustomTab && <CustomTabPopoverFilters />}
            {onWeeklyTab && <WeeklyTabExpandButtons />}
        </Box>
    );
};

export default TableComponent;
