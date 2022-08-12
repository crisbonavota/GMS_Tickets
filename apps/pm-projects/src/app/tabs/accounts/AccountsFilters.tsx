import { VStack } from '@chakra-ui/react';
import CountryFilter from '../CountryFilter';
import StatusFilter from '../StatusFilter';
import { useAppDispatch } from '../../redux/hooks';
import { useCallback } from 'react';
import { changeFilter } from '../../redux/slices/mainSlice';
import ClientFilter from '../ClientFilter';

const AccountsFilters = () => {
    const dispatch = useAppDispatch();

    const countrySetter = useCallback(
        (country: number | null) => {
            dispatch({
                type: changeFilter,
                payload: {
                    module: 'accounts',
                    value: {
                        key: 'country',
                        value: country,
                    },
                },
            });
        },
        [dispatch, changeFilter]
    );

    const stateSetter = useCallback(
        (val: boolean) => {
            dispatch({
                type: changeFilter,
                payload: {
                    module: 'accounts',
                    value: {
                        key: 'active',
                        value: val,
                    },
                },
            });
        },
        [dispatch, changeFilter]
    );

    const clientSetter = useCallback(
        (c: number | null) => {
            dispatch({
                type: changeFilter,
                payload: {
                    module: 'accounts',
                    value: {
                        key: 'client',
                        value: c,
                    },
                },
            });
        },
        [dispatch, changeFilter]
    );

    return (
        <VStack w={'full'} spacing={5}>
            <ClientFilter setter={clientSetter} />
            <CountryFilter setter={countrySetter} />
            <StatusFilter setter={stateSetter} />
        </VStack>
    );
};

export default AccountsFilters;
