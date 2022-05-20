import { Icon } from '@chakra-ui/react';
import { TimetrackItem } from '@gms-micro/api-utils';
import { FiCopy } from 'react-icons/fi';

export interface CopyEntryProps {
    onCopy: (item: TimetrackItem) => void;
    item: TimetrackItem;
}

export function CopyEntry({ item, onCopy }: CopyEntryProps) {
    return (
        <Icon
            cursor={'pointer'}
            size={'sm'}
            color={'steelblue'}
            as={FiCopy}
            onClick={() => onCopy(item)}
        />
    );
}

export default CopyEntry;
