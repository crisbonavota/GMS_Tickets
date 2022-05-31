import { HStack, VStack, Heading, Text } from '@chakra-ui/react';
import { TimetrackItem } from '@gms-micro/api-utils';
import moment from 'moment';
import DeleteEntry from './delete-entry';
import EditEntry from './edit-entry';
import CopyEntry from './copy-entry';

export interface TableRowProps {
    item: TimetrackItem;
    selected: number | null;
    index: number;
    withDay?: boolean;
    resetForm: () => void;
    setType: (type: 'edit' | 'create') => void;
    setSelected: (id: number | null) => void;
    fillForm: (item: TimetrackItem) => void;
}

export function TableRow({
    item,
    selected,
    index,
    withDay,
    resetForm,
    setType,
    setSelected,
    fillForm,
}: TableRowProps) {
    return (
        <HStack
            justify={'space-between'}
            w={'full'}
            key={item.id}
            bgColor={
                selected === item.id
                    ? 'green.100'
                    : index % 2
                    ? 'white'
                    : '#F6ECD4'
            }
            p={3}
            borderWidth={1}
            border={selected === item.id ? '5px solid steelblue' : 'none'}
        >
            <HStack spacing={5}>
                <CopyEntry
                    item={item}
                    fillForm={fillForm}
                    setSelected={setSelected}
                    setType={setType}
                />
                <DeleteEntry
                    id={item.id}
                    resetForm={resetForm}
                    setSelected={setSelected}
                    setType={setType}
                />
                <EditEntry
                    item={item}
                    fillForm={fillForm}
                    setSelected={setSelected}
                    setType={setType}
                    resetForm={resetForm}
                    selected={selected}
                />
                <VStack w={'fit-content'} alignItems={'flex-start'}>
                    <Text>{item.project.name}</Text>
                    <Text>{item.task}</Text>
                </VStack>
            </HStack>
            <VStack alignItems={'flex-end'}>
                <Heading fontSize={'sm'}>{item.hours}h</Heading>
                {withDay && (
                    <Text fontSize={'sm'}>
                        {moment(item.date)
                            .locale(navigator.language)
                            .format(
                                navigator.language.includes('en')
                                    ? 'MM-DD-YY'
                                    : 'DD/MM/YY'
                            )}
                    </Text>
                )}
            </VStack>
        </HStack>
    );
}

export default TableRow;
