import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import moment from "moment";
import { Sort } from "../../api/types";
import { exportModuleCheckBoxOptions } from "../../api/api";

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
        columns: { [key: string]: boolean };
    };
    sort: Sort;
}

const getColumns = () => {
    let newObject: { [key: string]: boolean } = {};
    exportModuleCheckBoxOptions.forEach((el) => (newObject[el] = true));
    return newObject;
};

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
        columns: getColumns(),
    },
};

const slice = createSlice({
    name: "ttReports",
    initialState,
    reducers: {
        changeSort: (state: TTReportsState, action: PayloadAction<Sort>) => {
            state.sort = action.payload;
            state.pagination.currentPage = 0;
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
            action: PayloadAction<{ key: string; value: any }>
        ) => {
            // @ts-ignore
            state.filters[action.payload.key] = action.payload.value;
            state.pagination.currentPage = 0;
        },
        checkAllColumns: (state: TTReportsState) => {
            state.filters.columns = initialState.filters.columns;
        },
    },
});

export const { changePage, changeTotalPages, changeFilter, changeSort, checkAllColumns } =
    slice.actions;

export default slice.reducer;
