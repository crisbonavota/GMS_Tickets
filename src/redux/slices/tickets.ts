import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Sort } from "../../api/types";

interface TicketsState {
  pagination: {
    currentPage: number;
    totalPages: number | null;
  };
  sort: Sort;
  search: string;
  filters: {
    name: string | null;
  };
}

const initialState: TicketsState = {
  pagination: {
    currentPage: 0,
    totalPages: null,
  },
  sort: {
    field: "id",
    isAscending: false,
  },
  search: "",
  filters: {
    name: "",
  },
};

const slice = createSlice({
  name: "tickets",
  initialState,
  reducers: {
    changeSort: (state: TicketsState, action: PayloadAction<Sort>) => {
      state.sort = action.payload;
      state.pagination.currentPage = 0;
    },
    changePage: (state: TicketsState, action: PayloadAction<number>) => {
      state.pagination.currentPage = action.payload;
    },
    changeTotalPages: (
      state: TicketsState,
      action: PayloadAction<number | null>
    ) => {
      state.pagination.totalPages = action.payload;
    },
    changeFilter: (
      state: TicketsState,
      action: PayloadAction<{ key: string; value: number | null }>
    ) => {
      // @ts-ignore
      state.filters[action.payload.key] = action.payload.value;
      state.pagination.currentPage = 0;
    },
    changeSearch: (state: TicketsState, action: PayloadAction<string>) => {
      state.search = action.payload;
      state.pagination.currentPage = 0;
    },
  },
});

export const {
  changePage,
  changeTotalPages,
  changeFilter,
  changeSort,
  changeSearch,
} = slice.actions;

export default slice.reducer;
