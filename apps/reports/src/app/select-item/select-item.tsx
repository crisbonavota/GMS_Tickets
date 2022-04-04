import { Skeleton, Select, HStack, IconButton, Icon, useBoolean, Input } from '@chakra-ui/react';
import { AxiosResponse } from 'axios';
import { UseQueryResult } from 'react-query';
import LabelsChips from '../labels-chips/labels-chips';
import { FiSearch } from 'react-icons/fi';
import { useState } from 'react';

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
    const [isOpen, setIsOpen] = useBoolean();
    const [searchInput, setSearchInput] = useState("");

    const onSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        if (e.target.value) {
            var element = query.data?.data.find(d => d.id === parseInt(e.target.value));
            var elementAsSelectItem = { id: element.id, label: element[nameField] };
            // Only add select to array if it isn't in the array already
            if (!values.includes(elementAsSelectItem)) setter(values.concat(elementAsSelectItem));
        }
    }

    const onClick = () => {
        setIsOpen.toggle();
        setSearchInput("");
    }

    return (
        <>
            <LabelsChips values={values} setter={setter} />
            {query.isLoading && <Skeleton h={'40px'} w={'full'} />}
            {query.isSuccess && query.data &&
                <HStack w={'full'}>
                    <IconButton
                        colorScheme={'blackAlpha'}
                        icon={<Icon as={FiSearch} />}
                        aria-label={'Search on dropdown'}
                        onClick={onClick}
                    />
                    {isOpen && 
                        <Input 
                            autoFocus 
                            bgColor={'white'} 
                            value={searchInput} 
                            onChange={(e) => setSearchInput(e.target.value)} 
                            placeholder={`Search on ${placeholder}s`}
                        />}
                    <Select
                        placeholder={!searchInput.length ? placeholder : `Searching for ${searchInput}`}
                        bgColor={'white'}
                        disabled={query.isLoading || query.isError}
                        onChange={onSelectChange}
                        value={""} // This way the select always shows the placeholder, required because we're using it to fill an array, not selecting a single item
                    >
                        {processSearchInput(query.data.data, nameField, searchInput).map(e =>
                            <option key={e.id} value={e.id} data-name={e[nameField]}>
                                {e[nameField]}
                            </option>)}
                    </Select>
                </HStack>
            }
        </>
    )
}

const processSearchInput = (data: any[], nameField: string, input: string) => {
    if (!input.length) return data;
    return data.filter(d => d[nameField].toLowerCase().includes(input.toLowerCase()));
}

export default SelectItemsDropdown;
