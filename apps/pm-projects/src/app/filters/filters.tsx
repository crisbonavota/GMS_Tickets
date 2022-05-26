import { HStack, Box } from '@chakra-ui/react';
import GeneralSearchFilter from '../general-search-filter/general-search-filter';
import StatusFilter from '../status-filter/status-filter';
export interface FiltersProps {}

export function Filters(props: FiltersProps) {
    return (
        <Box p={5} w={'full'}>
            <HStack
                spacing={5}
                justifyContent={'flex-start'}
                w={['100%', '80%', '60%']}
            >
                <GeneralSearchFilter />
                <StatusFilter />
            </HStack>
        </Box>
    );
}

export default Filters;
