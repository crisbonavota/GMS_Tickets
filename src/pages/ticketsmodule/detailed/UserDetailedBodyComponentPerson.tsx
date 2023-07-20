import { Box, GridItem, HStack, Text } from "@chakra-ui/react";
import personTicketDetails from "../../../assets/personTicketDetails.svg";

interface Props {
  resource: string | string[];
  label: string;
}

const EmployeeDetailedViewBodyComponentPerson = ({
  resource,
  label,
}: Props) => {
  return (
    <GridItem colSpan={1}>
      <Text fontWeight={"bold"}>{label}</Text>
      <Box
        background={"#F5F5F5"}
        borderRadius={"5px"}
        width={"100%"}
        height={"2rem"}
        cursor={"default"}
        paddingLeft={"1rem"}
        color={"#EF810E"}
        fontWeight={"bold"}
      >
        {Array.isArray(resource) ? (
          <HStack>
            <Box paddingTop={1}></Box>
            {resource.map((item) => (
              <HStack key={item}>
                <Box paddingTop={1}>
                  <img
                    src={personTicketDetails}
                    alt={"personTicketDetails"}
                    width={"23 rem"}
                  />
                </Box>
                <Text paddingRight={2}>{item}</Text>
              </HStack>
            ))}
          </HStack>
        ) : (
          <HStack>
            <Box paddingTop={1}>
              <img
                src={personTicketDetails}
                alt={"personTicketDetails"}
                width={"23 rem"}
              />
            </Box>
            <Text>{resource}</Text>
          </HStack>
        )}
      </Box>
    </GridItem>
  );
};

export default EmployeeDetailedViewBodyComponentPerson;
