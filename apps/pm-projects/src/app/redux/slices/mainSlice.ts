import { Sort } from '@gms-micro/api-filters';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface BasicModuleProps {
    pagination: {
        currentPage: number;
        totalPages: number | null;
    };
    sort: Sort;
    search: string;
}

interface ClientsState extends BasicModuleProps {
    filters: {
        country: number | null;
        active: boolean;
    };
}

interface ProjectManagementState {
    clients: ClientsState;
    accounts: BasicModuleProps;
    jobs: BasicModuleProps;
}

const initialState: ProjectManagementState = {
    clients: {
        pagination: {
            currentPage: 0,
            totalPages: null,
        },
        sort: {
            field: 'creationDate',
            isAscending: false,
        },
        search: '',
        filters: {
            country: null,
            active: true,
        },
    },
    accounts: {
        pagination: {
            currentPage: 0,
            totalPages: null,
        },
        sort: {
            field: 'company.name',
            isAscending: true,
        },
        search: '',
    },
    jobs: {
        pagination: {
            currentPage: 0,
            totalPages: null,
        },
        sort: {
            field: 'creationDate',
            isAscending: false,
        },
        search: '',
    },
};

interface Action<T> {
    module: 'clients';
    value: T;
}

const slice = createSlice({
    name: 'projectManagement',
    initialState: initialState,
    reducers: {
        changeSort: (
            state: ProjectManagementState,
            action: PayloadAction<Action<Sort>>
        ) => {
            state[action.payload.module].sort = action.payload.value;
        },
        changePage: (
            state: ProjectManagementState,
            action: PayloadAction<Action<number>>
        ) => {
            state[action.payload.module].pagination.currentPage =
                action.payload.value;
        },
        changeTotalPages: (
            state: ProjectManagementState,
            action: PayloadAction<Action<number | null>>
        ) => {
            state[action.payload.module].pagination.totalPages =
                action.payload.value;
        },
        changeSearch: (
            state: ProjectManagementState,
            action: PayloadAction<Action<string>>
        ) => {
            state[action.payload.module].search = action.payload.value;
        },
        changeFilter: (
            state: ProjectManagementState,
            action: PayloadAction<Action<{ key: string; value: number | null }>>
        ) => {
            // @ts-ignore
            state[action.payload.module].filters[action.payload.value.key] =
                action.payload.value.value;
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
