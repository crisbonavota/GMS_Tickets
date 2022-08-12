import { VStack } from '@chakra-ui/react';
import { useCallback } from 'react';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import { changeFilter } from '../../redux/slices/mainSlice';
import AccountFilter from '../AccountFilter';
import ClientFilter from '../ClientFilter';
import TypeFilter from './TypeFilter';

const JobsFilters = () => {
    const dispatch = useAppDispatch();
    const type = useAppSelector((s) => s.projectManagement.jobs.filters.type);

    const clientSetter = useCallback(
        (c: number | null) => {
            dispatch({
                type: changeFilter,
                payload: {
                    module: 'jobs',
                    value: {
                        key: 'client',
                        value: c,
                    },
                },
            });
        },
        [dispatch, changeFilter]
    );

    const accountSetter = useCallback(
        (a: number | null) => {
            dispatch({
                type: changeFilter,
                payload: {
                    module: 'jobs',
                    value: {
                        key: 'account',
                        value: a,
                    },
                },
            });
        },
        [dispatch, changeFilter]
    );

    const typeSetter = useCallback(
        (checked: string[]) => {
            const project = checked.includes('project');
            const proposal = checked.includes('proposal');

            // don't allow the user to uncheck both project and proposal
            if (!project && !proposal) return;

            dispatch({
                type: changeFilter,
                payload: {
                    module: 'jobs',
                    value: {
                        key: 'type',
                        value: {
                            project,
                            proposal,
                        },
                    },
                },
            });
        },
        [dispatch, changeFilter]
    );

    return (
        <VStack w={'full'}>
            <ClientFilter setter={clientSetter} />
            <AccountFilter setter={accountSetter} />
            <TypeFilter setter={typeSetter} value={type} />
        </VStack>
    );
};

export default JobsFilters;
