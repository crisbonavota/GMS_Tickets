import { Wrap, WrapItem, Text } from "@chakra-ui/react";
import { AiOutlineClose } from "react-icons/ai";
import { SelectItem } from "../select-item/select-item";

interface LabelsChipsProps {
    values: SelectItem[],
    setter: (values: SelectItem[]) => void,
}

const LabelsChips = ({ values, setter }: LabelsChipsProps) => {
    const onRemove = (value: SelectItem) => {
        setter(values.filter(v => v !== value));
    }

    return (
        <Wrap>
            {values.map((value, index) =>
                <WrapItem
                    p={2}
                    borderRadius={5}
                    bgColor={'steelblue'}
                    color={'white'}
                    key={index}
                    fontSize={'sm'}
                    alignItems={'center'}
                >
                    <AiOutlineClose cursor={'pointer'} onClick={() => onRemove(value)} />
                    <Text ms={2}>{value.label}</Text>
                </WrapItem>)}
        </Wrap>
    )
}

export default LabelsChips;
