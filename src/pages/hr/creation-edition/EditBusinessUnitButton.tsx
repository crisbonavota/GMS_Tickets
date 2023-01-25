import { useDisclosure } from "@chakra-ui/react";
import { BusinessUnit } from "../../../api/types";
import EditButton from "../../pm/detailed/EditButton";
import CreateEditBusinessUnitForm from "./CreateEditBusinessUnitForm";

interface Props {
    businessUnit: BusinessUnit;
}

const EditBusinessUnitButton = ({ businessUnit }: Props) => {
    const { isOpen, onOpen, onClose } = useDisclosure();

    return (
        <EditButton
            modalBody={
                <CreateEditBusinessUnitForm
                    onClose={onClose}
                    id={businessUnit.id}
                    editInitialValues={businessUnit}
                />
            }
            onClose={onClose}
            isOpen={isOpen}
            onOpen={onOpen}
        />
    );
};

export default EditBusinessUnitButton;
