import {
    FormControl,
    FormErrorMessage,
    FormLabel,
    Select,
    SelectProps,
} from '@chakra-ui/react';

interface Props extends SelectProps {
    error?: string;
    touched?: boolean;
    label?: string;
}

const FormikSelectInput = (props: Props) => {
    return (
        <FormControl isInvalid={props.touched && Boolean(props.error)}>
            <FormLabel htmlFor={props.id}>{props.label}</FormLabel>
            <Select {...props} />
            <FormErrorMessage>{props.error}</FormErrorMessage>
        </FormControl>
    );
};

export default FormikSelectInput;
