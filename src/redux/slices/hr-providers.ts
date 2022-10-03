import { Sort } from "../../api/types";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface HRProvidersState {
    pagination: {
        currentPage: number;
        totalPages: number | null;
    };
    sort: Sort;
    filters: {
        fullName: string;
        fileNumber: number | null;
    };
}

const initialState: HRProvidersState = {
    pagination: {
        currentPage: 0,
        totalPages: null,
    },
    sort: {
        field: "legacyUser.fullName",
        isAscending: true,
    },
    filters: {
        fullName: "",
        fileNumber: null,
    },
};

const slice = createSlice({
    name: "hrProviders",
    initialState,
    reducers: {
        changeSort: (state: HRProvidersState, action: PayloadAction<Sort>) => {
            state.sort = action.payload;
            state.pagination.currentPage = 0;
        },
        changePage: (
            state: HRProvidersState,
            action: PayloadAction<number>
        ) => {
            state.pagination.currentPage = action.payload;
        },
        changeTotalPages: (
            state: HRProvidersState,
            action: PayloadAction<number | null>
        ) => {
            state.pagination.totalPages = action.payload;
        },
        changeFilter: (
            state: HRProvidersState,
            action: PayloadAction<{ key: string; value: number | null }>
        ) => {
            // @ts-ignore
            state.filters[action.payload.key] = action.payload.value;
            state.pagination.currentPage = 0;
        },
    },
});

export const { changeSort, changePage, changeTotalPages, changeFilter } =
    slice.actions;

export default slice.reducer;
