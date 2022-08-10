import { getResourceListFilteredAndPaginated } from '@gms-micro/api-utils';
import AsyncSelect from 'react-select/async';
import { useAuthHeader } from 'react-auth-kit';
import { FormControl, FormErrorMessage, FormLabel } from '@chakra-ui/react';
import { SingleValue } from 'react-select';
import { LegacyUserPublic } from '@gms-micro/auth-types';

interface Props {
    setter: (value: number | null) => void;
    value: number | null;
}

const LeadField = ({ setter, value }: Props) => {
    const getAuthHeader = useAuthHeader();
    const getOptions = async (input: string) => {
        const res = await getResourceListFilteredAndPaginated<LegacyUserPublic>(
            'users/legacy',
            getAuthHeader(),
            [{ field: 'fullName', value: input }],
            [],
            { field: 'fullName', isAscending: true }
        );
        return res.data.map((c) => ({
            label: c.fullName,
            value: c.id,
        }));
    };

    const onChange = (
        client: SingleValue<{ label: string; value: number }>
    ) => {
        setter(client ? client.value : null);
    };

    return (
        <FormControl isInvalid={value === null}>
            <FormLabel htmlFor="lead">Lead</FormLabel>
            <AsyncSelect
                id="lead"
                name="lead"
                placeholder="Type for results..."
                cacheOptions
                loadOptions={getOptions}
                isClearable
                styles={{
                    container: (base) => ({
                        ...base,
                        width: '100%',
                    }),
                }}
                noOptionsMessage={(props) =>
                    props.inputValue !== ''
                        ? 'No results found, try different keywords'
                        : 'Start typing to search for users'
                }
                onChange={onChange}
            />
            <FormErrorMessage>This field is required</FormErrorMessage>
        </FormControl>
    );
};

export default LeadField;
