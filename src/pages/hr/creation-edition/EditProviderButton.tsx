import { useDisclosure } from "@chakra-ui/react";
import { Provider } from "../../../api/types";
import EditButton from "../../pm/detailed/EditButton";
import CreateEditProviderForm from "./CreateEditProviderForm";

interface Props {
    provider: Provider;
}

const EditProviderButton = ({ provider }: Props) => {
    const { isOpen, onOpen, onClose } = useDisclosure();

    return (
        <EditButton
            modalBody={
                <CreateEditProviderForm
                    onClose={onClose}
                    id={provider.id}
                    editInitialValues={provider}
                />
            }
            onClose={onClose}
            isOpen={isOpen}
            onOpen={onOpen}
        />
    );
};

export default EditProviderButton;
