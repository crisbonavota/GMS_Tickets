import {
    HStack,
    Divider,
    SimpleGrid,
    GridItem,
    Button,
    useBoolean,
    useToast,
    Text,
    VStack,
} from '@chakra-ui/react';
import { postResource, putResource } from '@gms-micro/api-utils';
import { useMutation, useQueryClient } from 'react-query';
import DateInput from './date-input';
import HoursInput from './hours-input';
import TaskInput from './task-input';
import { QuerySelect } from '@gms-micro/query-utils';
import { useAuthHeader } from 'react-auth-kit';

type Props = {
    date: string;
    hours: number;
    taskType?: number;
    task: string;
    project?: number;
    minutes: number;
    setMinutes: (minutes: number) => void;
    setDate: (date: string) => void;
    setHours: (hours: number) => void;
    setTaskType: (taskType: number) => void;
    setTask: (task: string) => void;
    setProject: (project: number) => void;
    type: 'create' | 'edit';
    selected: number | null;
    resetForm: () => void;
};

const CreateEditForm = ({
    date,
    hours,
    taskType,
    task,
    project,
    setDate,
    setHours,
    setTaskType,
    setTask,
    setProject,
    type,
    selected,
    minutes,
    setMinutes,
}: Props) => {
    const toast = useToast();
    const [submitting, setSubmitting] = useBoolean(false);
    const queryClient = useQueryClient();
    const getAuthHeader = useAuthHeader();

    const mutation = useMutation(
        type === 'create'
            ? () =>
                  postResource('timetrack', getAuthHeader(), {
                      date: date,
                      hours: (hours + minutes / 60).toFixed(2),
                      taskTypeId: taskType,
                      task: task,
                      projectId: project,
                  })
            : () =>
                  putResource(
                      'timetrack',
                      // the 0 won't ever be sent because if the type is edit, selected has a value
                      selected ? selected : 0,
                      getAuthHeader(),
                      {
                          date: date,
                          hours: (hours + minutes / 60).toFixed(2),
                          taskTypeId: taskType,
                          task: task,
                          projectId: project,
                      }
                  ),
        {
            onMutate: () => {
                setSubmitting.on();
            },
            onSuccess: () => {
                setSubmitting.off();
                toast({
                    title: `${
                        type === 'create' ? 'Hours submitted' : 'Entry updated'
                    }`,
                    status: 'success',
                });
                queryClient.resetQueries('owned-daily');
                queryClient.resetQueries('owned-weekly');
                queryClient.resetQueries('owned-custom');
            },
            onError: (err: any) => {
                setSubmitting.off();
                toast({
                    title: `Error ${
                        type === 'create'
                            ? 'submitting the hours'
                            : 'updating the entry'
                    }, try again later`,
                    description: err.message || err,
                    status: 'error',
                });
            },
        }
    );

    return (
        <VStack
            w={{ base: '100%', md: '50%' }}
            p={{ base: 5, md: 0 }}
            me={{ base: 0, md: 10 }}
            spacing={5}
            z-index={100}
        >
            <HStack w={'full'} alignItems={'center'}>
                <Text fontSize={'xl'} whiteSpace={'nowrap'}>
                    {type === 'create' ? 'Submit hours' : 'Edit entry'}
                </Text>
                <Divider borderColor={'orangered'} />
            </HStack>
            <SimpleGrid w={'full'} columns={2} spacing={5}>
                <GridItem colSpan={1}>
                    <DateInput date={date} setDate={setDate} />
                </GridItem>
                <GridItem colSpan={1}>
                    <QuerySelect
                        resource={'projects/for-timetrack'}
                        title={'Project'}
                        value={project}
                        setValue={setProject}
                    />
                </GridItem>
                <GridItem colSpan={1}>
                    <QuerySelect
                        resource={'timetrack/tasks/types'}
                        title={'Task type'}
                        labelOption="caption"
                        value={taskType}
                        setValue={setTaskType}
                    />
                </GridItem>
                <GridItem colSpan={1}>
                    <TaskInput
                        projectId={project}
                        task={task}
                        setTask={setTask}
                    />
                </GridItem>
                <GridItem colSpan={1}>
                    <HoursInput
                        hours={hours}
                        setHours={setHours}
                        minutes={minutes}
                        setMinutes={setMinutes}
                    />
                </GridItem>
                <GridItem colSpan={2}>
                    <Button
                        w={'full'}
                        colorScheme={'orange'}
                        disabled={
                            !project ||
                            !taskType ||
                            !task ||
                            (hours < 1 && !(minutes > 0)) ||
                            !date
                        }
                        onClick={() => mutation.mutate()}
                        isLoading={submitting}
                    >
                        {type === 'create' ? 'SUBMIT' : 'SAVE'}
                    </Button>
                </GridItem>
            </SimpleGrid>
        </VStack>
    );
};

export default CreateEditForm;
