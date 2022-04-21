import { CustomFilter, FilterItem, insertCustomFilters, insertPagination, insertSort, insertStandardFilters, Sort } from '@gms-micro/api-filters';
import { LegacyUserPublic } from '@gms-micro/auth-types';
import axios from 'axios';

const client = axios.create({ baseURL: `${process.env['NX_API_URL']}/updates` });

interface UpdateType {
    id: number,
    caption: string,
    active: boolean
}

interface Currency {
    id: number,
    code: string,
    active: boolean
}

export interface Update {
    id: number,
    legacyUser: LegacyUserPublic,
    updateType: UpdateType,
    date: Date,
    endDate: Date,
    amount: number,
    amountCurrency: Currency,
    motive: string,
    dateTelegram: Date,
    weekDay: number,
    newDate: Date,
    notes: string,
    followUp: string,
    active: boolean,
    data: string
}

export const getUpdates = async (authHeader: string, standardFilters: FilterItem[], customFilters: CustomFilter[], sort?: Sort, currentPage?: number, perPage?: number) => {
    let params: { [key: string]: string } = {};
    insertStandardFilters(params, standardFilters);
    insertCustomFilters(params, customFilters);
    insertSort(params, sort);
    insertPagination(params, currentPage, perPage);
    return await client.get<Update[]>('/', { headers: { Authorization: authHeader }, params });
}

export const getUpdateTypes = async (authHeader: string) => {
    return await client.get<UpdateType[]>('/types', { headers: { Authorization: authHeader } });
}

export const generateReport = async (authHeader: string, standardFilters: FilterItem[], customFilters: CustomFilter[], sort?: Sort) => {
    let params: { [key: string]: string } = {};
    insertStandardFilters(params, standardFilters);
    insertCustomFilters(params, customFilters);
    insertSort(params, sort);
    return await client.get<string>('/report', { headers: { Authorization: authHeader }, params });
}