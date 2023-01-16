import { Box, Image, Link, HStack, Hide } from "@chakra-ui/react";
import NavbarItem from "./NavbarItem";
import { useAuthUser } from "react-auth-kit";
import NavbarUser from "./NavbarUser";
import { routes } from "../../config/routes";
import { ApplicationUserPrivate } from "../../api/types";
import Tonic3Logo from "../../assets/images/tonic3-logo.webp";
import CurrenciesExchangeModal from "./CurrenciesExchange/CurrenciesExchangeModal";

export function Navbar() {
    const currentUser = useAuthUser()() as ApplicationUserPrivate;
    const navRoutes = routes.filter(
        (a) =>
            currentUser &&
            currentUser.roles.some((r) => a.allowedRoles?.includes(r))
    );

    return (
        <Box
            w={"full"}
            h={"8vh"}
            bgGradient={"linear(to-t, #fe4801, #ef810a)"}
            mb={0}
        >
            <HStack
                w={"full"}
                h={"full"}
                py={2}
                justifyContent={"space-evenly"}
                alignItems={"center"}
            >
                <HStack spacing={5} h="full" alignItems={"center"}>
                    <Link href={"/"} h={"full"}>
                        <Image src={Tonic3Logo} alt={"Tonic3"} h={"full"} />
                    </Link>
                    {currentUser.roles.includes("admin") && (
                        <CurrenciesExchangeModal />
                    )}
                </HStack>
                <Hide below="md">
                    <HStack h={"full"}>
                        {navRoutes.map((route) => (
                            <NavbarItem
                                key={route.path}
                                label={route.label}
                                to={route.path}
                                isActive={
                                    window.location.pathname === route.path
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
