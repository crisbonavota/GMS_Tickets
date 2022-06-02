import { Box, Flex } from '@chakra-ui/react';
import AccountFilter from './account-filter';
import ContractTypeFilter from './contract-type-filter';
import GeneralSearchFilter from './general-search-filter';
import StatusFilter from './status-filter';
import BusinessUnitFilter from './business-unit-filter';
import CompanyFilter from './company-filter';

export interface FiltersProps {
    setSearch: (search: string) => void;
    search: string;
    status: number;
    setStatus: (status: number) => void;
    contractType: number;
    setContractType: (contractType: number) => void;
    account: number;
    setAccount: (account: number) => void;
    businessUnit: number;
    setBusinessUnit: (businessUnit: number) => void;
    company: number;
    setCompany: (company: number) => void;
}

export function Filters({
    search,
    setSearch,
    status,
    setStatus,
    contractType,
    setContractType,
    account,
    setAccount,
    businessUnit,
    setBusinessUnit,
    company,
    setCompany
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
                <AccountFilter account={account} setAccount={setAccount} />
                <BusinessUnitFilter businessUnit={businessUnit} setBusinessUnit={setBusinessUnit} />
                <CompanyFilter company={company} setCompany={setCompany} />
            </Flex>
        </Box>
    );
}

export default Filters;
