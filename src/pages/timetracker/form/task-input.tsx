import { VStack, Heading, Input, Skeleton } from "@chakra-ui/react";
import { useAuthHeader } from "react-auth-kit";
import { useQuery } from "react-query";
import { useMemo } from "react";
import { getResourceList } from "../../../api/api";
import { useAppDispatch, useAppSelector } from "../../../redux/hooks";
import { setFormTask } from "../../../redux/slices/timetrackSlice";

const TaskInput = () => {
    const dispatch = useAppDispatch();
    const projectId = useAppSelector((state) => state.timetrack.form.project);
    const task = useAppSelector((state) => state.timetrack.form.task);

    const setTask = (task: string) => {
        dispatch({
            type: setFormTask,
            payload: task,
        });
    };

    const getAuthHeader = useAuthHeader();
    // This query will only get triggered when projectId is different from null
    const tasksQuery = useQuery(
        [`projects/${projectId}/tasks`],
        () =>
            getResourceList<string>(
                `projects/${projectId}/tasks`,
                getAuthHeader()
            ),
        { enabled: projectId !== null }
    );

    const inputCommonProps = useMemo(
        () => ({
            type: "text",
            bgColor: "white",
            borderWidth: 1,
            borderColor: "lightgray",
        }),
        []
    );

    const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setTask(e.target.value);
    };

    return (
        <VStack alignItems={"flex-start"}>
            <Heading fontSize={"md"}>Task</Heading>
            {projectId && (
                <>
                    {tasksQuery.isLoading && (
                        <Skeleton w={"full"} h={"2.4rem"} />
                    )}
                    {tasksQuery.isSuccess && (
                        <>
                            <Input
                                {...inputCommonProps}
                                list={"tasks-list"}
                                value={task}
                                onChange={onChange}
                                // Removes the arrow from the datalist
                                css={{
                                    "&::-webkit-calendar-picker-indicator": {
                                        display: "none !important",
                                    },
                                }}
                            />
                            <datalist id="tasks-list">
                                {tasksQuery?.data?.data.map((task) => (
                                    <option value={task} key={task} />
                                ))}
                            </datalist>
                        </>
                    )}
                </>
            )}
            {!projectId && <Input {...inputCommonProps} disabled />}
        </VStack>
    );
};

export default TaskInput;
