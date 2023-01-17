import { Employee } from "../../../../../api/types";
import { SimpleGrid, GridItem, HStack} from "@chakra-ui/react";
import UserDetailedViewBodyComponent from "../../UserDetailedViewBodyComponent";

interface Props {
  employee: Employee;
}

const EMploymentInfoDetailedView = ({ employee }: Props) => {
  return (
    <>
      <HStack
        align={"center"}
        justify={"center"}
        bgColor={"#FFFFFF"}
        borderBottomLeftRadius={"19px"}
        borderBottomRightRadius={"19px"}
        boxShadow={"2xl"}
        padding={"2rem"}
        marginLeft={"10%"}
        marginRight={"10%"}
      >
        <SimpleGrid columns={{ base: 1, md: 2 }} spacing={5} width={"80%"}>
          <UserDetailedViewBodyComponent
            resource={employee?.salaryCurrency?.code}
            label={"Salary Currency"}
          />
          <UserDetailedViewBodyComponent
            resource={employee?.medicalCoverage?.name}
            label={"MEdical Coverage"}
          />
          <GridItem colSpan={{ base: 1, md: 2 }}>
            <HStack
              w="full"
              justifyContent={"space-between"}
              spacing={5}
              marginTop={"1rem"}
            >
            </HStack>
          </GridItem>
        </SimpleGrid>
      </HStack>
    </>
  );
};

export default EMploymentInfoDetailedView;
