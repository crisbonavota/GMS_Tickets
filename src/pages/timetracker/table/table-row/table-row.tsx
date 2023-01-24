import { HStack, VStack, Heading, Text, Tooltip } from "@chakra-ui/react";
import moment from "moment";
import { useMemo } from "react";
import { TimetrackItem } from "../../../../api/types";
import { useAppSelector } from "../../../../redux/hooks";
import { hoursToHHMMstring } from "../../../../utils/datetime";
import CopyEntry from "./copy-entry";
import DeleteEntry from "./delete-entry";
import EditEntry from "./edit-entry";

export interface TableRowProps {
    item: TimetrackItem;
    index: number;
    withDay?: boolean;
}

export function TableRow({ item, index, withDay }: TableRowProps) {
    const hoursMinutes = useMemo(() => hoursToHHMMstring(item.hours), [item]);

    const selectedForEdit = useAppSelector(
        (state) => state.timetrack.selectedForEdit
    );

    return (
        <HStack
            justify={"space-between"}
            w={"full"}
            key={item.id}
            bgColor={
                selectedForEdit === item.id
                    ? "green.100"
                    : index % 2
                    ? "white"
                    : "#F6ECD4"
            }
            p={3}
            borderWidth={1}
            border={
                selectedForEdit === item.id ? "5px solid steelblue" : "none"
            }
        >
            <HStack spacing={5}>
                <CopyEntry item={item} />
                <DeleteEntry id={item.id} />
                <EditEntry item={item} />
                <VStack w={"fit-content"} alignItems={"flex-start"}>
                    <Text>{item.project.name}</Text>
                    <HStack>
                        <Tooltip label={item.tasktype.caption}>
                            <Text fontWeight={"bold"}>
                                {item.tasktype.shortname}
                            </Text>
                        </Tooltip>
                        <Text
                            borderLeft={"1px solid lightgray"}
                            ps={2}
                            textTransform={"uppercase"}
                        >
                            {item.task}
                        </Text>
                    </HStack>
                </VStack>
            </HStack>
            <VStack alignItems={"flex-end"}>
                <Heading fontSize={"sm"}>{hoursMinutes}</Heading>
                {withDay && (
                    <Text fontSize={"sm"}>
                        {moment
                            .utc(item.date)
                            .format(
                                navigator.language.includes("en")
                                    ? "MM-DD-YY"
                                    : "DD/MM/YY"
                            )}
                    </Text>
                )}
            </VStack>
        </HStack>
    );
}

export default TableRow;
