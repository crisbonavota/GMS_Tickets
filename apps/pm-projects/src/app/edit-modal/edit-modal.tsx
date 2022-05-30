import { MdModeEditOutline } from 'react-icons/md';
import {
    Button,
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalCloseButton,
    ModalBody,
    ModalFooter,
    useDisclosure,
    IconButton,
    VStack,
    HStack,
} from '@chakra-ui/react';
import { useMemo } from 'react';
import * as Yup from 'yup';
import { patchResource, Project, ProjectCreation } from '@gms-micro/api-utils';
import { Formik, Form } from 'formik';
import ProposalDropdown from './proposal-dropdown';
import NameInput from './name-input';
import StatusDropdown from './status-dropdown';
import ContractTypeDropdown from './contract-type-dropdown';
import LeaderDropdown from './leader-dropdown';
import StartDateInput from './start-date-input';
import moment from 'moment';
import EndDateInput from './end-date-input';
import { useMutation, useQueryClient } from 'react-query';
import { useAuthHeader } from 'react-auth-kit';
import { useToast } from '@chakra-ui/react';
import { AxiosError } from 'axios';

interface Props {
    project: Project;
}

const EditModal = ({ project }: Props) => {
    const { isOpen, onOpen, onClose } = useDisclosure();
    const getAuthHeader = useAuthHeader();
    const queryClient = useQueryClient();
    const toast = useToast();

    const initialValues: ProjectCreation = useMemo(
        () => ({
            name: project.name.replace(` (${project.id})`, ''), // Removing ID from name
            proposalId: project.proposal.id,
            status: project.status,
            contractType: project.contractType,
            startDate: project.startDate
                ? moment(project.startDate).format('YYYY-MM-DD')
                : '',
            endDate: project.endDate
                ? moment(project.endDate).format('YYYY-MM-DD')
                : '',
            leaderLegacyUserId: project.leaderLegacyUser?.id,
        }),
        [project]
    );

    const validationShema = useMemo(
        () =>
            Yup.object().shape({
                name: Yup.string().required('Name is required'),
                proposalId: Yup.number().required('Proposal is required'),
                status: Yup.number().required('Status is required'),
                contractType: Yup.number().required(
                    'Contract type is required'
                ),
                leaderLegacyUserId: Yup.number().required('Leader is required'),
                startDate: Yup.date(),
                endDate: Yup.date().min(
                    Yup.ref('startDate'),
                    'End date must be after start date'
                ),
            }),
        []
    );

    const editMutation = useMutation(
        (values: ProjectCreation) =>
            patchResource(
                'projects',
                project.id,
                getAuthHeader(),
                initialValues,
                values
            ),
        {
            onMutate: () => {
                queryClient.cancelQueries(['projects']);
            },
            onSuccess: () => {
                queryClient.resetQueries(['projects']);
                toast({ title: 'Project updated', status: 'success' });
            },
            onError: (error: any | AxiosError) => {
                toast({
                    title: 'Error updating project',
                    description: error.message || error,
                    status: 'error',
                });
            },
        }
    );

    return (
        <>
            <IconButton
                icon={<MdModeEditOutline />}
                aria-label="Edit"
                onClick={onOpen}
            />

            <Modal isOpen={isOpen} onClose={onClose}>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>Edit project</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                        <Formik
                            initialValues={initialValues}
                            onSubmit={async (values, { setSubmitting }) => {
                                setSubmitting(true);
                                await editMutation.mutateAsync(values);
                                setSubmitting(false);
                                onClose();
                            }}
                            validationSchema={validationShema}
                        >
                            {({ errors, handleSubmit, isSubmitting }) => (
                                <Form onSubmit={handleSubmit}>
                                    <VStack spacing={4}>
                                        <ProposalDropdown errors={errors} />
                                        <NameInput errors={errors} />
                                        <StatusDropdown errors={errors} />
                                        <ContractTypeDropdown errors={errors} />
                                        <LeaderDropdown errors={errors} />
                                        <HStack w={'full'}>
                                            <StartDateInput errors={errors} />
                                            <EndDateInput errors={errors} />
                                        </HStack>

                                        <ModalFooter w={'full'}>
                                            <Button
                                                colorScheme="green"
                                                mr={3}
                                                type={'submit'}
                                                isLoading={isSubmitting}
                                            >
                                                Save
                                            </Button>
                                            <Button
                                                variant="ghost"
                                                onClick={onClose}
                                            >
                                                Cancel
                                            </Button>
                                        </ModalFooter>
                                    </VStack>
                                </Form>
                            )}
                        </Formik>
                    </ModalBody>
                </ModalContent>
            </Modal>
        </>
    );
};
export default EditModal;
