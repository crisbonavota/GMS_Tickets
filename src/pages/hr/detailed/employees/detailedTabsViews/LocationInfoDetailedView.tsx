import { Employee } from "../../../../../api/types";
import { SimpleGrid, GridItem, HStack, Button } from "@chakra-ui/react";
import UserDetailedViewBodyComponent from "../../UserDetailedViewBodyComponent";
import UserDetailedViewHeaderComponent from "../../UserDetailedViewHeaderComponent";
import EditEmployeeButton from "../../../creation-edition/EditEmployeeButton";

interface Props {
  employee?: Employee;
  tabIndex?: number;
}

const LocationInfoDetailedView = ({ employee, tabIndex }: Props) => {
  return (
    <>
      <UserDetailedViewHeaderComponent resource={employee} />
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
            resource={employee?.birthCountry.name}
            label={"Nationality"}
          />
          <UserDetailedViewBodyComponent
            resource={employee?.country.name}
            label={"Country of Residence"}
          />
          <UserDetailedViewBodyComponent
            resource={employee?.address?.street}
            label={"Address"}
          />
          <UserDetailedViewBodyComponent
            resource={employee?.city}
            label={"City"}
          />
          <GridItem colSpan={{ base: 1, md: 2 }}>
            <HStack
              w="full"
              justifyContent={"space-between"}
              spacing={5}
              marginTop={"1rem"}
            >
              {employee && <EditEmployeeButton employee={employee!} tabIdx={tabIndex}/>}
            </HStack>
          </GridItem>
        </SimpleGrid>
      </HStack>
    </>
  );
};

export default LocationInfoDetailedView;
