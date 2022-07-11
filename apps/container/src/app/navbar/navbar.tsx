import { Box, Image, Link, HStack, Hide } from '@chakra-ui/react';
import { Tonic3Logo } from '@gms-micro/assets';
import NavbarItem from './NavbarItem';
import { config } from '@gms-micro/deploy';
import { environment } from '../../environments/environment';
import { useAuthUser } from 'react-auth-kit';
import { ApplicationUserPrivate } from '@gms-micro/auth-types';
import NavbarUser from './NavbarUser';

export function Navbar() {
    const currentUser = useAuthUser()() as ApplicationUserPrivate;
    const apps = config.apps.filter(
        (a) =>
            a.inNavbar &&
            currentUser &&
            currentUser.roles.some((r) => a.allowedRoles?.includes(r))
    );

    return (
        <Box
            w={'full'}
            h={'8vh'}
            bgGradient={'linear(to-t, #fe4801, #ef810a)'}
            mb={0}
        >
            <HStack
                w={'full'}
                h={'full'}
                py={2}
                justifyContent={'space-evenly'}
                alignItems={'center'}
            >
                <Link href={'/'} h={'full'}>
                    <Image src={Tonic3Logo} alt={'Tonic3'} h={'full'} />
                </Link>
                <Hide below="md">
                    <HStack h={'full'}>
                        {apps.map((a) => (
                            <NavbarItem
                                key={a.name}
                                label={a.label}
                                to={a.path}
                                isActive={
                                    window.location.pathname.replace(
                                        '/',
                                        ''
                                    ) === a.path
                                }
                                isDisabled={
                                    environment.production
                                        ? !a.serveOn.production
                                        : !a.serveOn.development
                                }
                            />
                        ))}
                    </HStack>
                </Hide>
                <NavbarUser />
            </HStack>
        </Box>
    );
}

export default Navbar;
