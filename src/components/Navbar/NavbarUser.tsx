import { useAuthUser, useSignOut } from "react-auth-kit";
import { HStack, Avatar, Text, IconButton } from "@chakra-ui/react";
import { BiExit } from "react-icons/bi";
import { ApplicationUserPrivate } from "../../api/types";

const NavbarUser = () => {
    const user = useAuthUser()() as ApplicationUserPrivate;
    const signOut = useSignOut();
    return (
        <>
            {user && (
                <HStack color={"white"}>
                    <Avatar
                        variant={"circle"}
                        size={"md"}
                        src={user.image}
                        name={user.fullName}
                    />
                    <Text>{user.fullName}</Text>
                    <IconButton
                        colorScheme={"white"}
                        variant={"ghost"}
                        icon={<BiExit />}
                        aria-label="sign out"
                        size={"lg"}
                        onClick={signOut}
                    />
                </HStack>
            )}
        </>
    );
};
export default NavbarUser;
