import { Link, Text, VStack } from '@chakra-ui/react';

interface Props {
    label: string;
    to: string;
    isActive: boolean;
    isDisabled?: boolean;
}

const NavbarItem = ({ label, to, isActive, isDisabled }: Props) => {
    return (
        <Link
            href={isDisabled ? '#' : to}
            px={2}
            color={isDisabled ? 'gray' : 'white'}
            borderBottomColor={'rgba(0, 0, 0, .7)'}
            borderBottomWidth={isActive ? 5 : 0}
            h={'full'}
            cursor={isDisabled ? 'not-allowed' : 'pointer'}
            textDecor={'none !important'}
            _hover={{
                bgColor: 'rgba(0, 0, 0, .1)',
            }}
            title={
                isDisabled
                    ? 'Not serving on current env. Check deploy.json'
                    : ''
            }
        >
            <VStack justifyContent={'center'} h={'full'}>
                <Text>{label}</Text>
            </VStack>
        </Link>
    );
};

export default NavbarItem;
