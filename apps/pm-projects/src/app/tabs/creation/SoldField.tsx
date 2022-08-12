import { FormControl, FormLabel, Switch } from '@chakra-ui/react';
import React from 'react';

interface Props {
    value: boolean;
    setter: (value: boolean) => void;
}

const SoldField = ({ setter, value }: Props) => {
    return (
        <FormControl
            display={'flex'}
            flexDir="column"
            alignItems={'flex-start'}
            flex={1}
        >
            <FormLabel htmlFor="sold">Sold</FormLabel>
            <Switch
                id="sold"
                defaultChecked={value}
                size="lg"
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                    setter(e.target.checked)
                }
                colorScheme="orange"
            />
        </FormControl>
    );
};
export default SoldField;
