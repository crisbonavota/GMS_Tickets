import { Icon } from '@chakra-ui/react';
import { TimetrackItem } from '@gms-micro/api-utils';
import { useCallback } from 'react';
import { MdModeEditOutline } from 'react-icons/md';

export interface EditEntryProps {
    item: TimetrackItem;
    resetForm: () => void;
    setType: (type: 'edit' | 'create') => void;
    setSelected: (id: number | null) => void;
    fillForm: (item: TimetrackItem) => void;
    selected: number | null;
}

export function EditEntry({
    item,
    resetForm,
    setType,
    setSelected,
    fillForm,
    selected,
}: EditEntryProps) {
    const onClick = useCallback(() => {
        if (item.id === selected) {
            resetForm();
            setType('create');
            setSelected(null);
            window.scrollTo(0,0);
        } else {
            fillForm(item);
            setType('edit');
            setSelected(item.id);
            window.scrollTo(0,0);
        }
    }, [item, selected, setType, setSelected, fillForm, resetForm]);
    return (
        <Icon
            cursor={'pointer'}
            size={'sm'}
            color={'steelblue'}
            as={MdModeEditOutline}
            onClick={onClick}
        />
    );
}

export default EditEntry;
