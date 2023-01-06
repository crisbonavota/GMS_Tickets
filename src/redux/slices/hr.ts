import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Sort } from "../../api/types";

interface BasicModuleProps<Filter> {
  pagination: {
    currentPage: number;
    totalPages: number | null;
  };
  sort: Sort;
  search: string;
  filters: Filter;
}

interface EmployeesFilter {
    active: boolean;
    businessUnit: number | null;
}

interface ProvidersFilter {
    active: boolean;
    businessUnit: number | null;
}

interface BusinessUnitsFilter {
  active: boolean;
}

interface EmployeePersonalInfoValues {
  firstName: string;
  lastName: string;
  email: string;
  afipId: string;
  entryDate: string;
  birthDate: string;
  gender: boolean;
  active: boolean;
}

interface EmployeeLocationValues {
  countryId: number;
  birthCountryId: number;
  address: string;
  city: string;
}
interface EmployeeFamilyValues {
  childs: string;
  maritalStatus: string;
}


interface HumanResourcesState {
  employees: BasicModuleProps<EmployeesFilter>;
  providers: BasicModuleProps<ProvidersFilter>;
  businessUnits: BasicModuleProps<BusinessUnitsFilter>;
  crtEmployeePersonalInfo: EmployeePersonalInfoValues;
  crtEmployeeLocationInfo: EmployeeLocationValues;
  crtEmployeeFamilyInfo: EmployeeFamilyValues;
}

const initialState: HumanResourcesState = {
    employees: {
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
    },
    providers: {
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
    },
    businessUnits: {
        pagination: {
            currentPage: 0,
            totalPages: null,
        },
        sort: {
            field: "name",
            isAscending: true,
        },
        search: "",
        filters: {
            active: true,
        },
    },
  crtEmployeePersonalInfo: {
    firstName: "",
    lastName: "",
    email: "",
    afipId: "",
    entryDate: "",
    birthDate: "",
    gender: true,
    active: true,
  },
  crtEmployeeLocationInfo: {
    countryId: 0,
    birthCountryId: 0,
    address: "",
    city: "",
  },
  crtEmployeeFamilyInfo: {
    childs: "",
    maritalStatus: "",
  }
};

interface Action<T> {
  module: "employees" | "providers" | "businessUnits";
  value: T;
}

const slice = createSlice({
  name: "humanResources",
  initialState: initialState,
  reducers: {
    changeSort: (
      state: HumanResourcesState,
      action: PayloadAction<Action<Sort>>
    ) => {
      state[action.payload.module].sort = action.payload.value;
      state[action.payload.module].pagination.currentPage = 0;
    },
    changePage: (
      state: HumanResourcesState,
      action: PayloadAction<Action<number>>
    ) => {
      state[action.payload.module].pagination.currentPage =
        action.payload.value;
    },
    changeTotalPages: (
      state: HumanResourcesState,
      action: PayloadAction<Action<number | null>>
    ) => {
      state[action.payload.module].pagination.totalPages = action.payload.value;
    },
    changeSearch: (
      state: HumanResourcesState,
      action: PayloadAction<Action<string>>
    ) => {
      state[action.payload.module].search = action.payload.value;
      state[action.payload.module].pagination.currentPage = 0;
    },
    changeFilter: (
      state: HumanResourcesState,
      action: PayloadAction<Action<{ key: string; value: number | null }>>
    ) => {
      // @ts-ignore
      state[action.payload.module].filters[action.payload.value.key] =
        action.payload.value.value;
      state[action.payload.module].pagination.currentPage = 0;
    },
    EmployeePersonalInfo: (
      state: HumanResourcesState,
      action: PayloadAction<EmployeePersonalInfoValues>
    ) => {
      state.crtEmployeePersonalInfo = action.payload;
    },
    EmployeeLocationInfo: (
      state: HumanResourcesState,
      action: PayloadAction<EmployeeLocationValues>
    ) => {
      state.crtEmployeeLocationInfo = action.payload;
    },
    EmployeeFamilyInfo: (
      state: HumanResourcesState,
      action: PayloadAction<EmployeeFamilyValues>
    ) => {
      state.crtEmployeeFamilyInfo = action.payload;
    }
  },
});

export const {
  changeSort,
  changePage,
  changeTotalPages,
  changeSearch,
  changeFilter,
  EmployeePersonalInfo,
  EmployeeLocationInfo,
  EmployeeFamilyInfo
} = slice.actions;

export default slice.reducer;
