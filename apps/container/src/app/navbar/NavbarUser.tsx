import { useAuthUser, useSignOut } from 'react-auth-kit';
import { ApplicationUserPrivate } from '@gms-micro/auth-types';
import { HStack, Avatar, Text, IconButton } from '@chakra-ui/react';
import { BiExit } from 'react-icons/bi';

const NavbarUser = () => {
    const user = useAuthUser()() as ApplicationUserPrivate;
    const signOut = useSignOut();
    return (
        <>
            {user && (
                <HStack color={'white'} role={'group'}>
                    <Avatar
                        variant={'circle'}
                        size={'md'}
                        src={user.image}
                        name={user.fullName}
                        _groupHover={{ display: 'none' }}
                    />
                    <IconButton
                        colorScheme={'blue'}
                        icon={<BiExit />}
                        aria-label="sign out"
                        rounded={'50%'}
                        size={'lg'}
                        border={'1px solid white'}
                        display={'none'}
                        _groupHover={{ display: 'flex' }}
                        onClick={signOut}
                    />
                    <Text>{user.fullName}</Text>
                </HStack>
            )}
        </>
    );
};
export default NavbarUser;
