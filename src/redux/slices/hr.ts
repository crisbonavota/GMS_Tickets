import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import moment from "moment";
import { ChildCreation, Sort, MaritalStatus } from "../../api/types";

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

export interface EmployeePersonalInfoValues {
    fileNumber: number;
    firstName: string;
    lastName: string;
    email: string;
    afipId: string;
    entryDate: string;
    birthDate: string;
    gender: boolean;
    active: boolean;
    mobilePhone: string;
}

export interface EmployeeLocationValues {
    countryId: number;
    birthCountryId: number;
    street: string;
    department: string;
    floor: string;
    number: string;
    city: string;
    postalCode: string;
}
export interface EmployeeFamilyValues {
    children: Array<ChildCreation>;
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
        fileNumber: 0,
        firstName: "",
        lastName: "",
        email: "",
        afipId: "",
        entryDate: "",
        birthDate: "",
        gender: true,
        active: true,
        mobilePhone: "",
    },
    crtEmployeeLocationInfo: {
        countryId: 0,
        birthCountryId: 0,
        street: "",
        department: "",
        floor: "",
        number: "",
        city: "",
        postalCode: "",
    },
    crtEmployeeFamilyInfo: {
        children: [
            {
                birthDate: moment().format("yyyy-MM-DD"),
                name: "",
            },
        ],
        maritalStatus: MaritalStatus[0].toString(),
    },
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
            state[action.payload.module].pagination.totalPages =
                action.payload.value;
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
        employeePersonalInfo: (
            state: HumanResourcesState,
            action: PayloadAction<EmployeePersonalInfoValues>
        ) => {
            state.crtEmployeePersonalInfo = action.payload;
        },
        employeeLocationInfo: (
            state: HumanResourcesState,
            action: PayloadAction<EmployeeLocationValues>
        ) => {
            state.crtEmployeeLocationInfo = action.payload;
        },
        employeeFamilyInfo: (
            state: HumanResourcesState,
            action: PayloadAction<EmployeeFamilyValues>
        ) => {
            state.crtEmployeeFamilyInfo = action.payload;
        },
    },
});

export const {
    changeSort,
    changePage,
    changeTotalPages,
    changeSearch,
    changeFilter,
    employeePersonalInfo,
    employeeLocationInfo,
    employeeFamilyInfo,
} = slice.actions;

export default slice.reducer;
