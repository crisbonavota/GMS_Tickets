import { getProjectStatus } from '@gms-micro/api-utils';
import { Select, Text, VStack } from '@chakra-ui/react';

interface Props {
    setStatus: (status: number) => void;
    status: number;
}

const StatusFilter = ({ status, setStatus }: Props) => {
    const statusList = getProjectStatus();
    return (
        <VStack flex={1} alignItems={'flex-start'}>
            <Text fontSize={'sm'}>Status</Text>
            <Select
                bgColor={'white'}
                value={status}
                onChange={(e: React.ChangeEvent<HTMLSelectElement>) =>
                    setStatus(parseInt(e.target.value))
                }
            >
                <option value={0}>All</option>
                {statusList.map((status) => (
                    <option key={status.value} value={status.value}>
                        {status.label}
                    </option>
                ))}
            </Select>
        </VStack>
    );
};
export default StatusFilter;
