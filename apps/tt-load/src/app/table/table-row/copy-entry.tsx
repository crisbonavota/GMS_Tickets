import { Icon } from '@chakra-ui/react';
import { TimetrackItem } from '@gms-micro/api-utils';
import { useCallback, useMemo } from 'react';
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
    const dateInput = useMemo(
        () => document.getElementById('tt-load-date-input') as HTMLInputElement,
        []
    );

    const onClick = useCallback(() => {
        fillForm(item);
        setType('create');
        setSelected(null);
        window.scrollTo({
            top: 0,
            behavior: "smooth"
          });

        if ('showPicker' in HTMLInputElement.prototype) {
            // @ts-ignore
            dateInput.showPicker();
        } else {
            dateInput.focus();
        }
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
