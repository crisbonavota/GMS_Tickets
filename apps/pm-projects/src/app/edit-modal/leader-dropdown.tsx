import { useQuery } from 'react-query';
import {
    getResourceListFilteredAndPaginated,
    ProjectCreation,
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
import { LegacyUserPublic } from '@gms-micro/auth-types';

interface Props {
    errors: FormikErrors<ProjectCreation>;
}

const LeaderDropdown = ({ errors }: Props) => {
    const getAuthHeader = useAuthHeader();
    const query = useQuery(
        ['users/legacy'],
        async () =>
            (
                await getResourceListFilteredAndPaginated<LegacyUserPublic>(
                    'users/legacy',
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
        <FormControl isInvalid={errors.leaderLegacyUserId !== undefined}>
            <FormLabel htmlFor={'leaderLegacyUserId'}>Leader</FormLabel>
            {query.isSuccess && (
                <Field
                    id="leaderLegacyUserId"
                    name="leaderLegacyUserId"
                    as={Select}
                    type="number"
                >
                    {query.data.map((user) => (
                        <option key={user.id} value={user.id}>
                            {user.fullName}
                        </option>
                    ))}
                </Field>
            )}
            {query.isLoading && <Skeleton h={'40px'} w={'100%'} />}
            <ErrorMessage
                name="leaderLegacyUserId"
                component={FormErrorMessage}
            />
        </FormControl>
    );
};

export default LeaderDropdown;
