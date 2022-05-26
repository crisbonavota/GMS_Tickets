import { Select, Text, VStack } from '@chakra-ui/react';
import { getContractTypes } from '@gms-micro/api-utils';

interface Props {
    setContractType: (contractType: number) => void;
    contractType: number;
}

const ContractTypeFilter = ({ contractType, setContractType }: Props) => {
    return (
        <VStack flex={1} alignItems={'flex-start'}>
            <Text fontSize={'sm'}>Contract type</Text>
            <Select
                bgColor={'white'}
                value={contractType}
                onChange={(e: React.ChangeEvent<HTMLSelectElement>) =>
                    setContractType(parseInt(e.target.value))
                }
            >
                <option value={0}>All</option>
                {getContractTypes().map((contractType) => (
                    <option key={contractType.value} value={contractType.value}>
                        {contractType.label}
                    </option>
                ))}
            </Select>
        </VStack>
    );
};
export default ContractTypeFilter;
