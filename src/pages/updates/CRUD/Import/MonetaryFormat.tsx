import {
    VStack,
    Text,
    Table,
    Thead,
    Th,
    Tbody,
    Tr,
    Td,
} from "@chakra-ui/react";

const MonetaryFormat = () => {
    return (
        <VStack alignItems={"flex-start"} w="full">
            <Text fontSize={"sm"}>
                Expected format for hourly cost updates{" "}
            </Text>
            <Table>
                <Thead>
                    <Tr>
                        <Th>File number</Th>
                        <Th>Date</Th>
                        <Th>Currency</Th>
                        <Th>Amount</Th>
                    </Tr>
                </Thead>
                <Tbody>
                    <Tr>
                        <Td>12345</Td>
                        <Td>10/05/2022</Td>
                        <Td>USD</Td>
                        <Td>100.00</Td>
                    </Tr>
                    <Tr>
                        <Td>12345</Td>
                        <Td>10-05-2022</Td>
                        <Td>ARS</Td>
                        <Td>100,00</Td>
                    </Tr>
                    <Tr>
                        <Td>...</Td>
                        <Td>...</Td>
                        <Td>...</Td>
                        <Td>...</Td>
                    </Tr>
                </Tbody>
            </Table>
        </VStack>
    );
};

export default MonetaryFormat;
