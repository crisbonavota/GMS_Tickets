import axios from "axios";
import {
    FilterItem,
    CustomFilter,
    Sort,
    KeyValuePair,
    Currency,
    PatchDocumentItem,
    MedicalCoverage,
} from "./types";
import {
    insertStandardFilters,
    insertCustomFilters,
    insertSort,
    insertPagination,
} from "./utils";

export const client = axios.create({
    baseURL: import.meta.env["VITE_API_URL"],
});

export const getResource = async <T>(resource: string, authHeader: string) => {
    return await client.get<T>(resource, {
        headers: { Authorization: authHeader },
    });
};

export const getResourceList = async <T>(
    resource: string,
    authHeader: string
) => {
    return await client.get<Array<T>>(resource, {
        headers: { Authorization: authHeader },
        params: {
            "range.Start": 0,
            "range.End": 10000,
        },
    });
};

export const getResourceListFilteredAndPaginated = async <T>(
    resource: string,
    authHeader: string,
    standardFilters?: FilterItem[],
    customFilters?: CustomFilter[],
    sort?: Sort,
    currentPage?: number,
    perPage?: number
) => {
    let params: { [key: string]: string } = {};
    standardFilters && insertStandardFilters(params, standardFilters);
    customFilters && insertCustomFilters(params, customFilters);
    sort && insertSort(params, sort);
    insertPagination(params, currentPage, perPage);
    return await client.get<Array<T>>(`/${resource}`, {
        headers: { Authorization: authHeader },
        params,
    });
};

export const getReportFiltered = async (
    resource: string,
    authHeader: string,
    standardFilters?: FilterItem[],
    customFilters?: CustomFilter[],
    sort?: Sort
) => {
    let params: { [key: string]: string } = {};
    standardFilters && insertStandardFilters(params, standardFilters);
    customFilters && insertCustomFilters(params, customFilters);
    sort && insertSort(params, sort);
    return await client.get<string>(`/${resource}`, {
        headers: { Authorization: authHeader },
        params,
    });
};

export const patchResource = async (
    resource: string,
    id: number,
    authHeader: string,
    initialValues: KeyValuePair,
    newValues: KeyValuePair
) => {
    let patchItems: KeyValuePair = {};
    // Entry is an object where entry [0] is the key and [1] the value
    // We iterate through the object and check if the initial value is different from the new value (initivalValue[key] !== newValue)
    // If it's different, we add it to updatedValues
    Object.entries(newValues).forEach(
        (entry) =>
            entry[1] !== initialValues[entry[0]] &&
            (patchItems[entry[0]] = entry[1])
    );

    const patchDocument = Object.keys(patchItems).map((key) =>
        keyValueToPatchDocumentItem(key, patchItems[key])
    );
    return await client.patch(`/${resource}/${id}`, patchDocument, {
        headers: { Authorization: authHeader },
    });
};

export const deleteResource = async (
    resource: string,
    id: number,
    authHeader: string
) => {
    return await client.delete(`/${resource}/${id}`, {
        headers: { Authorization: authHeader },
    });
};

export const postResource = async (
    resource: string,
    authHeader: string,
    data: KeyValuePair | KeyValuePair[]
) => {
    return await client.post(`/${resource}`, data, {
        headers: { Authorization: authHeader },
    });
};

export const putResource = async (
    resource: string,
    id: number,
    authHeader: string,
    data: KeyValuePair
) => {
    return await client.put(`/${resource}/${id}`, data, {
        headers: { Authorization: authHeader },
    });
};

export const updateTypesIds = {
    basicUpdateTypes: [15, 19],
    periodUpdateTypes: [
        1, 3, 4, 5, 6, 7, 8, 9, 10, 11, 13, 23, 24, 25, 26, 27, 28, 29,
    ],
    dateChangeUpdateTypes: [17, 18],
    monetaryUpdateTypes: [12, 14, 20, 21, 22],
    resignationUpdateTypes: [16],
    workAccidentUpdateTypes: [2],
    structureUpdateTypes: [30],
};

export const getUpdateResourceFromType = (updateType: number) => {
    if (updateTypesIds.periodUpdateTypes.includes(updateType))
        return "updates/period";
    if (updateTypesIds.basicUpdateTypes.includes(updateType))
        return "updates/basic";
    if (updateTypesIds.dateChangeUpdateTypes.includes(updateType))
        return "updates/date-change";
    if (updateTypesIds.monetaryUpdateTypes.includes(updateType))
        return "updates/monetary";
    if (updateTypesIds.resignationUpdateTypes.includes(updateType))
        return "updates/resignation";
    if (updateTypesIds.workAccidentUpdateTypes.includes(updateType))
        return "updates/work-accident";
    if (updateTypesIds.structureUpdateTypes.includes(updateType)) {
        return "updates/structure";
    }
    return "updates/unknown";
};

export const getGenders = () => {
    return [
        {
            value: false,
            label: "Female",
        },
        {
            value: true,
            label: "Male",
        },
    ];
};

export const getStatus = () => {
    return [
        {
            value: false,
            label: "Inactive",
        },
        {
            value: true,
            label: "Active",
        },
    ];
};

export const getMedicalCoverages: () => MedicalCoverage[] = () => {
    return [
        {
            id: 1,
            name: "OSDE(Con Pool)",
        },
        {
            id: 2,
            name: "OSDE(Sin Pool)",
        },
        {
            id: 3,
            name: "Galeno",
        },
        {
            id: 4,
            name: "Particular",
        },
        {
            id: 5,
            name: "Osecac",
        },
    ];
};

export const getCurrencies: () => Currency[] = () => {
    return [
        {
            id: 1,
            code: "ARS",
        },
        {
            id: 2,
            code: "BRL",
        },
        {
            id: 3,
            code: "EUR",
        },
        {
            id: 4,
            code: "USD",
        },
        {
            id: 5,
            code: "MXN",
        },
    ];
};

export const getProjectStatus = () => {
    return [
        { label: "Opportunity", value: 1 },
        { label: "In process", value: 2 },
        { label: "Approved", value: 3 },
        { label: "Presented", value: 4 },
        { label: "On hold", value: 5 },
        { label: "Cancelled", value: 6 },
        { label: "Finished", value: 7 },
        { label: "Rejected", value: 8 },
    ];
};

export const getContractTypes = () => {
    return [
        { label: "Project", value: 1 },
        { label: "BAU", value: 2 },
        { label: "Staffing", value: 3 },
    ];
};

const keyValueToPatchDocumentItem = (
    key: string,
    value: any
): PatchDocumentItem => {
    return {
        op: "replace",
        path: `/${key}`,
        value: value,
    };
};
