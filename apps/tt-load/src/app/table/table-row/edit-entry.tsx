import { Icon } from '@chakra-ui/react';
import { TimetrackItem } from '@gms-micro/api-utils';
import { MdModeEditOutline } from 'react-icons/md';

export interface EditEntryProps {
    onEdit: (item: TimetrackItem) => void;
    item: TimetrackItem;
}

export function EditEntry({ onEdit, item }: EditEntryProps) {
    return (
        <Icon
            cursor={'pointer'}
            size={'sm'}
            color={'steelblue'}
            as={MdModeEditOutline}
            onClick={() => onEdit(item)}
        />
    );
}

export default EditEntry;
