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

const ImportFormatPreview = () => {
    return (
        <VStack alignItems={"flex-start"}>
            <Text fontSize={"sm"}>Expected format</Text>
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
            <Text fontSize={"sm"}>Colums can be in any order</Text>
            <Text fontSize={"sm"}>
                Headers are case insensitive (they can be on upper/lower case)
            </Text>
            <Text fontSize={"sm"}>
                Date must follow DD/MM/YYYY format, separators can either be an
                slash(/) or a middle dash(-)
            </Text>
            <Text fontSize={"sm"}>
                Amount decimal separator can be either a point(.) or a comma(,)
            </Text>
        </VStack>
    );
};

export default ImportFormatPreview;
