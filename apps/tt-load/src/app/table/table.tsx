import { Tab, TabList, TabPanel, TabPanels, Tabs, Box } from '@chakra-ui/react';
import DailyTab from '../daily-tab/daily-tab';
import { useMemo } from 'react';
import { TimetrackItem } from '@gms-micro/api-utils';
import WeeklyTab from '../weekly-tab/weekly-tab';

type Props = {
    authHeader: string,
    selected: number | null,
    resetForm: () => void,
    fillForm: (item: TimetrackItem) => void
}

const TableComponent = ({ authHeader, selected, fillForm, resetForm }: Props) => {

    const onEdit = useMemo(() => (item: TimetrackItem) => {
        if (item.id === selected) resetForm();
        else fillForm(item);
    }, [selected]);

    return (
        <Box
            w={{ base: '100%', md: '50%' }}
            p={5}
            bgColor={'#F0F0EF'}
            borderRadius={{ base: 0, md: 10 }}
        >
            <Tabs h={'full'}>
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
                </TabList>
                <TabPanels h={'50vh'}>
                    <TabPanel h={'full'}>
                        <DailyTab
                            authHeader={authHeader}
                            selected={selected}
                            onEdit={onEdit}
                        />
                    </TabPanel>
                    <TabPanel>
                        <WeeklyTab authHeader={authHeader} selected={selected} onEdit={onEdit} />
                    </TabPanel>
                </TabPanels>
            </Tabs>
        </Box>
    )
}

export default TableComponent