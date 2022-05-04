import { IconButton, useBoolean, VStack, Text } from '@chakra-ui/react';
import { VscNewFile } from 'react-icons/vsc';

type CreateModalProps = {}

const CreateModal = ({ }: CreateModalProps) => {
    const [open, setOpen] = useBoolean();

    return (
        <VStack>
            <Text fontSize={'sm'}>Create</Text>
            <IconButton onClick={setOpen.on} size={'lg'} icon={<VscNewFile />} aria-label="Create" colorScheme={'green'} />
        </VStack>
    )
}

export default CreateModal;
