import { VStack, Text, IconButton, Button, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, useDisclosure, useToast, chakra } from '@chakra-ui/react';
import { BiImport } from 'react-icons/bi';
import { useState } from 'react';
import { parse } from 'papaparse';
import ImportPreview from '../import-preview/import-preview';

export interface ImportUpdate {
    currency?: string,
    date?: string,
    fileNumber?: number,
    amount?: number
}

export function ImportButton() {
    const { isOpen, onOpen, onClose } = useDisclosure();
    const [updates, setUpdates] = useState<ImportUpdate[]>([]);
    const [valid, setValid] = useState(false);
    const toast = useToast();

    const changeHandler = (event: any) => {
        parse<ImportUpdate>(event.target.files[0], {
            header: true,
            skipEmptyLines: true,
            complete: results => setUpdates(results.data),
            error: (error) => {
                toast({ title: "Error parsing the file, try again", description: error.message, status: "error" });
                console.log(error);
            }
        });
    };

    return (
        <>
            <VStack alignItems={'flex-start'}>
                <Text fontSize={'sm'}>Import</Text>
                <IconButton onClick={onOpen} size={'lg'} colorScheme={'teal'} aria-label="Import" icon={<BiImport size={20} />} />
            </VStack>

            <Modal isOpen={isOpen} onClose={onClose}>
                <ModalOverlay />
                <ModalContent maxW={'fit-content'}>
                    <ModalHeader>Upload file</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                        <VStack spacing={5} alignItems={'flex-start'}>
                            <chakra.input type="file" accept='.csv' onChange={changeHandler} justifyContent={'center'} />
                            {updates.length && <ImportPreview updates={updates} setUpdates={setUpdates} setValid={setValid} />}
                        </VStack>
                    </ModalBody>
                    <ModalFooter>
                        <Button colorScheme='blue' mr={3} disabled={!updates.length || !valid}>
                            Upload
                        </Button>
                        <Button variant='ghost' onClick={onClose}>Cancel</Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </>
    );
}

export default ImportButton;
