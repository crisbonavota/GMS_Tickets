import { Button, useDisclosure } from "@chakra-ui/react";
import { useEffect } from "react";
import CreateBusinessUnitModal from "../creation-edition/CreateBusinessUnitModal";
import CreateEmployeeModal from "../creation-edition/CreateEmployeeModal";
import CreateProviderModal from "../creation-edition/CreateProviderModal";

interface Props {
    tabIndex: number;
}

const AddNewButton = ({ tabIndex }: Props) => {
    const { isOpen, onOpen, onClose } = useDisclosure();

    useEffect(onClose, [tabIndex]);

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
             {tabIndex === 0 && (
                <CreateEmployeeModal
                    isOpen={isOpen}
                    onOpen={onOpen}
                    onClose={onClose}
                />
             )}
            {tabIndex === 1 && (
                <CreateProviderModal
                    isOpen={isOpen}
                    onOpen={onOpen}
                    onClose={onClose}
                />
            )}
            {tabIndex === 2 && (
                <CreateBusinessUnitModal
                    isOpen={isOpen}
                    onOpen={onOpen}
                    onClose={onClose}
                />
            )}
        </>
    );
};
export default AddNewButton;
