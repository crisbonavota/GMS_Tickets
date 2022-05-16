import { VStack, Heading, Text, HStack, Avatar, Stack, Link } from '@chakra-ui/react';
import { config } from '@gms-micro/deploy';
import { ApplicationUserPrivate } from '@gms-micro/auth-types'
import moment from 'moment';
import { DeployAssets } from '@gms-micro/assets';
import { environment } from '../environments/environment';
import { useAuthUser } from 'react-auth-kit';

const App = () => {
    const authUser = useAuthUser()() as ApplicationUserPrivate;

    return (
        <VStack w={'full'} minH={'92vh'} justifyContent={'center'} spacing={10}>
            <Heading color={'orangered'} fontSize={'6xl'}>GMS {moment().get("year")}</Heading>
            {!authUser.roles.length && <Text fontSize={'2xl'}>You don't have any modules yet, please contact your administrator</Text>}
            <Stack p={3} maxH={'70vh'} overflowY={'auto'}>
                {authUser.roles.length && generateModules(authUser.roles)}
            </Stack>
        </VStack>
    )
}

const generateModules = (roles: string[]) => {
    // Get apps the apps accessible by the user roles
    let apps = config.apps
        .filter(app => environment.production ? app.serveOn.production : app.serveOn.development)
        .filter(app => app.allowedRoles?.some(role => roles.includes(role)));

    return apps.map(app =>
        <Link href={app.path}>
            <HStack
                key={app.name}
                bgColor={'white'}
                p={5}
                spacing={5}
                borderRadius={7}
                borderColor={'lightgray'}
                borderWidth={1}
            >
                <Avatar borderColor={'lightgray'} borderWidth={2} src={DeployAssets[app.image ? app.image : "default"]} size={'lg'} />
                <VStack alignItems={'flex-start'} w={'full'} position={'relative'}>
                    <Text fontSize={'sm'} position={'absolute'} top={0} right={0}>{app.module}</Text>
                    <Heading fontSize={'lg'}>{app.label}</Heading>
                    <Text>{app.description}</Text>
                </VStack>
            </HStack>
        </Link>
    );
}

export default App
