import { Box, Skeleton, Stack } from '@chakra-ui/react';
import { getResourceList } from '@gms-micro/api-utils';
import { MultiValue, Select } from 'chakra-react-select';
import { useMemo } from 'react';
import { chakraSelectStyle } from '@gms-micro/chakra-react-select-styles';
import { useQuery } from 'react-query';
import { useAuthHeader } from 'react-auth-kit';

interface DropdownItem {
    title: string;
    resource: string;
    labelOption: string;
    valueOption: string;
    values: number[];
    setValue: React.Dispatch<React.SetStateAction<number[]>>;
}

interface SelectFiltersProps {
    dropdownsData: Array<DropdownItem>;
}

export function SelectFilters({ dropdownsData }: SelectFiltersProps) {
    return (
        <Stack
            alignItems={'flex-start'}
            flexDir={{ base: 'column', md: 'row' }}
            w={'full'}
            direction={{ base: 'column', md: 'row' }}
        >
            {dropdownsData.map((dd, i) => (
                <SelectFiltersItem dropdownItem={dd} key={i} />
            ))}
        </Stack>
    );
}

interface SelectFiltersItemProps {
    dropdownItem: DropdownItem;
}

const SelectFiltersItem = ({ dropdownItem }: SelectFiltersItemProps) => {
    const getAuthHeader = useAuthHeader();
    const query = useQuery([dropdownItem.resource], () =>
        getResourceList(dropdownItem.resource, getAuthHeader())
    );

    const getOptions = useMemo(
        () => (data: any[]) => {
            return data.map((item) => {
                return {
                    value: item[dropdownItem.valueOption],
                    label: item[dropdownItem.labelOption],
                };
            });
        },
        []
    );

    const onChange = useMemo(
        () => (selected: MultiValue<any>) => {
            const values = selected.map((s) => s.value);
            dropdownItem.setValue(values);
        },
        []
    );

    return (
        <>
            {query.isLoading && <Skeleton w={'full'} h={'2.4rem'} />}
            <Box w={'full'}>
                {query.isSuccess && (
                    <Select
                        size="md"
                        options={getOptions(query.data.data)}
                        chakraStyles={chakraSelectStyle}
                        isMulti
                        placeholder={dropdownItem.title}
                        onChange={onChange}
                    />
                )}
            </Box>
        </>
    );
};

export default SelectFilters;
