import { Button, useDisclosure } from "@chakra-ui/react";
import { useEffect } from "react";
import CreateProviderModal from "./creation-edition/CreateProviderModal";

const AddNewButton = () => {
    const { isOpen, onOpen, onClose } = useDisclosure();

    useEffect(() => {
        return () => onClose();
      }, []);

    return (
        <>
            <Button
                colorScheme={"orange"}
                px={10}
                w={{ base: "full", md: "fit-content" }}
                onClick={onOpen}
            >
                ADD NEW
            </Button>
            <CreateProviderModal
                isOpen={isOpen}
                onOpen={onOpen}
                onClose={onClose}
            />
        </>
    );
};
export default AddNewButton;
