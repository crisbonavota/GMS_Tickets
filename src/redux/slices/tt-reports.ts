import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import moment from "moment";
import { Sort } from "../../api/types";

interface TTReportsState {
    pagination: {
        currentPage: number;
        totalPages: number | null;
    };
    filters: {
        from: string;
        to: string;
        legacyUsers: number[];
        businessUnits: number[];
        projects: number[];
        accounts: number[];
        generalSearch: string;
        borrowed: boolean;
    };
    sort: Sort;
}

const initialState: TTReportsState = {
    pagination: {
        currentPage: 0,
        totalPages: null,
    },
    sort: {
        field: "date",
        isAscending: false,
    },
    filters: {
        from: moment().add(-1, "month").startOf("month").format("YYYY-MM-DD"),
        to: "",
        legacyUsers: [],
        businessUnits: [],
        projects: [],
        accounts: [],
        generalSearch: "",
        borrowed: false,
    },
};

const slice = createSlice({
    name: "ttReports",
    initialState,
    reducers: {
        changeSort: (state: TTReportsState, action: PayloadAction<Sort>) => {
            state.sort = action.payload;
        },
        changePage: (state: TTReportsState, action: PayloadAction<number>) => {
            state.pagination.currentPage = action.payload;
        },
        changeTotalPages: (
            state: TTReportsState,
            action: PayloadAction<number | null>
        ) => {
            state.pagination.totalPages = action.payload;
        },
        changeFilter: (
            state: TTReportsState,
            action: PayloadAction<{ key: string; value: number | null }>
        ) => {
            // @ts-ignore
            state.filters[action.payload.key] = action.payload.value;
        },
    },
});

export const { changePage, changeTotalPages, changeFilter, changeSort } =
    slice.actions;

export default slice.reducer;
