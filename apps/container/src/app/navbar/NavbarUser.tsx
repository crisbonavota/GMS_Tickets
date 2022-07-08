import { useAuthUser } from 'react-auth-kit';
import { ApplicationUserPrivate } from '@gms-micro/auth-types';
import { HStack, Avatar, Text } from '@chakra-ui/react';
const NavbarUser = () => {
    const user = useAuthUser()() as ApplicationUserPrivate;
    return (
        <>
            {user && (
                <HStack color={'white'}>
                    <Avatar
                        variant={'circle'}
                        size={'sm'}
                        src={user.image}
                        name={user.fullName}
                    />
                    <Text>{user.fullName}</Text>
                </HStack>
            )}
        </>
    );
};
export default NavbarUser;
