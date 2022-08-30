import { useCallback } from "react";
import { useAppDispatch, useAppSelector } from "../../../redux/hooks";
import { setFormTaskType } from "../../../redux/slices/timetrackSlice";
import { VStack, Heading, Box } from "@chakra-ui/react";
import Select from "react-select";
import { useAuthHeader } from "react-auth-kit";
import { getResourceList } from "../../../api/api";
import { TaskType } from "../../../api/types";
import { useQuery } from "react-query";

const TaskTypeDropdown = () => {
    const dispatch = useAppDispatch();

    const getAuthHeader = useAuthHeader();
    const {
        data: taskTypes,
        isLoading,
        isSuccess,
    } = useQuery(
        "tasktypes",
        () =>
            getResourceList<TaskType>("timetrack/tasks/types", getAuthHeader()),
        { select: (r) => r.data }
    );

    const taskTypeId = useAppSelector((state) => state.timetrack.form.taskType);

    const setTaskTypeId = useCallback(
        (id: number | null) => {
            dispatch({
                type: setFormTaskType,
                payload: id,
            });
        },
        [dispatch, setFormTaskType]
    );

    const getInternalValue = () => {
        if (!isSuccess || !taskTypes) return null;
        const taskType = taskTypes.find((t) => t.id === taskTypeId);
        if (!taskType) return null;
        return {
            label: taskType.caption,
            value: taskType.id,
        };
    };

    return (
        <VStack alignItems={"flex-start"}>
            <Heading fontSize={"md"}>Project</Heading>
            <Box w={"full"}>
                <Select
                    options={
                        isSuccess
                            ? taskTypes.map((t) => ({
                                  label: t.caption,
                                  value: t.id,
                              }))
                            : []
                    }
                    value={getInternalValue()}
                    onChange={(v: any) => setTaskTypeId(v.value)}
                    isLoading={isLoading}
                />
            </Box>
        </VStack>
    );
};

export default TaskTypeDropdown;
