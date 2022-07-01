import { QuerySelect } from '@gms-micro/query-utils';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import { setFormTaskType } from '../../redux/slices/timetrackSlice';
import { useCallback } from 'react';

const TaskTypeDropdown = () => {
    const dispatch = useAppDispatch();

    const tasktTypeId = useAppSelector(
        (state) => state.timetrack.form.taskType
    );

    const setTaskTypeId = useCallback(
        (id: number | null) => {
            dispatch({
                type: setFormTaskType,
                payload: id,
            });
        },
        [dispatch, setFormTaskType]
    );

    return (
        <QuerySelect
            resource="timetrack/tasks/types"
            title={'Task type'}
            labelOption="caption"
            value={tasktTypeId}
            setValue={setTaskTypeId}
        />
    );
};
export default TaskTypeDropdown;
