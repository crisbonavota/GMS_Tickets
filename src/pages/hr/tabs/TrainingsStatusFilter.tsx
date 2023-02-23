import { VStack, FormLabel, Select } from "@chakra-ui/react";
import { getTrainingsStates } from "../../../api/api";

interface Props {
    setter: (value: number | null) => void;
}

const TrainingsStatusFilter = ({ setter }: Props) => {
    const states = getTrainingsStates;
    const onChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        const selectedValue = event.target.value ? parseInt(event.target.value) : null;
        setter(selectedValue);
    };

    return (
        <VStack alignItems={"flex-start"} w={"full"}>
            <FormLabel>Status</FormLabel>
            <Select placeholder="Select Status" onChange={onChange}>
                {states.map((el) => (
                    <option key={el.value} value={el.value}>
                        {el.label}
                    </option>
                ))}
            </Select>
        </VStack>
    );
};

export default TrainingsStatusFilter;
