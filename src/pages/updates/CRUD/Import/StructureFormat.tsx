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

const StructureFormat = () => {
    return (
        <VStack alignItems={"flex-start"} w="full">
            <Text fontSize={"sm"}>Expected format for structure % updates</Text>
            <Table>
                <Thead>
                    <Tr>
                        <Th>File number</Th>
                        <Th>Date</Th>
                        <Th>Amount</Th>
                    </Tr>
                </Thead>
                <Tbody>
                    <Tr>
                        <Td>12345</Td>
                        <Td>10/05/2022</Td>
                        <Td>25%</Td>
                    </Tr>
                    <Tr>
                        <Td>12345</Td>
                        <Td>10-05-2022</Td>
                        <Td>15.5</Td>
                    </Tr>
                    <Tr>
                        <Td>...</Td>
                        <Td>...</Td>
                        <Td>...</Td>
                    </Tr>
                </Tbody>
            </Table>
        </VStack>
    );
};

export default StructureFormat;
