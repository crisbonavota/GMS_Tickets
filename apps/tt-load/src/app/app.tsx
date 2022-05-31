import { Center, Stack } from '@chakra-ui/react';
import { TimetrackItem } from '@gms-micro/api-utils';
import moment from 'moment';
import { useState, useCallback } from 'react';
import CreateEditForm from './create-edit-form/create-edit-form';
import TableComponent from './table/table';

const App = () => {
    const [dateInput, setDateInput] = useState(moment().format('YYYY-MM-DD'));
    const [hoursInput, setHoursInput] = useState<number>(0);
    const [minutesInput, setMinutesInput] = useState<number>(0);
    const [taskTypeInput, setTaskTypeInput] = useState<number>();
    const [taskInput, setTaskInput] = useState('');
    const [projectInput, setProjectInput] = useState<number>();
    const [formType, setFormType] = useState<'create' | 'edit'>('create');
    const [selectedForEdit, setSelectedForEdit] = useState<number | null>(null);

    // Used for avoiding having the dates shift at this level from the table components while
    // being able to change the date of the table
    const [dateShiftTrigger, setDateShiftTrigger] = useState<number | null>(
        null
    );

    const resetForm = useCallback(() => {
        setProjectInput(undefined);
        setTaskInput('');
        setTaskTypeInput(undefined);
        setDateInput(moment().format('YYYY-MM-DD'));
        setHoursInput(0);
    }, []);

    const fillForm = useCallback((item: TimetrackItem) => {
        setDateInput(moment(item.date).format('YYYY-MM-DD'));
        setProjectInput(item.project.id);
        setTaskInput(item.task);
        setTaskTypeInput(item.tasktype.id);
        setHoursInput(Math.trunc(item.hours));
        setMinutesInput(Math.trunc(item.hours * 60) % 60);
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
                    date={dateInput}
                    hours={hoursInput}
                    taskType={taskTypeInput}
                    task={taskInput}
                    project={projectInput}
                    setDate={setDateInput}
                    setHours={setHoursInput}
                    setTaskType={setTaskTypeInput}
                    setTask={setTaskInput}
                    setProject={setProjectInput}
                    type={formType}
                    selected={selectedForEdit}
                    resetForm={resetForm}
                    minutes={minutesInput}
                    setMinutes={setMinutesInput}
                    setSelected={setSelectedForEdit}
                    setType={setFormType}
                    setDateShiftTrigger={setDateShiftTrigger}
                />
                <TableComponent
                    selected={selectedForEdit}
                    resetForm={resetForm}
                    fillForm={fillForm}
                    setSelected={setSelectedForEdit}
                    setType={setFormType}
                    dateShiftTrigger={dateShiftTrigger}
                    setDateShiftTrigger={setDateShiftTrigger}
                />
            </Stack>
        </Center>
    );
};

export default App;
