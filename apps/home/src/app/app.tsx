import {
    VStack,
    Heading,
    Text,
    HStack,
    Avatar,
    Link,
    SimpleGrid,
    GridItem,
} from '@chakra-ui/react';
import { config } from '@gms-micro/deploy';
import { ApplicationUserPrivate } from '@gms-micro/auth-types';
import { DeployAssets } from '@gms-micro/assets';
import { environment } from '../environments/environment';
import { useAuthUser } from 'react-auth-kit';

const App = () => {
    const authUser = useAuthUser()() as ApplicationUserPrivate;

    return (
        <VStack
            w={'full'}
            minH={'92vh'}
            justifyContent={'center'}
            spacing={10}
            p={5}
        >
            {!authUser.roles.length && (
                <Text fontSize={'2xl'}>
                    You don't have any modules yet, please contact your
                    administrator
                </Text>
            )}
            <SimpleGrid
                w={{ base: '80%', md: '50%', lg: '40%', xl: '30%' }}
                columns={12}
                spacing={5}
            >
                {authUser.roles.length && generateModules(authUser.roles)}
            </SimpleGrid>
        </VStack>
    );
};

const generateModules = (roles: string[]) => {
    // Get apps the apps accessible by the user roles
    let apps = config.apps
        .filter((app) =>
            environment.production
                ? app.serveOn.production
                : app.serveOn.development
        )
        .filter((app) => app.allowedRoles?.some((role) => roles.includes(role)))
        .sort((app) => (app.name === 'tt-load' ? -1 : 1));

    return apps.map((app, _i) => (
        <GridItem
            key={app.name}
            bgColor={'white'}
            p={5}
            borderColor={'lightgray'}
            borderWidth={1}
            colSpan={12}
        >
            <Link href={app.path} w={'full'} h={'full'}>
                <VStack
                    spacing={5}
                    justifyContent={'center'}
                    h={'full'}
                    w={'full'}
                >
                    <HStack>
                        <Avatar
                            borderColor={'lightgray'}
                            borderWidth={2}
                            src={
                                DeployAssets[app.image ? app.image : 'default']
                            }
                            size={'lg'}
                        />
                        <Heading fontSize={'lg'}>{app.label}</Heading>
                    </HStack>
                    <Text textAlign={'center'}>{app.description}</Text>
                </VStack>
            </Link>
        </GridItem>
    ));
};

export default App;
