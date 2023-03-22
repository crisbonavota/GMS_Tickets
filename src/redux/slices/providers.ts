import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Sort } from "../../api/types";

interface ProvidersState {
    pagination: {
        currentPage: number;
        totalPages: number | null;
    };
    sort: Sort;
    search: string;
    filters: {
        active: boolean,
        businessUnit: number | null,
    };
}

const initialState: ProvidersState = {
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
};

const slice = createSlice({
    name: "providers",
    initialState,
    reducers: {
        changeSort: (state: ProvidersState, action: PayloadAction<Sort>) => {
            state.sort = action.payload;
            state.pagination.currentPage = 0;
        },
        changePage: (state: ProvidersState, action: PayloadAction<number>) => {
            state.pagination.currentPage = action.payload;
        },
        changeTotalPages: (
            state: ProvidersState,
            action: PayloadAction<number | null>
        ) => {
            state.pagination.totalPages = action.payload;
        },
        changeFilter: (
            state: ProvidersState,
            action: PayloadAction<{ key: string; value: number | null }>
        ) => {
            // @ts-ignore
            state.filters[action.payload.key] = action.payload.value;
            state.pagination.currentPage = 0;
        },
        changeSearch: (
            state: ProvidersState,
            action: PayloadAction<string>
        ) => {
            state.search = action.payload;
            state.pagination.currentPage = 0;
        },
    },
});

export const { changePage, changeTotalPages, changeFilter, changeSort, changeSearch } =
    slice.actions;

export default slice.reducer;