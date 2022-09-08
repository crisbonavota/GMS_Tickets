import {
    FormControl,
    InputProps,
    FormLabel,
    Input,
    FormErrorMessage,
} from '@chakra-ui/react';

interface Props extends InputProps {
    error?: string;
    touched?: boolean;
    label?: string;
}

const FormikTextInput = (props: Props) => {
    return (
        <FormControl isInvalid={props.touched && Boolean(props.error)}>
            <FormLabel htmlFor={props.id}>{props.label}</FormLabel>
            <Input borderColor={'lightgray'} {...props} />
            <FormErrorMessage>{props.error}</FormErrorMessage>
        </FormControl>
    );
};

export default FormikTextInput;
