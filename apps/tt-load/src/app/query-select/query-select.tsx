import { VStack, Heading, Skeleton, Box } from '@chakra-ui/react';
import { getResourceList } from '@gms-micro/api-utils';
import { chakraSelectStyle } from '@gms-micro/chakra-react-select-styles';
import { useQuery } from 'react-query';
import { Select } from 'chakra-react-select';
import { useState, useMemo, useEffect } from 'react';

const getOptions = (data: any[], valueOption: string, labelOption: string) => {
    return data.map(item => {
        return {
            value: (item as any)[valueOption],
            label: (item as any)[labelOption]
        }
    });
}

type Props = {
    authHeader: string,
    resource: string,
    labelOption?: string,
    valueOption?: string,
    title: string,
    value?: any,
    setValue: (value?: any) => void
}

const QuerySelect = ({ authHeader, resource, labelOption = "name", valueOption = "id", title, value, setValue }: Props) => {
    const query = useQuery([resource], () => getResourceList(resource, authHeader));
    const [internalValue, setInternalValue] = useState<{ label: string, value: any } | null>(null);

    const onChange = useMemo(() => (element: any) => {
        setInternalValue(element);
        setValue(element.value);
    }, []);

    // This is for when an external component changes the value (clicking on edit an item for example)
    useEffect(() => {
        if (!value) return setInternalValue(null);
        if (query.isSuccess) {
            const element = getOptions(query.data.data, valueOption, labelOption).find(item => item.value === value);
            element && setInternalValue(element);
        }
    }, [value])

    return (
        <VStack alignItems={'flex-start'}>
            <Heading fontSize={'md'}>{title}</Heading>
            {query.isLoading && <Skeleton w={'full'} h={'2.4rem'} />}
            <Box w={'full'}>
                {query.isSuccess &&
                    <Select
                        size='md'
                        options={getOptions(query.data.data, valueOption, labelOption)}
                        chakraStyles={chakraSelectStyle}
                        value={internalValue}
                        onChange={onChange}
                    />}
            </Box>
        </VStack>
    )
}

export default QuerySelect
