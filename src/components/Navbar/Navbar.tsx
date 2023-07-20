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
        </HStack>
        <Hide below="md">
          <HStack h={"full"}>
            <NavbarItem
              key={"Tickets"}
              label={"Ticketing"}
              to={"/tickets"}
              isActive={window.location.pathname === "/tickets"}
            />
          </HStack>
        </Hide>
        <NavbarUser />
      </HStack>
    </Box>
  );
}

export default Navbar;
