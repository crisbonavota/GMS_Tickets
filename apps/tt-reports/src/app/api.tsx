import axios from 'axios';
import { FilterItem, insertSort, insertStandardFilters, Sort, insertCustomFilters, CustomFilter } from '@gms-micro/api-filters';
import { LegacyUserPublic } from 'libs/auth-types/src/lib/auth-types';
import { Project } from '@gms-micro/api-utils';
import { insertPagination } from '../../../../libs/api-filters/src/lib/api-filters';

const client = axios.create({ baseURL: process.env['NX_API_URL'] })

export interface TimetrackItem {
    id: number,
    project: Project,
    legacyUser: LegacyUserPublic,
    task: string,
    hours: number,
    date: string
}

export const getTimetrackItems = async (authHeader: string, standardFilters: FilterItem[], customFilters: CustomFilter[], sort?: Sort, currentPage?: number, perPage?: number) => {
    let params:{ [key: string]: string } = {};
    insertStandardFilters(params, standardFilters);
    insertCustomFilters(params, customFilters);
    insertSort(params, sort);
    insertPagination(params, currentPage, perPage);
    return await client.get<Array<TimetrackItem>>('/timetrack', { headers: { Authorization: authHeader }, params });
}

export const getTimetrackItemsReport = async (authHeader:string, standardFilters: FilterItem[], customFilters: CustomFilter[] , sort?: Sort) => {
    let params:{ [key: string]: string } = {};
    insertStandardFilters(params, standardFilters);
    insertCustomFilters(params, customFilters);
    insertSort(params, sort);
    return await client.get<string>('/timetrack/report', { headers: { Authorization: authHeader }, params });
}