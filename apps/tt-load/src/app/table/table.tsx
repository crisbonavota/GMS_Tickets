import { Tab, TabList, TabPanel, TabPanels, Tabs, Box } from '@chakra-ui/react';
import DailyTab from './daily-tab/daily-tab';
import { useState, useCallback, useMemo } from 'react';
import { TimetrackItem } from '@gms-micro/api-utils';
import WeeklyTab from './weekly-tab/weekly-tab';
import CustomTab from './custom-tab/custom-tab';
import CustomTabPopoverFilters from './custom-tab/custom-tab-popover-filters';

type Props = {
    selected: number | null;
    resetForm: () => void;
    fillForm: (item: TimetrackItem) => void;
    setSelected: (id: number | null) => void;
    setType: (type: 'edit' | 'create') => void;
};

const TableComponent = ({
    selected,
    fillForm,
    resetForm,
    setSelected,
    setType,
}: Props) => {
    const [tabIndex, setTabIndex] = useState(0);
    const [from, setFrom] = useState('');
    const [to, setTo] = useState('');
    const [projectFilter, setProjectFilter] = useState<number>();
    const onCustomTab = useMemo(() => tabIndex === 2, [tabIndex]);

    const handleTabsChange = useCallback((index: number) => {
        setTabIndex(index);
    }, []);

    const clearCustomTabFilters = useCallback(() => {
        setFrom('');
        setTo('');
        setProjectFilter(undefined);
    }, []);

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
            <Tabs index={tabIndex} onChange={handleTabsChange}>
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
                        <DailyTab
                            selected={selected}
                            setSelected={setSelected}
                            setType={setType}
                            fillForm={fillForm}
                            resetForm={resetForm}
                        />
                    </TabPanel>
                    <TabPanel>
                        <WeeklyTab
                            selected={selected}
                            setSelected={setSelected}
                            setType={setType}
                            fillForm={fillForm}
                            resetForm={resetForm}
                        />
                    </TabPanel>
                    <TabPanel>
                        <CustomTab
                            from={from}
                            to={to}
                            selected={selected}
                            setSelected={setSelected}
                            setType={setType}
                            fillForm={fillForm}
                            resetForm={resetForm}
                            project={projectFilter}
                            clearFilters={clearCustomTabFilters}
                        />
                    </TabPanel>
                </TabPanels>
            </Tabs>
            {onCustomTab && (
                <CustomTabPopoverFilters
                    from={from}
                    to={to}
                    setFrom={setFrom}
                    setTo={setTo}
                    projectFilter={projectFilter}
                    setProjectFilter={setProjectFilter}
                />
            )}
        </Box>
    );
};

export default TableComponent;
