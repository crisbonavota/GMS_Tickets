import { VStack, Heading, Input, Skeleton } from '@chakra-ui/react';
import { getResourceList } from '@gms-micro/api-utils';
import { useAuthHeader } from 'react-auth-kit';
import { useQuery } from 'react-query';
import { useMemo } from 'react';

type Props = {
    projectId: number | null;
    task: string;
    setTask: (task: string) => void;
};

const TaskInput = ({ projectId, task, setTask }: Props) => {
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
            type: 'text',
            bgColor: 'white',
            borderWidth: 1,
            borderColor: 'lightgray',
        }),
        []
    );

    return (
        <VStack alignItems={'flex-start'}>
            <Heading fontSize={'md'}>Task</Heading>
            {projectId && (
                <>
                    {tasksQuery.isLoading && (
                        <Skeleton w={'full'} h={'2.4rem'} />
                    )}
                    {tasksQuery.isSuccess && (
                        <>
                            <Input
                                {...inputCommonProps}
                                list={'tasks-list'}
                                value={task}
                                onChange={(
                                    e: React.ChangeEvent<HTMLInputElement>
                                ) => setTask(e.target.value)}
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
