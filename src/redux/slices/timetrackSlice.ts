import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import moment, { Moment } from "moment";
import { TimetrackItem } from "../../api/types";
import { hoursToHHMM } from "../../utils/datetime";

const today = moment();
const firstDayOfWeek = today.clone().startOf("isoWeek");
const lastDayOfWeek = today.clone().endOf("isoWeek");
const openAccordionIndexValue = [0, 1, 2, 3, 4, 5, 6];

interface TimetrackState {
    form: {
        date: string;
        project: number | null;
        taskType: number | null;
        task: string;
        hours: number;
        minutes: number;
    };
    table: {
        daily: {
            date: Moment;
        };
        weekly: {
            startDate: Moment;
            endDate: Moment;
            accordion: {
                index: number[];
            };
        };
        custom: {
            startDate: string;
            endDate: string;
            project: number | null;
            page: number;
            totalPages: number | null;
        };
    };
    type: "edit" | "create";
    selectedForEdit: number | null;
}

const initialState: TimetrackState = {
    form: {
        date: today.format("YYYY-MM-DD"),
        project: null,
        taskType: null,
        task: "",
        hours: 0,
        minutes: 0,
    },
    table: {
        daily: {
            date: today,
        },
        weekly: {
            startDate: firstDayOfWeek,
            endDate: lastDayOfWeek,
            accordion: {
                index: openAccordionIndexValue,
            },
        },
        custom: {
            startDate: "",
            endDate: "",
            project: null,
            page: 0,
            totalPages: null,
        },
    },
    type: "create",
    selectedForEdit: null,
};

export const slice = createSlice({
    name: "timetrack",
    initialState,
    reducers: {
        setFormDate: (state: TimetrackState, action: PayloadAction<string>) => {
            state.form.date = action.payload;
        },
        setFormProject: (
            state: TimetrackState,
            action: PayloadAction<number | null>
        ) => {
            state.form.project = action.payload;
        },
        setFormTaskType: (
            state: TimetrackState,
            action: PayloadAction<number | null>
        ) => {
            state.form.taskType = action.payload;
        },
        setFormTask: (state: TimetrackState, action: PayloadAction<string>) => {
            state.form.task = action.payload;
        },
        setFormHours: (
            state: TimetrackState,
            action: PayloadAction<number>
        ) => {
            state.form.hours = action.payload;
        },
        setFormMinutes: (
            state: TimetrackState,
            action: PayloadAction<number>
        ) => {
            state.form.minutes = action.payload;
        },
        clearForm: (state: TimetrackState) => {
            state.form = initialState.form;
        },
        clearFormButDate: (state: TimetrackState) => {
            state.form = {
                ...initialState.form,
                date: state.form.date,
            };
        },
        setForEdit: (
            state: TimetrackState,
            action: PayloadAction<TimetrackItem>
        ) => {
            const hoursMinutes = hoursToHHMM(action.payload.hours);
            state.type = "edit";
            state.selectedForEdit = action.payload.id;
            state.form = {
                date: moment(action.payload.date).format("YYYY-MM-DD"),
                project: action.payload.project.id,
                taskType: action.payload.tasktype.id,
                task: action.payload.task,
                hours: hoursMinutes.hours,
                minutes: hoursMinutes.minutes,
            };
        },
        fillForm: (
            state: TimetrackState,
            action: PayloadAction<TimetrackItem>
        ) => {
            const hoursMinutes = hoursToHHMM(action.payload.hours);
            state.form = {
                date: moment(action.payload.date).format("YYYY-MM-DD"),
                project: action.payload.project.id,
                taskType: action.payload.tasktype.id,
                task: action.payload.task,
                hours: hoursMinutes.hours,
                minutes: hoursMinutes.minutes,
            };
        },
        clearSelectedForEdit: (state: TimetrackState) => {
            state.selectedForEdit = null;
            state.type = "create";
        },
        setTableDailyDate: (
            state: TimetrackState,
            action: PayloadAction<Moment>
        ) => {
            state.table.daily.date = action.payload;
        },
        setTableWeeklyDate: (
            state: TimetrackState,
            action: PayloadAction<{
                startDate: Moment;
                endDate: Moment;
            }>
        ) => {
            state.table.weekly = { ...state.table.weekly, ...action.payload };
        },
        setTableWeeklyDateFromDate: (
            state: TimetrackState,
            action: PayloadAction<Moment>
        ) => {
            state.table.weekly.startDate = action.payload
                .clone()
                .startOf("isoWeek");
            state.table.weekly.endDate = action.payload
                .clone()
                .endOf("isoWeek");
        },
        setWeeklyAccordionIndex: (
            state: TimetrackState,
            action: PayloadAction<number[]>
        ) => {
            state.table.weekly.accordion.index = action.payload;
        },
        openWeeklyAccordion: (state: TimetrackState) => {
            state.table.weekly.accordion.index = openAccordionIndexValue;
        },
        closeWeeklyAccordion: (state: TimetrackState) => {
            state.table.weekly.accordion.index = [];
        },
        clearCustomFilters: (state: TimetrackState) => {
            state.table.custom = initialState.table.custom;
        },
        setCustomFiltersPage: (
            state: TimetrackState,
            action: PayloadAction<number>
        ) => {
            state.table.custom.page = action.payload;
        },
        setCustomFiltersTotalPages: (
            state: TimetrackState,
            action: PayloadAction<number | null>
        ) => {
            state.table.custom.totalPages = action.payload;
        },
        setCustomFiltersProject: (
            state: TimetrackState,
            action: PayloadAction<number | null>
        ) => {
            state.table.custom.project = action.payload;
            state.table.custom.page = 0;
        },
        setCustomFiltersStartDate: (
            state: TimetrackState,
            action: PayloadAction<string>
        ) => {
            state.table.custom.startDate = action.payload;
            state.table.custom.page = 0;
        },
        setCustomFiltersEndDate: (
            state: TimetrackState,
            action: PayloadAction<string>
        ) => {
            state.table.custom.endDate = action.payload;
            state.table.custom.page = 0;
        },
    },
});

export const {
    setFormDate,
    setFormProject,
    setFormTaskType,
    setFormTask,
    setFormHours,
    setFormMinutes,
    clearForm,
    clearFormButDate,
    setForEdit,
    fillForm,
    clearSelectedForEdit,
    setTableWeeklyDate,
    setTableDailyDate,
    setWeeklyAccordionIndex,
    openWeeklyAccordion,
    closeWeeklyAccordion,
    setTableWeeklyDateFromDate,
    clearCustomFilters,
    setCustomFiltersPage,
    setCustomFiltersProject,
    setCustomFiltersStartDate,
    setCustomFiltersEndDate,
    setCustomFiltersTotalPages,
} = slice.actions;

export default slice.reducer;
