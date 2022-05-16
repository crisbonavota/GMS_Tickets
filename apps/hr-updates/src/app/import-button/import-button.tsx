import { VStack, Text, IconButton, Button, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, useDisclosure, Input, useToast, Box, Center, chakra } from '@chakra-ui/react';
import { BiImport } from 'react-icons/bi';
import { useState } from 'react';
import { parse } from 'papaparse';
import BulkCheck from '../bulk-check/bulk-check';

export interface ImportRow {
    currency: string,
    date: string,
    fileNumber: number,
    value: number
}

export function ImportButton() {
    const { isOpen, onOpen, onClose } = useDisclosure();
    const [rows, setRows] = useState<ImportRow[]>([]);
    const toast = useToast();

    const changeHandler = (event: any) => {
        parse<ImportRow>(event.target.files[0], {
            header: true,
            skipEmptyLines: true,
            complete: results => {
                setRows(results.data);
            },
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
                <ModalContent>
                    <ModalHeader>Upload file</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                        <chakra.input type="file" accept='.csv' onChange={changeHandler} justifyContent={'center'} />
                        {rows.length && <BulkCheck />}
                    </ModalBody>
                    <ModalFooter>
                        <Button colorScheme='blue' mr={3} disabled={!rows.length}>
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
