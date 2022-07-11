import {
    Button,
    Popover,
    PopoverArrow,
    PopoverBody,
    PopoverCloseButton,
    PopoverContent,
    PopoverTrigger,
} from '@chakra-ui/react';
import { BiFilterAlt } from 'react-icons/bi';

interface Props {
    children: React.ReactNode;
}

const FiltersMenu = ({ children }: Props) => {
    return (
        <Popover>
            <PopoverTrigger>
                <Button
                    minW={'10rem'}
                    rightIcon={<BiFilterAlt />}
                    colorScheme={'orange'}
                    justifyContent={'space-between'}
                >
                    Filter
                </Button>
            </PopoverTrigger>
            <PopoverContent>
                <PopoverArrow />
                <PopoverCloseButton />
                <PopoverBody pt={8}>{children}</PopoverBody>
            </PopoverContent>
        </Popover>
    );
};
export default FiltersMenu;
