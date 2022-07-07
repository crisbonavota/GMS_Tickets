import { Sort } from '@gms-micro/api-filters';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface BasicModuleProps {
    pagination: {
        currentPage: number;
        totalPages: number | null;
    };
    sort: Sort;
}

interface ProjectManagementState {
    clients: BasicModuleProps;
    accounts: BasicModuleProps;
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
    },
});

export const { changeSort, changePage, changeTotalPages } = slice.actions;

export default slice.reducer;
