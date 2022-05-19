import { VStack, Heading, Skeleton, Box } from '@chakra-ui/react';
import { getResourceList } from '@gms-micro/api-utils';
import { chakraSelectStyle } from '@gms-micro/chakra-react-select-styles';
import { useQuery } from 'react-query';
import { Select } from 'chakra-react-select';
import { useState, useMemo, useEffect } from 'react';
import { useAuthHeader } from 'react-auth-kit';

type QuerySelectProps = {
    resource: string;
    labelOption?: string;
    valueOption?: string;
    title: string;
    value?: any;
    setValue: (value?: any) => void;
};

/// This function returns a dropdown based on ChakraUI + React-Select, the values of the dropdown come from the resource endpoint
export const QuerySelect = ({
    resource,
    labelOption = 'name',
    valueOption = 'id',
    title,
    value,
    setValue,
}: QuerySelectProps) => {
    const getAuthHeader = useAuthHeader();
    const query = useQuery([resource], () =>
        getResourceList(resource, getAuthHeader())
    );
    const [internalValue, setInternalValue] = useState<{
        label: string;
        value: any;
    } | null>(null);

    const getOptions = useMemo(
        () => (data: any[]) => {
            return data.map((item) => {
                return {
                    value: (item as any)[valueOption],
                    label: (item as any)[labelOption],
                };
            });
        },
        []
    );

    const onChange = useMemo(
        () => (element: any) => {
            setInternalValue(element);
            setValue(element.value);
        },
        []
    );

    // This is for when an external component changes the value (clicking on edit an item for example)
    useEffect(() => {
        if (!value) return setInternalValue(null);
        if (query.isSuccess) {
            const element = getOptions(query.data.data).find(
                (item) => item.value === value
            );
            element && setInternalValue(element);
        }
    }, [value]);

    return (
        <VStack alignItems={'flex-start'}>
            <Heading fontSize={'md'}>{title}</Heading>
            {query.isLoading && <Skeleton w={'full'} h={'2.4rem'} />}
            <Box w={'full'}>
                {query.isSuccess && (
                    <Select
                        size="md"
                        options={getOptions(query.data.data)}
                        chakraStyles={chakraSelectStyle}
                        value={internalValue}
                        onChange={onChange}
                    />
                )}
            </Box>
        </VStack>
    );
};
