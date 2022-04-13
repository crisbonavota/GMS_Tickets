import { VStack, Heading, Text, HStack, Link } from '@chakra-ui/react';
import { ApplicationUserPrivate } from '@gms-micro/auth-types'

const App = ({ authUser }: { authUser: ApplicationUserPrivate }) => {
    return (
        <VStack w={'full'} minH={'92vh'} justifyContent={'center'} spacing={5}>
            <HStack>
                <Heading color={'orangered'} fontSize={'5xl'}>GMS 2022-</Heading>
                <Text fontSize={'3xl'}>YOUR MODULES</Text>
            </HStack>
            {!authUser.roles.length && <Text fontSize={'2xl'}>You don't have any modules yet, please contact your administrator</Text>}
            {authUser.roles.length && authUser.roles.map((role) => roleToLink(role))}
        </VStack>
    )
}

const roleToLink = (role: string) => {
    let name = "";
    let href = "";
    switch (role) {
        case 'timetrackReporter':
            name = "Timetrack Reports";
            href = "/reports";
            break;
        default:
            return <></>;
    }
    return <Link fontSize={'xl'} color={'blue'} key={role} href={href}>{name}</Link>
}

export default App
