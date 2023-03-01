import { useDisclosure } from "@chakra-ui/react";
import { Training } from "../../../api/types";
import EditButton from "../../pm/detailed/EditButton";
import CreateEditTrainingForm from "./CreateEditTrainingForm";

interface Props {
    training: Training;
}

const EditProviderButton = ({ training }: Props) => {
    const { isOpen, onOpen, onClose } = useDisclosure();

    return (
        <EditButton
            modalBody={
                <CreateEditTrainingForm
                    onClose={onClose}
                    id={training.id}
                    editInitialValues={training}
                />
            }
            onClose={onClose}
            isOpen={isOpen}
            onOpen={onOpen}
        />
    );
};

export default EditProviderButton;
