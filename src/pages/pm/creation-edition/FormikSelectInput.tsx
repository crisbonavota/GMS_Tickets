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
            <FormLabel>{props.label}</FormLabel>
            <Select {...props} placeholder='Select' />
            <FormErrorMessage>{props.error}</FormErrorMessage>
        </FormControl>
    );
};

export default FormikSelectInput;
