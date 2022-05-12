import { Accordion, AccordionItem, AccordionButton, Box, AccordionIcon, AccordionPanel, Text, Heading, HStack, Icon, VStack } from '@chakra-ui/react'
import { TimetrackItem } from '@gms-micro/api-utils'
import moment from 'moment';
import { MdModeEditOutline } from 'react-icons/md';

type Props = {
    items: Array<Array<TimetrackItem>>,
    selected: number | null,
    onEdit: (item: TimetrackItem) => void
}

const WeeklyTabAccordion = ({ items, selected, onEdit }: Props) => {
    return (
        <Accordion allowToggle w={'full'} bgColor={'white'} maxH={{ base: '30vh', md: '40vh'}} overflowY={'auto'}>
            {items.map((item, index) =>
                <AccordionItem key={index}>
                    <h2>
                        <AccordionButton>
                            <Box flex='1' textAlign='left'>
                                {moment(item[0].date).format('ddd').toUpperCase()}&nbsp;
                                -&nbsp;
                                {moment(item[0].date).locale(navigator.language).format(navigator.language.includes('en') ? 'MM-DD' : 'DD/MM')}
                            </Box>
                            <AccordionIcon />
                        </AccordionButton>
                    </h2>
                    <AccordionPanel p={0}>
                        {item.map((item, index) =>
                            <HStack
                                justify={'space-between'}
                                w={'full'}
                                key={item.id}
                                bgColor={selected === item.id ? 'green.100' : (index % 2 ? 'white' : '#F6ECD4')}
                                p={3}
                                borderWidth={1}
                                border={selected === item.id ? '5px solid steelblue' : 'none'}
                            >
                                <HStack spacing={5}>
                                    <Icon cursor={'pointer'} size={'sm'} color={'steelblue'} as={MdModeEditOutline} onClick={() => onEdit(item)} />
                                    <VStack w={'fit-content'} alignItems={'flex-start'}>
                                        <Text>{item.project.name}</Text>
                                        <Text>{item.task}</Text>
                                    </VStack>
                                </HStack>
                                <Heading fontSize={'sm'}>{item.hours}h</Heading>
                            </HStack>)}
                        
                    </AccordionPanel>
                </AccordionItem>)}
        </Accordion>
    )
}

export default WeeklyTabAccordion
