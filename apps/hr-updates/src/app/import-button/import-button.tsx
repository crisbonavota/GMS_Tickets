import { VStack, Text, IconButton, Button, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, useDisclosure, useToast, chakra, useBoolean } from '@chakra-ui/react';
import { BiImport } from 'react-icons/bi';
import { useCallback, useState } from 'react';
import { parse } from 'papaparse';
import ImportPreview from '../import-preview/import-preview';
import { useMutation, useQueryClient } from 'react-query';
import { postResource } from '@gms-micro/api-utils';
import { useAuthHeader } from 'react-auth-kit';
import moment from 'moment';
import ImportFormatView from '../import-format-view/import-format-view';

export interface ImportUpdate {
    currency?: string,
    date?: string,
    filenumber?: number,
    amount?: number
}

export function ImportButton() {
    const { isOpen, onOpen, onClose } = useDisclosure();
    const [updates, setUpdates] = useState<ImportUpdate[]>([]);
    const [valid, setValid] = useState(false);
    const [isSubmitting, setIsSubmitting] = useBoolean(false);
    const toast = useToast();
    const getAuthHeader = useAuthHeader();
    const queryClient = useQueryClient();

    const changeHandler = (event: any) => {
        parse<ImportUpdate>(event.target.files[0], {
            header: true,
            skipEmptyLines: 'greedy',
            transformHeader : (h) => h.trim().toLowerCase().replace(/\s/g, ''),
            transform: (r) => r.replace(",", '.').replace(/-/g, "/"),
            complete: results => setUpdates(results.data),
            error: (error) => {
                toast({ title: "Error parsing the file, try again", description: error.message, status: "error" });
                console.log(error);
            }
        });
    };

    const submitMutation = useMutation(async () => await postResource(
        "updates/bulk",
        getAuthHeader(),
        updates.map(u => { return { ...u, date: moment(u.date, "DD/MM/YYYY").format("YYYY-MM-DD") } })
    ), {
        onMutate: () => {
            setIsSubmitting.on();
            queryClient.cancelQueries('updates');
            queryClient.cancelQueries('updatesReport');
        },
        onSuccess: () => {
            setIsSubmitting.off();
            onClose();
            toast({ title: "Successfully imported", status: "success" });
            setUpdates([]);
            setValid(false);
            queryClient.resetQueries('updates');
            queryClient.resetQueries('updatesReport');
        },
        onError: (err: any) => {
            setIsSubmitting.off();
            onClose();
            toast({ title: "Error importing, try again later", description: err.message | err, status: "error" });
            console.log(err);
        }
    });

    const onCancel = useCallback(() => {
        setUpdates([]);
        setValid(false);
        onClose();
    }, []);

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
                            {!updates.length && <ImportFormatView />}
                        </VStack>
                    </ModalBody>
                    <ModalFooter>
                        <Button
                            colorScheme='blue'
                            mr={3}
                            disabled={!updates.length || !valid}
                            onClick={async () => await submitMutation.mutateAsync()}
                            isLoading={isSubmitting}
                        >
                            Upload
                        </Button>
                        <Button variant='ghost' onClick={onCancel}>Cancel</Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </>
    );
}

export default ImportButton;
