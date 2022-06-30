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
    Text,
} from '@chakra-ui/react';
import { AiOutlineControl } from 'react-icons/ai';
import DatesFilters from './dates-filters';
import CustomTabProjectFilter from './custom-tab-project-filter';

const CustomTabPopoverFilters = () => {
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
                        <DatesFilters />
                        <HStack w={'full'} alignItems={'center'}>
                            <Divider borderColor={'orangered'} />
                            <Text px={3}>Or</Text>
                            <Divider borderColor={'orangered'} />
                        </HStack>
                        <CustomTabProjectFilter />
                    </VStack>
                </PopoverBody>
            </PopoverContent>
        </Popover>
    );
};
export default CustomTabPopoverFilters;
