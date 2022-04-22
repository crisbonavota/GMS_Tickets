import { Skeleton, Select, Input, VStack } from '@chakra-ui/react';
import { AxiosResponse } from 'axios';
import { UseQueryResult } from 'react-query';
import LabelsChips from '../labels-chips/labels-chips';
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
    const [searchInput, setSearchInput] = useState("");

    const onSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        if (e.target.value) {
            var element = query.data?.data.find(d => d.id === parseInt(e.target.value));
            // Only add select to array if it isn't in the array already
            if (!values.find(value => value.id == element.id)) setter(values.concat({ id: element.id, label: element[nameField] }));
        }
    }

    return (
        <>
            {query.isLoading &&
                <VStack flex={{ base: undefined, md: 1 }} w={{ base: 'full', md: undefined }} m={2}>
                    <Skeleton h={'20px'} w={'full'} />
                    <Skeleton h={'40px'} w={'full'} />
                </VStack>}
            {query.isSuccess && query.data &&
                <VStack m={2} flex={{ base: undefined, md: 1 }} w={{ base: 'full', md: undefined }} alignItems={'flex-start'}>
                    <Input
                        autoFocus
                        bgColor={'white'}
                        value={searchInput}
                        onChange={(e) => setSearchInput(e.target.value)}
                        placeholder={`Search on ${placeholder}s`}
                        size={'xs'}
                        />
                    <Select
                        placeholder={!searchInput.length ? placeholder : `Searching for ${searchInput}`}
                        bgColor={'white'}
                        disabled={query.isLoading || query.isError}
                        onChange={onSelectChange}
                        value={""} // This way the select always shows the placeholder, required because we're using it to fill an array, not selecting a single item
                        cursor="pointer"
                    >
                        {processSearchInput(query.data.data, nameField, searchInput).map(e =>
                            <option key={e.id} value={e.id} data-name={e[nameField]}>
                                {e[nameField]}
                            </option>)}
                    </Select>
                    <LabelsChips values={values} setter={setter} />
                </VStack>
            }
        </>
    )
}

const processSearchInput = (data: any[], nameField: string, input: string) => {
    if (!input.length) return data;
    return data.filter(d => d[nameField].toLowerCase().includes(input.toLowerCase()));
}

export default SelectItemsDropdown;
