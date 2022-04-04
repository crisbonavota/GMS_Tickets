import { VStack, HStack, Heading, Skeleton, Text } from "@chakra-ui/react";
import { AxiosResponse } from "axios";
import { UseQueryResult } from "react-query";

interface SidePanelProps {
    query: UseQueryResult<AxiosResponse<string, any>, unknown>
}

const SidePanel = ({ query }: SidePanelProps) => {
    return (
        <>
            <VStack alignItems={'flex-start'} spacing={5} w={{ base: '100%', md: '50%' }} h={'full'}>
                {query.isSuccess &&
                    <>
                        <HStack>
                            <Heading>{query.data.headers['x-total-count']}</Heading>
                            <Text>total items with current filters</Text>
                        </HStack>
                        {parseInt(query.data.headers['x-total-count']) > 25000 &&
                            <Text fontSize={'sm'}>We limit the rows of the export to 25k to ensure reasonable waiting times</Text>}
                        <HStack>
                            <Heading>
                                {/* Capping the export to 25000 rows */}
                                {parseInt(query.data.headers['x-total-count']) > 25000
                                    ? 25000 : parseInt(query.data.headers['x-total-count'])}
                            </Heading>
                            <Text>items exported with current filters</Text>
                        </HStack>
                        <HStack>
                            <Heading>{query.data.headers['total-hours']}</Heading>
                            <Text>hours exported with current filters</Text>
                        </HStack>
                        <HStack>
                            <Heading>{query.data.headers['total-users']}</Heading>
                            <Text>users exported with current filters</Text>
                        </HStack>
                        <HStack>
                            <Heading>{query.data.headers['total-business-units']}</Heading>
                            <Text>business units exported with current filters</Text>
                        </HStack>
                    </>}
                {query.isLoading && [...Array(5)].map((v, i) => <Skeleton key={i} h={'50px'} w={'full'} />)}
            </VStack>
        </>
    )
}

export default SidePanel;
