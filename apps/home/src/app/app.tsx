import { VStack, Heading, Text, HStack, Breadcrumb, BreadcrumbItem, BreadcrumbLink } from '@chakra-ui/react';
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
                {authUser.roles.length && authUser.roles.map((role) => roleToLink(role))}
            </Breadcrumb>
        </VStack>
    )
}

const roleToLink = (role: string) => {
    let name = "";
    let href = "";
    switch (role) {
        case 'tt-reports':
            name = "Timetrack - Reports";
            href = "/reports";
            break;
        case 'hr-updates':
            name = "Human Resources - Updates";
            href = "hr/updates";
            break;
        default:
            name = role;
            href= `/${role}`;
            break;
    }
    return (
        <BreadcrumbItem>
            <BreadcrumbLink fontSize={'xl'} color={'blue'} key={role} href={href}>{name}</BreadcrumbLink>
        </BreadcrumbItem>
    );
}

export default App
