import { useQuery } from 'react-query';
import {
    getResourceListFilteredAndPaginated,
    ProjectCreation,
    Proposal,
} from '@gms-micro/api-utils';
import { useAuthHeader } from 'react-auth-kit';
import {
    FormControl,
    FormLabel,
    Select,
    FormErrorMessage,
} from '@chakra-ui/react';
import { ErrorMessage, Field, FormikErrors } from 'formik';
import { Skeleton } from '@chakra-ui/react';

interface Props {
    errors: FormikErrors<ProjectCreation>;
}

const ProposalDropdown = ({ errors }: Props) => {
    const getAuthHeader = useAuthHeader();
    const query = useQuery(
        ['proposals/member'],
        async () =>
            (
                await getResourceListFilteredAndPaginated<Proposal>(
                    'proposals/member',
                    getAuthHeader(),
                    [],
                    [],
                    { field: 'name', isAscending: true },
                    0,
                    1000
                )
            ).data
    );

    return (
        <FormControl isInvalid={errors.proposalId !== undefined}>
            <FormLabel htmlFor={'proposalId'}>Proposal</FormLabel>
            {query.isSuccess && (
                <Field
                    id="proposalId"
                    name="proposalId"
                    as={Select}
                    type="number"
                >
                    {query.data.map((proposal) => (
                        <option key={proposal.id} value={proposal.id}>
                            {proposal.name}
                        </option>
                    ))}
                </Field>
            )}
            {query.isLoading && <Skeleton h={'40px'} w={'100%'} />}
            <ErrorMessage name="proposalId" component={FormErrorMessage} />
        </FormControl>
    );
};

export default ProposalDropdown;
