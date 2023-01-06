import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Sort } from "../../api/types";

interface BasicModuleProps<Filter> {
    pagination: {
        currentPage: number;
        totalPages: number | null;
    };
    sort: Sort;
    search: string;
    filters: Filter;
}

interface EmployeesFilter {
    active: boolean;
    businessUnit: number | null;
}

interface ProvidersFilter {
    active: boolean;
    businessUnit: number | null;
}

interface BusinessUnitsFilter {
    active: boolean;
}

interface HumanResourcesState {
    employees: BasicModuleProps<EmployeesFilter>;
    providers: BasicModuleProps<ProvidersFilter>;
    businessUnits: BasicModuleProps<BusinessUnitsFilter>;
}

const initialState: HumanResourcesState = {
    employees: {
        pagination: {
            currentPage: 0,
            totalPages: null,
        },
        sort: {
            field: "fileNumber",
            isAscending: false,
        },
        search: "",
        filters: {
            active: true,
            businessUnit: null,
        },
    },
    providers: {
        pagination: {
            currentPage: 0,
            totalPages: null,
        },
        sort: {
            field: "fileNumber",
            isAscending: false,
        },
        search: "",
        filters: {
            active: true,
            businessUnit: null,
        },
    },
    businessUnits: {
        pagination: {
            currentPage: 0,
            totalPages: null,
        },
        sort: {
            field: "name",
            isAscending: true,
        },
        search: "",
        filters: {
            active: true,
        },
    },
};

interface Action<T> {
    module: "employees" | "providers" | "businessUnits";
    value: T;
}

const slice = createSlice({
    name: "humanResources",
    initialState: initialState,
    reducers: {
        changeSort: (
            state: HumanResourcesState,
            action: PayloadAction<Action<Sort>>
        ) => {
            state[action.payload.module].sort = action.payload.value;
            state[action.payload.module].pagination.currentPage = 0;
        },
        changePage: (
            state: HumanResourcesState,
            action: PayloadAction<Action<number>>
        ) => {
            state[action.payload.module].pagination.currentPage =
                action.payload.value;
        },
        changeTotalPages: (
            state: HumanResourcesState,
            action: PayloadAction<Action<number | null>>
        ) => {
            state[action.payload.module].pagination.totalPages =
                action.payload.value;
        },
        changeSearch: (
            state: HumanResourcesState,
            action: PayloadAction<Action<string>>
        ) => {
            state[action.payload.module].search = action.payload.value;
            state[action.payload.module].pagination.currentPage = 0;
        },
        changeFilter: (
            state: HumanResourcesState,
            action: PayloadAction<Action<{ key: string; value: number | null }>>
        ) => {
            // @ts-ignore
            state[action.payload.module].filters[action.payload.value.key] =
                action.payload.value.value;
            state[action.payload.module].pagination.currentPage = 0;
        },
    },
});

export const {
    changeSort,
    changePage,
    changeTotalPages,
    changeSearch,
    changeFilter,
} = slice.actions;

export default slice.reducer;
