import { Box, Flex } from '@chakra-ui/react';
import ContractTypeFilter from '../contract-type-filter/contract-type-filter';
import GeneralSearchFilter from '../general-search-filter/general-search-filter';
import StatusFilter from '../status-filter/status-filter';

export interface FiltersProps {
    setSearch: (search: string) => void;
    search: string;
    status: number;
    setStatus: (status: number) => void;
    contractType: number;
    setContractType: (contractType: number) => void;
}

export function Filters({
    search,
    setSearch,
    status,
    setStatus,
    contractType,
    setContractType,
}: FiltersProps) {
    return (
        <Box w={'full'}>
            <Flex
                gap={5}
                justifyContent={'flex-start'}
                alignItems={'flex-start'}
                w={'fit-content'}
                flexDir={['column', 'row']}
            >
                <GeneralSearchFilter search={search} setSearch={setSearch} />
                <StatusFilter status={status} setStatus={setStatus} />
                <ContractTypeFilter
                    contractType={contractType}
                    setContractType={setContractType}
                />
            </Flex>
        </Box>
    );
}

export default Filters;
