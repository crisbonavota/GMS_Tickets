import { VStack, Heading, Text, HStack, Breadcrumb, BreadcrumbItem, BreadcrumbLink } from '@chakra-ui/react';
import { config } from '@gms-micro/deploy';
import { ApplicationUserPrivate } from '@gms-micro/auth-types'

const App = ({ authUser }: { authUser: ApplicationUserPrivate }) => {
    return (
        <VStack w={'full'} minH={'92vh'} justifyContent={'center'} spacing={5}>
            <HStack>
                <Heading color={'orangered'} fontSize={'5xl'}>GMS 2022-</Heading>
                <Text fontSize={'3xl'}>YOUR MODULES</Text>
            </HStack>
            {!authUser.roles.length && <Text fontSize={'2xl'}>You don't have any modules yet, please contact your administrator</Text>}
            <Breadcrumb>
                {authUser.roles.length && generateBreadcrumbs(authUser.roles)}
            </Breadcrumb>
        </VStack>
    )
}

const generateBreadcrumbs = (roles: string[]) => {
    // Get apps the apps accessible by the user roles
    let apps = config.apps
        .filter(app => app.allowedRoles?.some(role => roles.includes(role)));

    return apps.map(app =>
        <BreadcrumbItem>
            <BreadcrumbLink
                fontSize={'xl'}
                color={'blue'}
                key={app.name}
                href={app.path}
            >
                {app.label}
            </BreadcrumbLink>
        </BreadcrumbItem>
    );
}

export default App
