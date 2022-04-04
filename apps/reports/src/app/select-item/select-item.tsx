import { Skeleton, Select } from '@chakra-ui/react';
import { AxiosResponse } from 'axios';
import { UseQueryResult } from 'react-query';
import LabelsChips from '../labels-chips/labels-chips';

export interface SelectItem {
    label: string,
    id: string
}

export interface SelectItemsDropdownProps {
    placeholder: string,
    values: SelectItem[],
    setter: (values: SelectItem[]) => void,
    query: UseQueryResult<AxiosResponse<any[], any>, unknown>,
    nameField: string,
}

const SelectItemsDropdown = ({ placeholder, setter, query, values, nameField }: SelectItemsDropdownProps) => {
    const onSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        if (e.target.value) {
            var element = query.data?.data.find(d => d.id === parseInt(e.target.value));
            var elementAsSelectItem = { id: element.id, label: element[nameField] };
            if (!values.includes(elementAsSelectItem)) setter(values.concat(elementAsSelectItem));
        }
    }

    return (
        <>
            <LabelsChips values={values} setter={setter} />
            {query.isLoading && <Skeleton h={'40px'} w={'full'} />}
            {query.isSuccess && query.data &&
                <Select
                    placeholder={placeholder}
                    bgColor={'white'}
                    disabled={query.isLoading || query.isError}
                    onChange={onSelectChange}
                >
                    {query.data.data.map(e =>
                        <option key={e.id} value={e.id} data-name={e[nameField]}>
                            {e[nameField]}
                        </option>)}
                </Select>}
        </>
    )
}

export default SelectItemsDropdown;
