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

const FormikSelectInput = ({error, touched, label, isRequired}: Props) => {
    return (
        <FormControl isRequired={isRequired} isInvalid={touched && Boolean(error)}>
            <FormLabel>{label}</FormLabel>
            <Select placeholder='Select' />
            <FormErrorMessage>{error}</FormErrorMessage>
        </FormControl>
    );
};

export default FormikSelectInput;
