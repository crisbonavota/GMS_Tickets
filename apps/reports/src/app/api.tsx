import axios from 'axios';
import { FilterItem, insertSort, insertStandardFilters, Sort, insertCustomFilters, CustomFilter } from '@gms-micro/api-filters';
import { LegacyUserPublic } from 'libs/auth-types/src/lib/auth-types';

const client = axios.create({ baseURL: process.env['NX_API_URL'] })

interface BusinessUnit {
    id: number,
    name: string
}

interface Account {
    id: number,
    name: string
}

interface Proposal {
    id: number,
    name: string,
    account: Account
}

interface Project {
    id: number,
    name: string,
    proposal: Proposal
}

export interface TimetrackItem {
    id: number,
    project: Project,
    user: LegacyUserPublic,
    task: string,
    hours: number,
    date: string
}

export const getBusinessUnits = async (authHeader:string) => {
    return await client.get<Array<BusinessUnit>>('/businessUnits', { headers: { Authorization: authHeader } });
}

export const getProjects = async (authHeader:string) => {
    return await client.get<Array<Project>>('/projects', { headers: { Authorization: authHeader } });
}

export const getProposals = async (authHeader:string) => {
    return await client.get<Array<Proposal>>('/proposals', { headers: { Authorization: authHeader } });
}

export const getAccounts = async (authHeader:string) => {
    return await client.get<Array<Account>>('/accounts', { headers: { Authorization: authHeader } });
}

export const getTimetrackItemsReport = async (authHeader:string, standardFilters: FilterItem[], customFilters: CustomFilter[] , sort?: Sort) => {
    let params:{ [key: string]: string } = {};
    insertStandardFilters(params, standardFilters);
    insertCustomFilters(params, customFilters);
    insertSort(params, sort);
    return await client.get<string>('/timetrack/report', { headers: { Authorization: authHeader }, params });
}