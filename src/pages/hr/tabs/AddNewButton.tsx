import { Button, useDisclosure } from "@chakra-ui/react";
import { useEffect } from "react";
import CreateBusinessUnitModal from "../creation-edition/CreateBusinessUnitModal";
import CreateEmployeeModal from "../creation-edition/creationEditionEmployee/CreateEmployeeModal";
import CreateTrainingModal from "../creation-edition/CreateTrainingModal";

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
                <CreateBusinessUnitModal
                    isOpen={isOpen}
                    onOpen={onOpen}
                    onClose={onClose}
                />
            )}
            {tabIndex === 2 && (
                <CreateTrainingModal
                    isOpen={isOpen}
                    onOpen={onOpen}
                    onClose={onClose}
                />
            )}
        </>
    );
};
export default AddNewButton;
