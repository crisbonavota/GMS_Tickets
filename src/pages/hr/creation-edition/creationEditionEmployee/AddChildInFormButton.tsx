import { Button, GridItem } from '@chakra-ui/react';
import { useState } from 'react';
import { FaPlus } from 'react-icons/fa';
import { ChildCreation } from '../../../../api/types';
import FormikInput from '../../../../components/FormikInput';

interface Props{
    value: ChildCreation[];
    onChange: React.ChangeEventHandler<HTMLInputElement>;
    touched?: boolean;
    error?: string;
}

const AddChildInFormButton = ({value, onChange, touched, error} : Props) => {
    const [inputCount, setInputCount] = useState(0);

    const addInput = () => {
        setInputCount(inputCount + 1);
    };

    return (
        <>
            {Array.from({ length: inputCount }, (_, i) => (
                <GridItem colSpan={1}> 
                    <FormikInput 
                        key={i}
                        type={"date"}
                        label="Child birth date"
                        isRequired={false}
                        name={"childs"}
                        id={"childs"}
                        value={value}
                        onChange={onChange}
                        touched={touched}
                        error={error}
                        textColor={"black"}
                    />
                </GridItem>
            ))}
            <Button
                variant={'ghost'}
                colorScheme={'white'}
                size={'xl'}
                leftIcon={<FaPlus color="green" />}
                onClick={addInput}
            >        
                Add Child
            </Button>
        </>   
    );
};

export default AddChildInFormButton;