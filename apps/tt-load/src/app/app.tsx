import { Center, Stack } from '@chakra-ui/react';
import { TimetrackItem } from '@gms-micro/api-utils';
import moment from 'moment';
import { useState, useCallback } from 'react';
import CreateEditForm from './create-edit-form/create-edit-form';
import TableComponent from './table/table';

const App = () => {
    const [date, setDate] = useState(moment().format('YYYY-MM-DD'));
    const [hours, setHours] = useState<number>(0);
    const [minutes, setMinutes] = useState<number>(0);
    const [taskType, setTaskType] = useState<number>();
    const [task, setTask] = useState('');
    const [project, setProject] = useState<number>();
    const [type, setType] = useState<'create' | 'edit'>('create');
    const [selected, setSelected] = useState<number | null>(null);

    const resetForm = useCallback(() => {
        setProject(undefined);
        setTask('');
        setTaskType(undefined);
        setDate(new Date().toISOString().split('T')[0]);
        setHours(0);
    }, []);

    const fillForm = useCallback((item: TimetrackItem) => {
        setDate(item.date.split('T')[0]);
        setProject(item.project.id);
        setTask(item.task);
        setTaskType(item.tasktype.id);
        setHours(Math.trunc(item.hours));
        setMinutes(Math.trunc(item.hours * 60) % 60);
    }, []);

    return (
        <Center
            w={'full'}
            minH={'92vh'}
            bgColor={'white'}
            position={'relative'}
        >
            <Stack
                w={{ base: '100%', md: '85%' }}
                flexDir={{ base: 'column', md: 'row' }}
                pt={5}
            >
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
                    type={type}
                    selected={selected}
                    resetForm={resetForm}
                    minutes={minutes}
                    setMinutes={setMinutes}
                    setSelected={setSelected}
                    setType={setType}
                />
                <TableComponent
                    selected={selected}
                    resetForm={resetForm}
                    fillForm={fillForm}
                    setSelected={setSelected}
                    setType={setType}
                />
            </Stack>
        </Center>
    );
};

export default App;
