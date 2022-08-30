import {
    VStack,
    Heading,
    Text,
    HStack,
    Avatar,
    Link,
    SimpleGrid,
    GridItem,
} from "@chakra-ui/react";
import { useAuthUser } from "react-auth-kit";
import { ApplicationUserPrivate } from "../../api/types";
import { routes } from "../../config/routes";

const App = () => {
    const authUser = useAuthUser()() as ApplicationUserPrivate;

    return (
        <VStack
            w={"full"}
            minH={"92vh"}
            justifyContent={"center"}
            spacing={10}
            p={5}
        >
            {!authUser.roles.length && (
                <Text fontSize={"2xl"}>
                    You don't have any modules yet, please contact your
                    administrator
                </Text>
            )}
            <SimpleGrid
                w={{ base: "80%", md: "50%", lg: "40%", xl: "30%" }}
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
    const navRoutes = routes.filter((app) =>
        app.allowedRoles?.some((role) => roles.includes(role))
    );

    return navRoutes.map((route, _i) => (
        <GridItem
            key={route.path}
            bgColor={"white"}
            p={5}
            borderColor={"lightgray"}
            borderWidth={1}
            colSpan={12}
        >
            <Link href={route.path} w={"full"} h={"full"}>
                <VStack
                    spacing={5}
                    justifyContent={"center"}
                    h={"full"}
                    w={"full"}
                >
                    <HStack>
                        <Avatar
                            borderColor={"lightgray"}
                            borderWidth={2}
                            src={route.logo}
                            size={"lg"}
                        />
                        <Heading fontSize={"lg"}>{route.label}</Heading>
                    </HStack>
                    <Text textAlign={"center"}>{route.description}</Text>
                </VStack>
            </Link>
        </GridItem>
    ));
};

export default App;
