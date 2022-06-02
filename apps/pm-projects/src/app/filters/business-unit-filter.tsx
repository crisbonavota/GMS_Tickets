import { Text, VStack, Box } from '@chakra-ui/react';
import { Select } from 'chakra-react-select';
import { useQuery } from 'react-query';
import { useAuthHeader } from 'react-auth-kit';
import {
    BusinessUnit,
    getResourceListFilteredAndPaginated,
} from '@gms-micro/api-utils';
import { AxiosError, AxiosResponse } from 'axios';
import { useMemo } from 'react';
import { chakraSelectStyle } from '@gms-micro/chakra-react-select-styles';

interface Props {
    setBusinessUnit: (businessUnit: number) => void;
    businessUnit: number;
}

const BusinessUnitFilter = ({ businessUnit, setBusinessUnit }: Props) => {
    const getAuthHeader = useAuthHeader();
    const query = useQuery<AxiosResponse<BusinessUnit[]>, AxiosError, BusinessUnit[]>(
        ['businessUnits'],
        async () =>
            await getResourceListFilteredAndPaginated<BusinessUnit>(
                'businessUnits',
                getAuthHeader(),
                [],
                [],
                { field: 'name', isAscending: true },
                0,
                10000
            ),
        { select: (r) => r.data }
    );

    const { isSuccess, isLoading, data: businessUnits } = query;

    const options = useMemo(
        () => businessUnits?.map((a) => ({ label: a.name, value: a.id })),
        [businessUnits]
    );

    return (
        <VStack flex={1} alignItems={'flex-start'}>
            <Text fontSize={'sm'}>BusinessUnit</Text>
            <Box w={'15rem'}>
                <Select
                    options={
                        isSuccess && options
                            ? [{ label: 'All', value: 0 }, ...options]
                            : []
                    }
                    isLoading={isLoading}
                    chakraStyles={chakraSelectStyle}
                    defaultValue={businessUnit}
                    onChange={(e: any) => setBusinessUnit(e.value)}
                />
            </Box>
        </VStack>
    );
};

export default BusinessUnitFilter;
