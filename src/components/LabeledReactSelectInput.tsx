import { FormControl, FormErrorMessage, FormLabel } from "@chakra-ui/react";
import ReactSelect from "react-select";

interface Props {
    value: number | string | null;
    options: { value: number | string; label: string }[];
    setter: (value: number | string | null) => void;
    label: string;
    error?: string;
    touched?: boolean;
    name: string;
    placeholder?: string;
    isRequired?: boolean;
}

const LabeledReactSelectInput = ({
    value,
    options,
    setter,
    label,
    error,
    touched,
    name,
    placeholder,
    isRequired,
}: Props) => {
    return (
        <FormControl isRequired={isRequired} isInvalid={Boolean(error) && touched}>
            <FormLabel htmlFor={name}>{label}</FormLabel>
            <ReactSelect
                value={options.find((option) => option.value === value)}
                onChange={(option) => setter(option?.value ?? null)}
                options={options}
                isClearable
                name={name}
                id={name}
                placeholder={placeholder}
            />
            <FormErrorMessage>{error}</FormErrorMessage>
        </FormControl>
    );
};

export default LabeledReactSelectInput;
