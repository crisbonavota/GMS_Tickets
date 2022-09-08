import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Sort } from "../../api/types";

interface HrUpdatesState {
    pagination: {
        currentPage: number;
        totalPages: number | null;
    };
    filters: {
        userType: "employee" | "provider";
        month: number;
        year: number;
        updateTypeId: number | null;
        legacyUserId: number | null;
    };
    sort: Sort;
}

const initialState: HrUpdatesState = {
    pagination: {
        currentPage: 0,
        totalPages: null,
    },
    filters: {
        userType: "employee",
        month: new Date().getMonth(),
        year: new Date().getFullYear(),
        updateTypeId: null,
        legacyUserId: null,
    },
    sort: {
        field: "date",
        isAscending: false,
    },
};

const slice = createSlice({
    name: "hrUpdates",
    initialState,
    reducers: {
        changeSort: (state: HrUpdatesState, action: PayloadAction<Sort>) => {
            state.sort = action.payload;
            state.pagination.currentPage = 0;
        },
        changePage: (state: HrUpdatesState, action: PayloadAction<number>) => {
            state.pagination.currentPage = action.payload;
        },
        changeTotalPages: (
            state: HrUpdatesState,
            action: PayloadAction<number | null>
        ) => {
            state.pagination.totalPages = action.payload;
        },
        changeFilter: (
            state: HrUpdatesState,
            action: PayloadAction<{ key: string; value: any }>
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
