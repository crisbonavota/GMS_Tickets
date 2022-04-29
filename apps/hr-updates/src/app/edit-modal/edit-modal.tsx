import {
    Button,
    FormControl,
    FormLabel,
    IconButton,
    Input,
    Modal,
    ModalBody,
    ModalCloseButton,
    ModalContent,
    ModalFooter,
    ModalHeader,
    ModalOverlay,
    Select,
    Textarea,
    useBoolean,
    VStack
} from '@chakra-ui/react';
import { Update, getResourceList, UpdateType } from '@gms-micro/api-utils';
import { MdModeEditOutline } from 'react-icons/md';
import { useState } from 'react';
import { useQuery } from 'react-query';
import { LegacyUserPublic } from '@gms-micro/auth-types';

export interface EditModalProps {
    update: Update,
    authHeader: string,
}

export function EditModal({ update, authHeader }: EditModalProps) {
    const originalUpdate = update;
    const [open, setOpen] = useBoolean();
    const [employee, setEmployee] = useState(update.legacyUser.id);
    const [updateType, setUpdateType] = useState(update.updateType.id);
    const [notes, setNotes] = useState(update.notes);
    const [date, setDate] = useState(update.date.split('T')[0]); // before T we have the date, after the time
    const employeesQuery = useQuery(['editEmployee'], () => getResourceList<LegacyUserPublic>('users/legacy', authHeader));
    const updateTypesQuery = useQuery(['editUpdateType'], () => getResourceList<UpdateType>('updates/types', authHeader));

    const onSubmit = () => {
        // verifications and submission goes here
    };

    return (
        <>
            <IconButton onClick={setOpen.on} size={'sm'} icon={<MdModeEditOutline />} aria-label="Edit" colorScheme={'blackAlpha'} />
            <Modal isOpen={open} onClose={setOpen.off}>
                <ModalOverlay />
                <ModalContent w={'full'}>
                    <ModalHeader>Edit update</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody w={'full'}>
                        <VStack>
                            <FormControl>
                                <FormLabel>Employee</FormLabel>
                                <Select value={employee} onChange={e => setEmployee(parseInt(e.target.value))}>
                                    {employeesQuery.isSuccess && 
                                        employeesQuery.data.data.map(e => <option key={e.id} value={e.id}>{e.fullName}</option>)}
                                </Select>
                            </FormControl>
                            <FormControl>
                                <FormLabel>Update Type</FormLabel>
                                <Select value={updateType} onChange={e => setUpdateType(parseInt(e.target.value))}>
                                    {updateTypesQuery.isSuccess && 
                                        updateTypesQuery.data.data.map(e => <option key={e.id} value={e.id}>{e.caption}</option>)}
                                </Select>
                            </FormControl>
                            <FormControl>
                                <FormLabel>Date</FormLabel>
                                <Input type="date" value={date} onChange={e => setDate(e.target.value)} />
                            </FormControl>
                            <FormControl>
                                <FormLabel>Notes</FormLabel>
                                <Textarea value={notes} onChange={e => setNotes(e.target.value)} />
                            </FormControl>
                        </VStack>
                    </ModalBody>
                    <ModalFooter>
                        <Button colorScheme='green' mr={3} onClick={onSubmit} disabled={date === ""}>
                            Save
                        </Button>
                        <Button variant='ghost' onClick={setOpen.off}>Cancel</Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </>

    );
}

export default EditModal;
