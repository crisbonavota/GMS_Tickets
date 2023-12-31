import { useRef } from "react";
import {
    VStack,
    Heading,
    HStack,
    NumberDecrementStepper,
    NumberIncrementStepper,
    NumberInput,
    NumberInputField,
    NumberInputStepper,
    Text,
} from "@chakra-ui/react";
import { useAppDispatch, useAppSelector } from "../../../redux/hooks";
import {
    setFormHours,
    setFormMinutes,
} from "../../../redux/slices/timetrackSlice";

const HoursInput = () => {
    const dispatch = useAppDispatch();
    const hours = useAppSelector((state) => state.timetrack.form.hours);
    const minutes = useAppSelector((state) => state.timetrack.form.minutes);

    const setHours = (value: number) => {
        dispatch({
            type: setFormHours,
            payload: value,
        });
    };

    const setMinutes = (value: number) => {
        dispatch({
            type: setFormMinutes,
            payload: value,
        });
    };

    const minutesRef = useRef<HTMLInputElement>(null);

    const onHoursChange = (valueAsString: string) => {
        if (valueAsString === "") return;
        let value = valueAsString;
        if (value.length > 2) {
            value = valueAsString[1] + valueAsString[2];
            if (minutesRef.current) {
                minutesRef.current.focus();
                minutesRef.current.select();
            }
        }
        setHours(Math.round(Number(value)));
    };

    const onMinutesChange = (valueAsString: string, valueAsNumber: number) => {
        if (valueAsString === "") return;
        setMinutes(Math.round(valueAsNumber));
        if (valueAsNumber > 59) {
            setMinutes(0);
            setHours(hours + 1);
        }
        if (valueAsNumber < 0) {
            if (hours > 0) {
                setMinutes(45);
                setHours(hours - 1);
            } else {
                setMinutes(0);
            }
        }
    };

    return (
        <VStack alignItems={"flex-start"}>
            <Heading fontSize={"md"}>Hours</Heading>
            <HStack
                borderWidth={1}
                borderColor={"lightgray"}
                borderRadius={5}
                ps={5}
                spacing={2}
            >
                <NumberInput
                    step={1}
                    onChange={onHoursChange}
                    value={hours.toString().padStart(2, "0")}
                    min={0}
                    max={99}
                    w={"fit-content"}
                    p={0}
                    size={"lg"}
                >
                    <NumberInputField
                        disabled={true}
                        _disabled={{
                            cursor: "normal",
                        }}
                        boxShadow={"none !important"}
                        border={"none"}
                        w={"23px"}
                        p={0}
                    />
                </NumberInput>
                <Text fontSize={"lg"}>:</Text>
                <NumberInput
                    value={minutes.toString().padStart(2, "0")}
                    onChange={onMinutesChange}
                    min={-5}
                    max={60}
                    step={15}
                    size={"lg"}
                >
                    <NumberInputField
                        disabled={true}
                        _disabled={{
                            cursor: "normal",
                        }}
                        boxShadow={"none !important"}
                        border={"none"}
                        w={"50px"}
                        p={0}
                        ref={minutesRef}
                    />
                    <NumberInputStepper width={"55%"} ps={2}>
                        <NumberIncrementStepper />
                        <NumberDecrementStepper />
                    </NumberInputStepper>
                </NumberInput>
            </HStack>
        </VStack>
    );
};

export default HoursInput;
