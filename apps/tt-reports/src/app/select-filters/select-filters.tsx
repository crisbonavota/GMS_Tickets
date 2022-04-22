import { Flex } from '@chakra-ui/react';
import { AxiosResponse } from 'axios';
import { UseQueryResult } from 'react-query';
import SelectItemsDropdown, { SelectItem } from '../select-item/select-item';

interface SelectFilterQuery {
    query: UseQueryResult<AxiosResponse<any[], any>, unknown>,
    values: SelectItem[],
    setter: (values: SelectItem[]) => void,
    nameField: string,
    placeholder: string
}

export interface SelectFiltersProps {
    selectItems: SelectFilterQuery[]
}

export function SelectFilters({ selectItems }: SelectFiltersProps) {
    return (
        <Flex
            alignItems={'flex-start'}
            h={'full'}
            flexDir={{ base: 'column', md: 'row' }}
        >
            {selectItems.map((item, index) =>
                <SelectItemsDropdown
                    query={item.query}
                    placeholder={item.placeholder}
                    values={item.values}
                    setter={item.setter}
                    nameField={item.nameField}
                    key={index}
                />)}
        </Flex>
    );
}

export default SelectFilters;
