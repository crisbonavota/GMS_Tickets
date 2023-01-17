import { useDisclosure } from "@chakra-ui/react"
import { Employee } from "../../../api/types"
import EditButton from "../../pm/detailed/EditButton"
import CreateEmployeeTabsView from './creationEditionEmployee/CreateEmployeeTabsView';

interface Props {
    employee: Employee
}


const EditEmployeeButton = ({employee}: Props) => {
    const {isOpen, onOpen, onClose} = useDisclosure();

    return (
        <EditButton
        modalBody={
            <CreateEmployeeTabsView
                onClose={onClose}
                id={employee.id}
                editInitialValues={employee}
            />
        }
        onClose={onClose}
        isOpen={isOpen}
        onOpen={onOpen}
    />
    )
  }
  
  export default EditEmployeeButton