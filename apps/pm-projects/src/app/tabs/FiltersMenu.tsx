import { Menu, MenuButton, Button, MenuList, Icon } from '@chakra-ui/react';
import { BiFilterAlt } from 'react-icons/bi';

const FiltersMenu = () => {
    return (
        <Menu>
            <MenuButton minW={'10rem'}>
                <Button
                    w={'full'}
                    rightIcon={<BiFilterAlt />}
                    colorScheme={'orange'}
                    justifyContent={'space-between'}
                >
                    Filter
                </Button>
            </MenuButton>
            <MenuList></MenuList>
        </Menu>
    );
};
export default FiltersMenu;
