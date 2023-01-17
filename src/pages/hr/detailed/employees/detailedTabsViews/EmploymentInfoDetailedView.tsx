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
        borderBottomLeftRadius={"1.18rem"}
        borderBottomRightRadius={"1.18rem"}
        boxShadow={"2xl"}
        padding={"2rem"}
        marginLeft={"12rem"}
        marginRight={"12rem"}
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
        </SimpleGrid>
      </HStack>
    </>
  );
};

export default EMploymentInfoDetailedView;
