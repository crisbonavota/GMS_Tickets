import { Sort } from '@gms-micro/api-filters';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface BasicModuleProps<Filter> {
    pagination: {
        currentPage: number;
        totalPages: number | null;
    };
    sort: Sort;
    search: string;
    filters: Filter;
}

interface ClientsFilters {
    country: number | null;
    active: boolean;
}

interface AccountsFilters {
    country: number | null;
    active: boolean;
    client: number | null;
}

interface JobsFilters {
    account: number | null;
    client: number | null;
    type: {
        project: boolean;
        proposal: boolean;
    };
}

interface ProjectManagementState {
    clients: BasicModuleProps<ClientsFilters>;
    accounts: BasicModuleProps<AccountsFilters>;
    jobs: BasicModuleProps<JobsFilters>;
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
            field: 'creationDate',
            isAscending: false,
        },
        search: '',
        filters: {
            country: null,
            active: true,
            client: null,
        },
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
        filters: {
            account: null,
            client: null,
            type: {
                project: true,
                proposal: true,
            },
        },
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
