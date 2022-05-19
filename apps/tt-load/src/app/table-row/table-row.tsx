import { HStack, Icon, VStack, Heading, Text } from '@chakra-ui/react';
import { TimetrackItem } from '@gms-micro/api-utils';
import moment from 'moment';
import { MdModeEditOutline } from 'react-icons/md';
import DeleteEntry from '../delete-entry/delete-entry';

export interface TableRowProps {
    item: TimetrackItem;
    selected: number | null;
    index: number;
    onEdit: (item: TimetrackItem) => void;
    withDay?: boolean;
}

export function TableRow({
    item,
    selected,
    index,
    onEdit,
    withDay,
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
                <DeleteEntry id={item.id} />
                <Icon
                    cursor={'pointer'}
                    size={'sm'}
                    color={'steelblue'}
                    as={MdModeEditOutline}
                    onClick={() => onEdit(item)}
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
