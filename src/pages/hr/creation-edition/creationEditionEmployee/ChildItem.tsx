import { HStack, Icon, VStack, Text, IconButton } from "@chakra-ui/react";
import moment from "moment";
import { ChildCreation } from "../../../../api/types";
import { MdOutlineChildCare } from "react-icons/md";
import { AiFillDelete } from "react-icons/ai";

interface Props {
    child: ChildCreation;
    removeChild: () => void;
}

const ChildItem = ({ child, removeChild }: Props) => {
    return (
        <HStack alignItems={"center"} spacing={3}>
            <Icon fontSize={"3xl"} as={MdOutlineChildCare} />
            <VStack alignItems="flex-start" spacing={1}>
                <Text fontSize={"sm"}>{child.name}</Text>
                <Text fontSize={"xs"} color="gray.500">
                    {moment(child.birthDate).format(
                        navigator.language.includes("en")
                            ? "MM/DD/YYYY"
                            : "DD/MM/YYYY"
                    )}
                </Text>
            </VStack>
            <IconButton
                icon={<AiFillDelete />}
                aria-label="Delete"
                size="sm"
                variant="ghost"
                colorScheme="red"
                onClick={removeChild}
            />
        </HStack>
    );
};

export default ChildItem;
