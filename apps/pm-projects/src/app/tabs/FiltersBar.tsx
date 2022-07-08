import { Button, Input, useDisclosure, VStack, Flex } from '@chakra-ui/react';
import { AiOutlineSearch } from 'react-icons/ai';
import { BsChevronDown, BsChevronUp } from 'react-icons/bs';
import FiltersMenu from './FiltersMenu';

interface Props {
    search: string;
    onSearchChange: (search: string) => void;
    onApplyClick: () => void;
}

const FiltersBar = ({ search, onSearchChange, onApplyClick }: Props) => {
    const { isOpen, onToggle } = useDisclosure();

    const onSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
        onSearchChange(e.target.value);
    };

    return (
        <VStack w={'full'} alignItems={'flex-start'} spacing={2}>
            <Button
                onClick={onToggle}
                leftIcon={<AiOutlineSearch color={'#3B8A7F'} />}
                rightIcon={
                    isOpen ? (
                        <BsChevronUp color={'orangered'} />
                    ) : (
                        <BsChevronDown color={'orangered'} />
                    )
                }
                variant={'ghost'}
                boxShadow={'none !important'}
            >
                Search / Filter
            </Button>
            {isOpen && (
                <Flex
                    w={'full'}
                    gap={3}
                    flexDir={{ base: 'column', md: 'row' }}
                >
                    <Input
                        placeholder="Search"
                        bgColor={'white'}
                        type={'text'}
                        w={'full'}
                        value={search}
                        onChange={onSearch}
                        onKeyDown={(e: React.KeyboardEvent<HTMLInputElement>) =>
                            e.key === 'Enter' && onApplyClick()
                        }
                    />
                    <FiltersMenu />
                    <Button
                        colorScheme={'orange'}
                        px={10}
                        onClick={onApplyClick}
                    >
                        Apply
                    </Button>
                </Flex>
            )}
        </VStack>
    );
};
export default FiltersBar;
