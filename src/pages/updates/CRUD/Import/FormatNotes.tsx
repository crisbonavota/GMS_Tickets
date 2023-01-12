import { VStack, Text } from "@chakra-ui/react";

const FormatNotes = () => {
    return (
        <VStack alignItems={"flex-start"} fontSize={"sm"}>
            <Text fontWeight={"bold"}>
                The type of update (structure/hourly cost) will be automatically
                determined based on the format of the uploaded file
            </Text>
            <Text>Colums can be in any order</Text>
            <Text>
                Headers are case insensitive (they can be on upper/lower case)
            </Text>
            <Text>
                Date must follow DD/MM/YYYY format, separators can either be an
                slash(/) or a middle dash(-)
            </Text>
            <Text>
                Amount decimal separator can be either a point(.) or a comma(,)
            </Text>
            <Text>
                Amount field for structure costs can have the % sign or not, and
                can have it both at the beginning or end of the amount
            </Text>
            <Text>Amount field for structure costs must be between 0-100</Text>
        </VStack>
    );
};

export default FormatNotes;
