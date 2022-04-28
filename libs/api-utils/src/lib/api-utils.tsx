import axios from 'axios';
import { CustomFilter, FilterItem, insertCustomFilters, insertPagination, insertSort, insertStandardFilters, Sort } from '@gms-micro/api-filters';

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

export const downloadFile = (url: string, fileName: string) => {
    var download = document.createElement('a');
    download.href = url;
    download.download = fileName;
    document.body.appendChild(download);
    download.click();
    document.body.removeChild(download);
}

export const generateExcelFileURL = (data: string) => {
    return `data:application/vnd.ms-excel;base64,${encodeURIComponent(data)}`;
}
