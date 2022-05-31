import {
    Popover,
    PopoverTrigger,
    IconButton,
    PopoverContent,
    PopoverArrow,
    PopoverCloseButton,
    PopoverBody,
    VStack,
    HStack,
    Divider,
    Box,
    Text,
} from '@chakra-ui/react';
import { QuerySelect } from '@gms-micro/query-utils';
import { AiOutlineControl } from 'react-icons/ai';
import DatesFilters from './dates-filters';

interface Props {
    from: string;
    to: string;
    setFrom: (date: string) => void;
    setTo: (date: string) => void;
    projectFilter?: number;
    setProjectFilter: (id?: number) => void;
}

const CustomTabPopoverFilters = ({
    from,
    to,
    setFrom,
    setTo,
    projectFilter,
    setProjectFilter,
}: Props) => {
    return (
        <Popover placement="auto-start">
            <PopoverTrigger>
                <IconButton
                    size={'lg'}
                    colorScheme={'orange'}
                    position={'absolute'}
                    icon={<AiOutlineControl size={25} />}
                    top={0}
                    right={0}
                    m={5}
                    aria-label="filters"
                />
            </PopoverTrigger>
            <PopoverContent w={'fit-content'}>
                <PopoverArrow />
                <PopoverCloseButton />
                <PopoverBody>
                    <VStack alignItems={'flex-start'} spacing={5} p={2}>
                        <DatesFilters
                            from={from}
                            to={to}
                            setFrom={setFrom}
                            setTo={setTo}
                        />
                        <HStack w={'full'} alignItems={'center'}>
                            <Divider borderColor={'orangered'} />
                            <Text px={3}>Or</Text>
                            <Divider borderColor={'orangered'} />
                        </HStack>
                        <Box w={'full'}>
                            <QuerySelect
                                resource={'projects/member'}
                                title={'Project'}
                                value={projectFilter}
                                setValue={setProjectFilter}
                            />
                        </Box>
                    </VStack>
                </PopoverBody>
            </PopoverContent>
        </Popover>
    );
};
export default CustomTabPopoverFilters;
