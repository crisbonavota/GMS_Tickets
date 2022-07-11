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

interface ProjectManagementState {
    clients: BasicModuleProps;
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

interface Action {
    module: 'clients';
    value: any;
}

const slice = createSlice({
    name: 'projectManagement',
    initialState: initialState,
    reducers: {
        changeSort: (
            state: ProjectManagementState,
            action: PayloadAction<Action>
        ) => {
            state[action.payload.module].sort = action.payload.value;
        },
        changePage: (
            state: ProjectManagementState,
            action: PayloadAction<Action>
        ) => {
            state[action.payload.module].pagination.currentPage =
                action.payload.value;
        },
        changeTotalPages: (
            state: ProjectManagementState,
            action: PayloadAction<Action>
        ) => {
            state[action.payload.module].pagination.totalPages =
                action.payload.value;
        },
        changeSearch: (
            state: ProjectManagementState,
            action: PayloadAction<Action>
        ) => {
            state[action.payload.module].search = action.payload.value;
        },
    },
});

export const { changeSort, changePage, changeTotalPages, changeSearch } =
    slice.actions;

export default slice.reducer;
