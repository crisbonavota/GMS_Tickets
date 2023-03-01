import Select, { SingleValue } from "react-select";
import { StateManagerProps } from "react-select/dist/declarations/src/useStateManager";
import { VStack, FormLabel } from "@chakra-ui/react";

interface Props extends StateManagerProps {
    setter: (value: number | null) => void;
    label: string;
    data: any[];
    labelProp: string;
    valueProp: string;
}

const SincSingleValueSelector = ({
    setter,
    label,
    data,
    labelProp,
    valueProp,
    styles,
    ...rest
}: Props) => {
    const onChange = (
        newValue: SingleValue<{ label: string; value: number }>
    ) => {
        setter(newValue ? newValue.value : null);
    };

    return (
        <VStack alignItems={"flex-start"} w={"full"}>
            {label && <FormLabel>{label}</FormLabel>}
            <Select
                options={data.map((item) => ({
                    label: item[labelProp],
                    value: item[valueProp],
                }))}
                onChange={(v: any) => onChange(v)}
                styles={
                    styles
                        ? styles
                        : {
                              container: (base) => ({
                                  ...base,
                                  width: "100%",
                              }),
                          }
                }
                {...rest}
            />
        </VStack>
    );
};

export default SincSingleValueSelector;
