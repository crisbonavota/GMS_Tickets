import { useDisclosure } from "@chakra-ui/react"
import { Employee } from "../../../api/types"
import EditButton from "../../pm/detailed/EditButton"
import CreateEmployeeTabsView from './creationEditionEmployee/CreateEmployeeTabsView';

interface Props {
    employee: Employee
    tabIdx?: number;
}


const EditEmployeeButton = ({employee, tabIdx}: Props) => {
    const {isOpen, onOpen, onClose} = useDisclosure();

    return (
        <EditButton
        modalBody={
            <CreateEmployeeTabsView
                onClose={onClose}
                id={employee.id}
                editInitialValues={employee}
                tabIdx={tabIdx}
            />
        }
        onClose={onClose}
        isOpen={isOpen}
        onOpen={onOpen}
    />
    )
  }
  
  export default EditEmployeeButton