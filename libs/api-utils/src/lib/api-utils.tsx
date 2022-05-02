import axios from 'axios';
import { CustomFilter, FilterItem, insertCustomFilters, insertPagination, insertSort, insertStandardFilters, Sort } from '@gms-micro/api-filters';
import { PatchDocumentItem, KeyValuePair } from './api-types';

const client = axios.create({ baseURL: process.env['NX_API_URL'] });

export const getResourceList = async <T,>(resource: string, authHeader: string) => {
    return await client.get<Array<T>>(resource, { headers: { Authorization: authHeader } });
}

export const getResourceListFilteredAndPaginated = async <T,>(
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
    return await client.get<Array<T>>(`/${resource}`, { headers: { Authorization: authHeader }, params });
}

export const getReportFiltered = async (
    resource: string,
    authHeader: string,
    standardFilters?: FilterItem[],
    customFilters?: CustomFilter[],
    sort?: Sort,
) => {
    let params: { [key: string]: string } = {};
    standardFilters && insertStandardFilters(params, standardFilters);
    customFilters && insertCustomFilters(params, customFilters);
    sort && insertSort(params, sort);
    return await client.get<string>(`/${resource}`, { headers: { Authorization: authHeader }, params });
}

export const patchResource = async (resource: string, id: number, authHeader: string, initialValues: KeyValuePair, newValues: KeyValuePair) => {
    let patchItems: KeyValuePair = {};
    // Entry is an object where entry [0] is the key and [1] the value
    // We iterate through the object and check if the initial value is different from the new value (initivalValue[key] !== newValue)
    // If it's different, we add it to updatedValues
    Object.entries(newValues).forEach((entry) =>
        entry[1] !== initialValues[entry[0]] && (patchItems[entry[0]] = entry[1]));

    const patchDocument = Object.keys(patchItems).map(key => keyValueToPatchDocumentItem(key, patchItems[key]));
    return await client.patch(`/${resource}/${id}`, patchDocument, { headers: { Authorization: authHeader } });
}

export const getUpdateResourceFromType = (updateType: number) => {
    var periodUpdateTypes = [1, 3, 4, 5, 6, 7, 8, 9, 10, 11, 13, 23, 24, 25, 26, 27, 28, 29];
    var basicUpdateTypes = [15, 19];
    var dateChangeUpdateTypes = [17, 18];
    var monetaryUpdateTypes = [12, 14, 20, 21, 22];
    var resignationUpdateTypes = [16];
    var workAccidentUpdateTypes = [2];

    if (periodUpdateTypes.includes(updateType)) return "updates/period";
    if (basicUpdateTypes.includes(updateType)) return "updates/basic";
    if (dateChangeUpdateTypes.includes(updateType)) return "updates/date-change";
    if (monetaryUpdateTypes.includes(updateType)) return "updates/monetary";
    if (resignationUpdateTypes.includes(updateType)) return "updates/resignation";
    if (workAccidentUpdateTypes.includes(updateType)) return "updates/work-accident";

    return "updates/unknown";
}

const keyValueToPatchDocumentItem = (key: string, value: any): PatchDocumentItem => {
    return {
        op: "replace",
        path: `/${key}`,
        value: value
    }
}
