import { chakra, FormLabel, GridItem } from "@chakra-ui/react";
import { Employee } from "../api/types";

type Props = {
  resource?: string;
  label: string;
};

const EmployeeDetailedViewCustomInput = ({ resource, label }: Props) => {
  return (
    <GridItem colSpan={1}>
      <FormLabel fontWeight={"bold"}>{label}</FormLabel>
      <chakra.input
        value={resource}
        readOnly
        background={"gray.300"}
        borderRadius={"5px"}
        width={"100%"}
        height={"2rem"}
        cursor={"default"}
        paddingLeft={"1rem"}
      />
    </GridItem>
  );
};

export default EmployeeDetailedViewCustomInput;
