import { VStack, Input, Heading, IconButton, HStack } from "@chakra-ui/react";
import moment from "moment";
import { useCallback } from "react";
import { GrNext, GrPrevious } from "react-icons/gr";
import { useAppDispatch, useAppSelector } from "../../../redux/hooks";
import { setFormDate } from "../../../redux/slices/timetrackSlice";

const DateInput = () => {
    const dispatch = useAppDispatch();
    const date = useAppSelector((state) => state.timetrack.form.date);

    const setDate = (date: string) => {
        dispatch({ type: setFormDate, payload: date });
    };

    const onPreviousDayClick = useCallback(() => {
        const currentDate = moment(date, "YYYY-MM-DD");
        const newDate = currentDate.add(-1, "days").format("YYYY-MM-DD");
        setDate(newDate);
    }, [date, setDate]);

    const onNextDayClick = useCallback(() => {
        const currentDate = moment(date, "YYYY-MM-DD");
        const newDate = currentDate.add(1, "days").format("YYYY-MM-DD");
        setDate(newDate);
    }, [date, setDate]);

    return (
        <VStack alignItems={"flex-start"}>
            <HStack w="full" justifyContent={"space-between"}>
                <Heading fontSize={"md"}>Date</Heading>
                <HStack>
                    <IconButton
                        size={"sm"}
                        icon={<GrPrevious />}
                        onClick={onPreviousDayClick}
                        aria-label="Previous day"
                        isDisabled={date == ""}
                        variant={"ghost"}
                        h={"fit-content"}
                        w={"fit-content"}
                    />
                    <IconButton
                        size={"sm"}
                        icon={<GrNext />}
                        onClick={onNextDayClick}
                        aria-label="Next day"
                        isDisabled={date == ""}
                        variant={"ghost"}
                        h={"fit-content"}
                        w={"fit-content"}
                    />
                </HStack>
            </HStack>
            <Input
                type={"date"}
                bgColor={"white"}
                borderWidth={1}
                borderColor={"lightgray"}
                value={date}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                    setDate(e.target.value)
                }
                id={"tt-load-date-input"}
            />
        </VStack>
    );
};

export default DateInput;
