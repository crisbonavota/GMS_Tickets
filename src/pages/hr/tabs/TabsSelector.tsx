import { Tab, TabList, Tabs } from '@chakra-ui/react';

const commonTabProps = {
    fontWeight: 'bold',
    minWidth: '10vw',
    flex: 1,
    _selected: {
        color: 'orangered',
        borderColor: 'orangered',
    },
    boxShadow: 'none !important',
};

interface Props {
    tabIndex: number;
    setTabIndex: (tabIndex: number) => void;
}

const TabsSelector = ({ tabIndex, setTabIndex }: Props) => {
    return (
        <Tabs
            onChange={setTabIndex}
            index={tabIndex}
            w={{ base: 'full', md: 'fit-content' }}
        >
            <TabList>
                <Tab {...commonTabProps}>Employees</Tab>
                <Tab {...commonTabProps}>Business Units</Tab>
                <Tab {...commonTabProps}>Trainings</Tab>
            </TabList>
        </Tabs>
    );
};

export default TabsSelector;
