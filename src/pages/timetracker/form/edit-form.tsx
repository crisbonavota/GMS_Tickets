import {
    VStack,
    HStack,
    Divider,
    SimpleGrid,
    GridItem,
    Button,
    Text,
} from "@chakra-ui/react";
import DateInput from "./date-input";
import { useMemo } from "react";
import ProjectDropdown from "./project-dropdown";
import TaskTypeDropdown from "./task-type-dropdown";
import TaskInput from "./task-input";
import HoursInput from "./hours-input";
import { useMutation, useQueryClient } from "react-query";
import { useAuthHeader } from "react-auth-kit";
import { useToast } from "@chakra-ui/react";
import moment from "moment";
import { putResource } from "../../../api/api";
import { useAppSelector, useAppDispatch } from "../../../redux/hooks";
import {
    clearForm,
    clearSelectedForEdit,
    setTableDailyDate,
    setTableWeeklyDateFromDate,
} from "../../../redux/slices/timetrackSlice";

const EditForm = () => {
    const selectedForEdit = useAppSelector(
        (state) => state.timetrack.selectedForEdit
    );
    // This will never happen because this component isn't rendered unless selectedForEdit is set (see parent component)
    if (!selectedForEdit) return <></>;

    const dispatch = useAppDispatch();
    const toast = useToast();
    const queryClient = useQueryClient();
    const getAuthHeader = useAuthHeader();
    const formValues = useAppSelector((state) => state.timetrack.form);
    const isSubmitAllowed = useMemo(
        () =>
            formValues.date === "" ||
            !formValues.project ||
            !formValues.taskType ||
            formValues.task === "" ||
            (!formValues.hours && !formValues.minutes),
        [formValues]
    );

    const { isLoading, mutateAsync } = useMutation(
        () =>
            putResource("timetrack", selectedForEdit, getAuthHeader(), {
                date: formValues.date,
                hours: (formValues.hours + formValues.minutes / 60).toFixed(2),
                taskTypeId: formValues.taskType,
                task: formValues.task,
                projectId: formValues.project,
            }),
        {
            onSuccess: () => {
                toast({
                    title: "Entry edited",
                    status: "success",
                    position: "top",
                    duration: 2000,
                });

                dispatch({ type: clearForm });
                dispatch({ type: clearSelectedForEdit });
                dispatch({
                    type: setTableDailyDate,
                    payload: moment(formValues.date),
                });
                dispatch({
                    type: setTableWeeklyDateFromDate,
                    payload: moment(formValues.date),
                });

                queryClient.resetQueries("owned-daily");
                queryClient.resetQueries("owned-weekly");
                queryClient.resetQueries("owned-custom");
            },
            onError: (err: any) => {
                toast({
                    title: "Error editing the entry, try again later",
                    description: err.message || err,
                    status: "error",
                    position: "top",
                    duration: 2000,
                });
            },
        }
    );

    return (
        <VStack
            w={{ base: "100%", md: "50%" }}
            p={{ base: 5, md: 0 }}
            me={{ base: 0, md: 10 }}
            spacing={5}
            z-index={100}
        >
            <HStack w={"full"} alignItems={"center"}>
                <Text fontSize={"xl"} whiteSpace={"nowrap"}>
                    Edit entry
                </Text>
                <Divider borderColor={"orangered"} />
            </HStack>
            <SimpleGrid w={"full"} columns={2} spacing={5}>
                <GridItem colSpan={1}>
                    <DateInput />
                </GridItem>
                <GridItem colSpan={1}>
                    <ProjectDropdown />
                </GridItem>
                <GridItem colSpan={1}>
                    <TaskTypeDropdown />
                </GridItem>
                <GridItem colSpan={1}>
                    <TaskInput />
                </GridItem>
                <GridItem colSpan={1}>
                    <HoursInput />
                </GridItem>
                <GridItem colSpan={2}>
                    <Button
                        w={"full"}
                        colorScheme={"orange"}
                        disabled={isSubmitAllowed || isLoading}
                        isLoading={isLoading}
                        onClick={() => mutateAsync()}
                    >
                        SAVE
                    </Button>
                </GridItem>
            </SimpleGrid>
        </VStack>
    );
};

export default EditForm;
