import {
    AccordionItem,
    AccordionButton,
    HStack,
    AccordionIcon,
    AccordionPanel,
    Text,
} from "@chakra-ui/react";
import moment from "moment";
import { TimetrackItem } from "../../../../api/types";
import {
    momentToLocaleMoment,
    momentToLocaleDateString,
    hoursToHHMMstring,
} from "../../../../utils/datetime";
import TableRow from "../table-row/table-row";

interface Props {
    dayOfWeek: Array<TimetrackItem>;
}

const WeeklyTabAccordionItem = ({ dayOfWeek }: Props) => {
    /* Since every accordion item is a day of the current week container every timetrack item of that day, 
        every date on the accordion item is the same */
    const day = moment(dayOfWeek[0].date);

    return (
        <AccordionItem>
            <h2>
                <AccordionButton
                    bgColor={"gray"}
                    color={"white"}
                    _hover={{ bgColor: "lightgray", color: "black" }}
                >
                    <HStack justifyContent={"space-between"} w={"full"} pe={2}>
                        <Text as={"span"}>
                            {momentToLocaleMoment(day)
                                .format("ddd")
                                .toUpperCase()}
                            &nbsp;-&nbsp;
                            {momentToLocaleDateString(day)}
                        </Text>
                        <Text fontSize={"md"} fontWeight={"bold"}>
                            {hoursToHHMMstring(
                                dayOfWeek
                                    .map((item) => item.hours)
                                    .reduce((a, b) => a + b)
                            )}
                        </Text>
                    </HStack>
                    <AccordionIcon />
                </AccordionButton>
            </h2>
            <AccordionPanel p={0}>
                {dayOfWeek.map((item, index) => (
                    <TableRow item={item} index={index} />
                ))}
            </AccordionPanel>
        </AccordionItem>
    );
};

export default WeeklyTabAccordionItem;
