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
    isRequired?: boolean;
}

const FormikSelectInput = (props: Props) => {
    return (
        <FormControl isRequired={props.isRequired} isInvalid={props.touched && Boolean(props.error)}>
            <FormLabel htmlFor={props.id}>{props.label}</FormLabel>
            <Select placeholder='Select' {...props} />
            <FormErrorMessage>{props.error}</FormErrorMessage>
        </FormControl>
    );
};

export default FormikSelectInput;
