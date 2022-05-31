import { Icon } from '@chakra-ui/react';
import { TimetrackItem } from '@gms-micro/api-utils';
import { useCallback } from 'react';
import { FiCopy } from 'react-icons/fi';

export interface CopyEntryProps {
    item: TimetrackItem;
    setType: (type: 'edit' | 'create') => void;
    setSelected: (id: number | null) => void;
    fillForm: (item: TimetrackItem) => void;
}

export function CopyEntry({
    item,
    fillForm,
    setType,
    setSelected,
}: CopyEntryProps) {
    const onClick = useCallback(() => {
        fillForm(item);
        setType('create');
        setSelected(null);
    }, [fillForm, setType, setSelected, item]);

    return (
        <Icon
            cursor={'pointer'}
            size={'sm'}
            color={'steelblue'}
            as={FiCopy}
            onClick={onClick}
        />
    );
}

export default CopyEntry;
