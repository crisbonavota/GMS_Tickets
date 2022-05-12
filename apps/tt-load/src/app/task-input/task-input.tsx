import { VStack, Heading, Input, Skeleton } from '@chakra-ui/react'
import { getResourceList } from '@gms-micro/api-utils'
import { useQuery } from 'react-query'

type Props = {
    authHeader: string,
    projectId?: number,
    task: string,
    setTask: (task: string) => void
}

const TaskInput = ({ authHeader, projectId, task, setTask }: Props) => {
    const tasksQuery = projectId ?
        useQuery([`projects/${projectId}/tasks`], () => getResourceList<string>(`projects/${projectId}/tasks`, authHeader)) :
        null;

    return (
        <VStack alignItems={'flex-start'}>
            <Heading fontSize={'md'}>Task</Heading>
            {tasksQuery?.isLoading && <Skeleton w={'full'} h={'2.4rem'} />}
            {!tasksQuery?.isLoading &&
                <>
                    <Input
                        type={'text'}
                        bgColor={'white'}
                        borderWidth={1}
                        borderColor={'lightgray'}
                        list={"tasks-list"}
                        css={{
                            '&::-webkit-calendar-picker-indicator': {
                                display: 'none !important'
                            }
                        }}
                        disabled={!tasksQuery || !projectId}
                        value={task}
                        onChange={(e) => setTask(e.target.value)}
                    />
                    {tasksQuery?.isSuccess &&
                        <datalist id='tasks-list'>
                            {tasksQuery?.data?.data.map(task => <option value={task} key={task} />)}
                        </datalist>}
                </>}
        </VStack>
    )
}

export default TaskInput