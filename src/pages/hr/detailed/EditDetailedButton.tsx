import { useDisclosure } from "@chakra-ui/react";
import { Employee } from "../../../api/types";
import CreateEmployeeTabsView from "../creation-edition/creationEditionEmployee/CreateEmployeeTabsView";
import {
  Button,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
} from "@chakra-ui/react";

interface Props {
  employee: Employee;
  tabIndex: number;
  setTabIndex: (tabIndex: number) => void;
}

const EditDetailedButton = ({ employee, tabIndex, setTabIndex }: Props) => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <>
      <Button
        colorScheme={"whiteAlpha"}
        variant={"solid"}
        onClick={onOpen}
        size={"lg"}
      >
        Edit
      </Button>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent minW={"40vw"}>
          <ModalHeader>Edit</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <CreateEmployeeTabsView
              onClose={onClose}
              id={employee.id}
              editInitialValues={employee}
              tabIndex={tabIndex}
              setTabIndex={setTabIndex}
            />
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};

export default EditDetailedButton;
