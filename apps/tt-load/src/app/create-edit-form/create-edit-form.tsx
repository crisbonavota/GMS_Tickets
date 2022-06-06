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
import { useCallback, useMemo } from 'react';
import moment from 'moment';
import ProjectDropdown from './project-dropdown';

type Props = {
    date: string;
    hours: number;
    taskType?: number;
    task: string;
    project: number | null;
    minutes: number;
    setMinutes: (minutes: number) => void;
    setDate: (date: string) => void;
    setHours: (hours: number) => void;
    setTaskType: (taskType: number) => void;
    setTask: (task: string) => void;
    setProject: (project: number | null) => void;
    type: 'create' | 'edit';
    selected: number | null;
    resetForm: () => void;
    setSelected: (id: number | null) => void;
    setType: (type: 'edit' | 'create') => void;
    setDateShiftTrigger: (trigger: number | null) => void;
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
    setSelected,
    resetForm,
    setType,
    setDateShiftTrigger,
}: Props) => {
    const toast = useToast();
    const [submitting, setSubmitting] = useBoolean(false);
    const queryClient = useQueryClient();
    const getAuthHeader = useAuthHeader();

    const calculateDayShift = useCallback((date: string) => {
        const today = moment();
        const newDate = moment(date);
        setDateShiftTrigger(newDate.diff(today, 'days'));
    }, []);

    const isSubmitAllowed = useMemo(
        () => !project || !taskType || !task || (!hours && !minutes) || !date,
        [project, taskType, task, hours, minutes, date]
    );

    const mutation = useMutation(
        async () => {
            if (type === 'create') {
                await postResource('timetrack', getAuthHeader(), {
                    date: date,
                    hours: (hours + minutes / 60).toFixed(2),
                    taskTypeId: taskType,
                    task: task,
                    projectId: project,
                });
            } else {
                await putResource(
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
                );
            }
        },
        {
            onMutate: () => {
                setSubmitting.on();
            },
            onSuccess: () => {
                setSubmitting.off();

                if (type === 'edit') {
                    setSelected(null);
                    setType('create');
                    resetForm();
                }

                toast({
                    title: `${
                        type === 'create' ? 'Hours submitted' : 'Entry updated'
                    }`,
                    status: 'success',
                    position: 'top', 
                    duration: 2000,
                });

                calculateDayShift(date);

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
                    position: 'top', 
                    duration: 2000,
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
                    <ProjectDropdown
                        projectId={project}
                        setProjectId={setProject}
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
                        disabled={isSubmitAllowed || submitting}
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
