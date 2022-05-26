import { getProjectStatus } from '@gms-micro/api-utils';
import { Select } from '@chakra-ui/react';

interface Props {}

const StatusFilter = (props: Props) => {
    const statusList = getProjectStatus();
    return (
        <Select bgColor={'white'}>
            <option value={''}>All</option>
            {statusList.map((status) => (
                <option key={status.value} value={status.value}>
                    {status.label}
                </option>
            ))}
        </Select>
    );
};
export default StatusFilter;
