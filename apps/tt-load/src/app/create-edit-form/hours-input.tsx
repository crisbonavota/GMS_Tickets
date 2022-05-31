import { useCallback, useRef } from 'react';
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
} from '@chakra-ui/react';

type Props = {
    hours: number;
    minutes: number;
    setHours: (hours: number) => void;
    setMinutes: (minutes: number) => void;
};

const HoursInput = ({ hours, minutes, setHours, setMinutes }: Props) => {
    const minutesRef = useRef<HTMLInputElement>(null);

    const onHoursChange = (valueAsString: string) => {
        if (valueAsString === '') return;
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

    const OnMinutesChange = (valueAsString: string, valueAsNumber: number) => {
        if (valueAsString === '') return;
        setMinutes(Math.round(valueAsNumber));
        if (valueAsNumber > 59) {
            setMinutes(0);
            setHours(hours + 1);
        }
        if (valueAsNumber < 0) {
            setMinutes(30);
            hours > 0 && setHours(hours - 1);
        }
    };

    const onFocus = useCallback(
        (e: React.ChangeEvent<HTMLInputElement>) => e.target.select(),
        []
    );

    return (
        <VStack alignItems={'flex-start'}>
            <Heading fontSize={'md'}>Hours</Heading>
            <HStack
                borderWidth={1}
                borderColor={'lightgray'}
                borderRadius={5}
                ps={5}
                spacing={2}
            >
                <NumberInput
                    step={1}
                    allowMouseWheel
                    onChange={onHoursChange}
                    value={hours.toString().padStart(2, '0')}
                    min={0}
                    max={99}
                    w={'fit-content'}
                    p={0}
                >
                    <NumberInputField
                        boxShadow={'none !important'}
                        border={'none'}
                        w={'20px'}
                        p={0}
                        onFocus={onFocus}
                    />
                </NumberInput>
                <Text>:</Text>
                <NumberInput
                    value={minutes.toString().padStart(2, '0')}
                    onChange={OnMinutesChange}
                    allowMouseWheel
                    min={-5}
                    max={60}
                    step={30}
                >
                    <NumberInputField
                        boxShadow={'none !important'}
                        border={'none'}
                        w={'50px'}
                        p={0}
                        onFocus={onFocus}
                        ref={minutesRef}
                    />
                    <NumberInputStepper ps={2}>
                        <NumberIncrementStepper />
                        <NumberDecrementStepper />
                    </NumberInputStepper>
                </NumberInput>
            </HStack>
        </VStack>
    );
};

export default HoursInput;
