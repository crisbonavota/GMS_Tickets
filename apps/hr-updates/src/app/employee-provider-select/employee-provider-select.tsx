import {
    Employee,
    getResourceListFilteredAndPaginated,
    KeyValuePair,
} from '@gms-micro/api-utils';
import { QuerySelect } from '@gms-micro/query-utils';
import { Select } from 'chakra-react-select';
import { useQuery } from 'react-query';
import { useAuthHeader } from 'react-auth-kit';
import { Box, Text, VStack } from '@chakra-ui/react';
import { chakraSelectStyle } from '@gms-micro/chakra-react-select-styles';
import { useCallback, useEffect } from 'react';

export interface EmployeeProviderSelectProps {
    legacyUser: KeyValuePair;
    setLegacyUser: (legacyUser: KeyValuePair) => void;
    userType: 'employees' | 'providers';
    emptyValue: { value: string; label: string };
}

export function EmployeeProviderSelect({
    legacyUser,
    setLegacyUser,
    userType,
    emptyValue,
}: EmployeeProviderSelectProps) {
    const getAuthHeader = useAuthHeader();

    const query = useQuery(userType, () =>
        getResourceListFilteredAndPaginated<Employee>(
            userType,
            getAuthHeader(),
            [],
            [],
            { field: 'legacyUser.fullName', isAscending: true },
            0,
            1000
        )
    );

    // If the user type changes, we restart the dropdown so we dont have a value from another user type
    useEffect(() => {
        setLegacyUser(emptyValue);
    }, [userType]);

    const getOptions = useCallback((values: Employee[]) => {
        const options = values.map((employee) => ({
            value: employee.id.toString(),
            label: employee.legacyUser.fullName,
        }));
        options.unshift(emptyValue);
        return options;
    }, []);

    return (
        <VStack alignItems={'flex-start'}>
            <Text fontSize={'sm'}>
                {userType === 'employees' ? 'Employee' : 'Provider'}
            </Text>
            {query.isSuccess && (
                <Box minW={'20rem'}>
                    <Select
                        options={getOptions(query.data.data)}
                        chakraStyles={chakraSelectStyle}
                        value={legacyUser}
                        onChange={(e) => setLegacyUser(e)}
                    />
                </Box>
            )}
        </VStack>
    );
}

export default EmployeeProviderSelect;
