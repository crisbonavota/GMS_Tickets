import { Select, Text, VStack } from '@chakra-ui/react';
import { useCallback } from 'react';

export interface EmployeeProviderSwitchProps {
    userType: 'employees' | 'providers';
    setUserType: (userType: 'employees' | 'providers') => void;
}

export function EmployeeProviderSwitch({
    userType,
    setUserType,
}: EmployeeProviderSwitchProps) {
    const onChange = useCallback((e: any) => {
        if (e.target.value === 'employees' || e.target.value === 'providers')
            setUserType(e.target.value);
    }, []);

    return (
        <VStack alignItems={'flex-start'}>
            <Text fontSize={'sm'}>User type</Text>
            <Select
                w={'fit-content'}
                bgColor={'white'}
                value={userType}
                onChange={onChange}
            >
                <option value={'employees'}>Employees</option>
                <option value={'providers'}>Providers</option>
            </Select>
        </VStack>
    );
}

export default EmployeeProviderSwitch;
