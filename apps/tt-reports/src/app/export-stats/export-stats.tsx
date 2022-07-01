import { Skeleton, Text, HStack, Flex } from '@chakra-ui/react';
import { AxiosResponse } from 'axios';
import { UseQueryResult } from 'react-query';

interface ExportStatsProps {
    query: UseQueryResult<AxiosResponse<string, any>, unknown>
}

const stats = [
    { name: 'items', header: 'x-total-count' },
    { name: 'hours', header: 'total-hours' },
    { name: 'users', header: 'total-users' },
    { name: 'business units', header: 'total-business-units' }
]

const ExportStats = ({ query }: ExportStatsProps) => {
    return (
        <Flex w={'full'} justifyContent={'space-evenly'} flexDir={{ base: 'column', md: 'row' }}>
            {query.isSuccess && stats.map((stat, i) => <ExportStatsItem name={stat.name} key={i} value={query.data.headers[stat.header]} />)}
            {query.isLoading && [...Array(stats.length)].map((v, i) => <Skeleton key={i} h={'20px'} w={{ base: 'full', md: '20rem' }} />)}
        </Flex>
    )
}

const ExportStatsItem = ({ value, name }: { value: string, name: string }) => {
    return (
        <HStack alignItems={'center'} fontSize={'md'}>
            <Text fontWeight={'bold'}>{value}</Text>
            <Text>{name} exported with current filters</Text>
        </HStack>
    )
}

export default ExportStats;
