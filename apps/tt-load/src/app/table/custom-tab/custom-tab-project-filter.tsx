import { Box } from '@chakra-ui/react';
import { QuerySelect } from '@gms-micro/query-utils';
import { useAppSelector } from 'apps/tt-load/src/redux/hooks';
import { setCustomFiltersProject } from 'apps/tt-load/src/redux/slices/timetrackSlice';
import { useCallback } from 'react';
import { useAppDispatch } from '../../../redux/hooks';

const CustomTabProjectFilter = () => {
    const dispatch = useAppDispatch();
    const project = useAppSelector(
        (state) => state.timetrack.table.custom.project
    );
    const setProject = useCallback(
        (project: number | null) => {
            dispatch({
                type: setCustomFiltersProject,
                payload: project,
            });
        },
        [setCustomFiltersProject, dispatch]
    );

    return (
        <Box w={'full'}>
            <QuerySelect
                resource={'projects/for-timetrack'}
                title={'Project'}
                value={project}
                setValue={setProject}
            />
        </Box>
    );
};
export default CustomTabProjectFilter;
