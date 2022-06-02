import { Text, VStack, Box } from '@chakra-ui/react';
import { Select } from 'chakra-react-select';
import { useQuery } from 'react-query';
import { useAuthHeader } from 'react-auth-kit';
import {
    Company,
    getResourceListFilteredAndPaginated,
} from '@gms-micro/api-utils';
import { AxiosError, AxiosResponse } from 'axios';
import { useMemo } from 'react';
import { chakraSelectStyle } from '@gms-micro/chakra-react-select-styles';

interface Props {
    setCompany: (company: number) => void;
    company: number;
}

const CompanyFilter = ({ company, setCompany }: Props) => {
    const getAuthHeader = useAuthHeader();
    const query = useQuery<AxiosResponse<Company[]>, AxiosError, Company[]>(
        ['companies'],
        async () =>
            await getResourceListFilteredAndPaginated<Company>(
                'companies',
                getAuthHeader(),
                [],
                [],
                { field: 'name', isAscending: true },
                0,
                10000
            ),
        { select: (r) => r.data }
    );

    const { isSuccess, isLoading, data: companies } = query;

    const options = useMemo(
        () => companies?.map((a) => ({ label: a.name, value: a.id })),
        [companies]
    );

    return (
        <VStack flex={1} alignItems={'flex-start'}>
            <Text fontSize={'sm'}>Company</Text>
            <Box w={'15rem'}>
                <Select
                    options={
                        isSuccess && options
                            ? [{ label: 'All', value: 0 }, ...options]
                            : []
                    }
                    isLoading={isLoading}
                    chakraStyles={chakraSelectStyle}
                    defaultValue={company}
                    onChange={(e: any) => setCompany(e.value)}
                />
            </Box>
        </VStack>
    );
};

export default CompanyFilter;
