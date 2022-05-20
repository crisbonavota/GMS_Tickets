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
import DailyTab from '../daily-tab/daily-tab';
import { useState, useCallback } from 'react';
import { TimetrackItem } from '@gms-micro/api-utils';
import WeeklyTab from '../weekly-tab/weekly-tab';
import { IconButton, HStack, Divider } from '@chakra-ui/react';
import { AiOutlineControl } from 'react-icons/ai';
import DatesFilters from '../dates-filters/dates-filters';
import CustomTab from '../custom-tab/custom-tab';
import { QuerySelect } from '@gms-micro/query-utils';

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
            {tabIndex === 2 && (
                <Popover placement="auto-start">
                    <PopoverTrigger>
                        <IconButton
                            size={'lg'}
                            colorScheme={'orange'}
                            position={'absolute'}
                            icon={<AiOutlineControl size={25} />}
                            top={0}
                            right={0}
                            m={5}
                            aria-label="filters"
                        />
                    </PopoverTrigger>
                    <PopoverContent w={'fit-content'}>
                        <PopoverArrow />
                        <PopoverCloseButton />
                        <PopoverBody>
                            <VStack alignItems={'flex-start'} spacing={5} p={2}>
                                <DatesFilters
                                    from={from}
                                    to={to}
                                    setFrom={setFrom}
                                    setTo={setTo}
                                />
                                <HStack w={'full'} alignItems={'center'}>
                                    <Divider borderColor={'orangered'} />
                                    <Text px={3}>Or</Text>
                                    <Divider borderColor={'orangered'} />
                                </HStack>
                                <Box w={'full'}>
                                    <QuerySelect
                                        resource={'projects/member'}
                                        title={'Project'}
                                        value={projectFilter}
                                        setValue={setProjectFilter}
                                    />
                                </Box>
                            </VStack>
                        </PopoverBody>
                    </PopoverContent>
                </Popover>
            )}
        </Box>
    );
};

export default TableComponent;
