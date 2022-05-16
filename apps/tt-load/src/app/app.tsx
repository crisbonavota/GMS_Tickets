import { Center, Stack } from '@chakra-ui/react';
import { TimetrackItem } from '@gms-micro/api-utils';
import moment from 'moment';
import { useMemo, useState } from 'react';
import { useAuthHeader } from 'react-auth-kit';
import CreateEditForm from './create-edit-form/create-edit-form';
import TableComponent from './table/table';

const App = () => {
    const [date, setDate] = useState(moment().format("YYYY-MM-DD"));
    const [hours, setHours] = useState<string>("");
    const [taskType, setTaskType] = useState<number>();
    const [task, setTask] = useState('');
    const [project, setProject] = useState<number>();
    const [type, setType] = useState<'create' | 'edit'>('create');
    const [selected, setSelected] = useState<number | null>(null);
    const getAuthHeader = useAuthHeader();

    const resetForm = useMemo(() => () => {
        setSelected(null);
        setType('create');
        setProject(undefined);
        setTask('');
        setTaskType(undefined);
        setDate(new Date().toISOString().split('T')[0]);
        setHours('');
    }, []);

    const fillForm = useMemo(() => (item: TimetrackItem) => {
        setSelected(item.id);
        setType('edit');
        setDate(item.date.split('T')[0]);
        setProject(item.project.id);
        setTask(item.task);
        setTaskType(item.tasktype.id);
        setHours(hoursToHoursMinutes(item.hours));
    }, []);

    return (
        <Center w={'full'} minH={'92vh'} bgColor={'white'}>
            <Stack w={{ base: '100%', md: '85%' }} flexDir={{ base: 'column', md: 'row' }}>
                <CreateEditForm
                    date={date}
                    hours={hours}
                    taskType={taskType}
                    task={task}
                    project={project}
                    setDate={setDate}
                    setHours={setHours}
                    setTaskType={setTaskType}
                    setTask={setTask}
                    setProject={setProject}
                    authHeader={getAuthHeader()}
                    type={type}
                    selected={selected}
                    resetForm={resetForm}
                />
                <TableComponent 
                    authHeader={getAuthHeader()} 
                    selected={selected}
                    resetForm={resetForm}
                    fillForm={fillForm}
                />
            </Stack>
        </Center>
    )
}

// This function takes a number that represents an amount of hours an converts it to HH:MM string format
const hoursToHoursMinutes = (hours: number) => {
    const minutes = hours % 1 * 60;
    const hoursInt = Math.floor(hours);
    const minutesInt = Math.floor(minutes);
    return `${hoursInt.toString().padStart(2, "0")}:${minutesInt.toString().padStart(2, "0")}`;
}

export default App