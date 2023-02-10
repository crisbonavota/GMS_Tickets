import { SimpleGrid, HStack } from "@chakra-ui/react";
import moment from "moment";
import { ChildCreation, MaritalStatus } from "../../../../../api/types";
import UserDetailedViewBodyComponent from "../../UserDetailedViewBodyComponent";


interface Props {
    maritalStatus: MaritalStatus;
    children: ChildCreation[];
}

const FamilyInfoDetailedView = ({ maritalStatus, children }: Props) => {
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
                    resource={MaritalStatus[maritalStatus]}
                    label={"Marital Status"}
                />
                {children ? children.map((child) => (
                    <UserDetailedViewBodyComponent
                        resource={moment(child.birthDate).format("yyyy-MM-DD")}
                        label={child.name + " Birth Date"}
                    />

                )) : (
                    <UserDetailedViewBodyComponent
                    resource={"This user has no children added"}
                    label={"Child"}
                />  
                )}
                

              
            </SimpleGrid>
        </HStack>
    );
};

export default FamilyInfoDetailedView;
