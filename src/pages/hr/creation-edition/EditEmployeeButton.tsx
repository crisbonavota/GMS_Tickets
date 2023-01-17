import { useDisclosure } from "@chakra-ui/react"
import { Employee } from "../../../api/types"
import EditButton from "../../pm/detailed/EditButton"
import CreateEmployeeTabsView from './creationEditionEmployee/CreateEmployeeTabsView';

interface Props {
    employee: Employee;
    tabIndex: number;
    setTabIndex: (tabIndex: number) => void;
}


const EditEmployeeButton = ({employee, tabIndex, setTabIndex}: Props) => {
    const {isOpen, onOpen, onClose} = useDisclosure();

    return (
        <EditButton
        modalBody={
            <CreateEmployeeTabsView
                onClose={onClose}
                id={employee.id}
                editInitialValues={employee}
                tabIndex={tabIndex}
                setTabIndex={setTabIndex}
            />
        }
        onClose={onClose}
        isOpen={isOpen}
        onOpen={onOpen}
    />
    )
  }
  
  export default EditEmployeeButton