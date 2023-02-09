import { SimpleGrid, HStack } from "@chakra-ui/react";
import { Employee } from "../../../../../api/types";
import UserDetailedViewBodyComponent from "../../UserDetailedViewBodyComponent";
import Childs from "../Childs";

interface Props {
    maritalStatus: string;
    employee: Employee;
}

const FamilyInfoDetailedView = ({ maritalStatus, employee }: Props) => {
    return (
        <HStack
            align={"center"}
            justify={"center"}
            bgColor={"#FFFFFF"}
            borderBottomLeftRadius={"1.18rem"}
            borderBottomRightRadius={"1.18rem"}
            boxShadow={"2xl"}
            padding={"2rem"}
            spacing={20}
        >
            <SimpleGrid columns={{ base: 1, md: 2 }} spacing={5} width={"80%"}>
                <UserDetailedViewBodyComponent
                    resource={maritalStatus}
                    label={"Marital Status"}
                />
                <Childs
                    employeeId={employee.id}
                />
            </SimpleGrid>
        </HStack>
    );
};

export default FamilyInfoDetailedView;
