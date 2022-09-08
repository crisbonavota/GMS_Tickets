import { Sort } from "../../api/types";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface HREmployeesState {
    pagination: {
        currentPage: number;
        totalPages: number | null;
    };
    sort: Sort;
    filters: {
        from: string;
        to: string;
        fullName: string;
        position: number | null;
        afipId: string;
        fileNumber: number | null;
        birthCountry: number | null;
    };
}

const initialState: HREmployeesState = {
    pagination: {
        currentPage: 0,
        totalPages: null,
    },
    sort: {
        field: "legacyUser.fullName",
        isAscending: true,
    },
    filters: {
        from: "",
        to: "",
        fullName: "",
        position: null,
        afipId: "",
        fileNumber: null,
        birthCountry: null,
    },
};

const slice = createSlice({
    name: "hrEmployees",
    initialState,
    reducers: {
        changeSort: (state: HREmployeesState, action: PayloadAction<Sort>) => {
            state.sort = action.payload;
            state.pagination.currentPage = 0;
        },
        changePage: (
            state: HREmployeesState,
            action: PayloadAction<number>
        ) => {
            state.pagination.currentPage = action.payload;
        },
        changeTotalPages: (
            state: HREmployeesState,
            action: PayloadAction<number | null>
        ) => {
            state.pagination.totalPages = action.payload;
        },
        changeFilter: (
            state: HREmployeesState,
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
