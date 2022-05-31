import {
    Tab,
    TabList,
    TabPanel,
    TabPanels,
    Tabs,
    Box,
    Popover,
    PopoverArrow,
    PopoverBody,
    PopoverCloseButton,
    PopoverContent,
    PopoverTrigger,
    VStack,
    Text,
} from '@chakra-ui/react';
import DailyTab from './daily-tab/daily-tab';
import { useState, useCallback, useMemo } from 'react';
import { TimetrackItem } from '@gms-micro/api-utils';
import WeeklyTab from './weekly-tab/weekly-tab';
import { IconButton, HStack, Divider } from '@chakra-ui/react';
import { AiOutlineControl } from 'react-icons/ai';
import DatesFilters from './custom-tab/dates-filters';
import CustomTab from './custom-tab/custom-tab';
import { QuerySelect } from '@gms-micro/query-utils';
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

    const onEdit = useCallback(
        (item: TimetrackItem) => {
            if (item.id === selected) {
                resetForm();
                setType('create');
                setSelected(null);
            } else {
                fillForm(item);
                setType('edit');
                setSelected(item.id);
            }
        },
        [selected]
    );

    const onCopy = useCallback((item: TimetrackItem) => {
        fillForm(item);
        setType('create');
        setSelected(null);
    }, []);

    const onDelete = useCallback(() => {
        resetForm();
        setSelected(null);
        setType('create');
    }, []);

    const handleTabsChange = useCallback((index: number) => {
        setTabIndex(index);
    }, []);

    const clearFilters = useCallback(() => {
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
                            onEdit={onEdit}
                            onCopy={onCopy}
                            onDelete={onDelete}
                        />
                    </TabPanel>
                    <TabPanel>
                        <WeeklyTab
                            selected={selected}
                            onEdit={onEdit}
                            onCopy={onCopy}
                            onDelete={onDelete}
                        />
                    </TabPanel>
                    <TabPanel>
                        <CustomTab
                            from={from}
                            to={to}
                            selected={selected}
                            onEdit={onEdit}
                            onCopy={onCopy}
                            project={projectFilter}
                            clearFilters={clearFilters}
                            onDelete={onDelete}
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
