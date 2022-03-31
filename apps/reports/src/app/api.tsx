import axios from 'axios';
import { environment } from '../environments/environment';
import { FilterItem, insertSort, insertStandardFilters, Sort } from '@gms-micro/api-filters';

const client = axios.create({ baseURL: environment.apiUrl })

interface LegacyUserPublic {
    id: number,
    email: string,
    fullName: string,
    fileNumber: number
}

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

export const getLegacyUsers = async (authHeader:string) => {
    return await client.get<Array<LegacyUserPublic>>('/users/legacy', { headers: { Authorization: authHeader } });
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

export const getTimetrackItemsReport = async (authHeader:string, standardFilters: FilterItem[], sort?: Sort) => {
    let params:{ [key: string]: string } = {};
    insertStandardFilters(params, standardFilters);
    insertSort(params, sort);
    return await client.get<string>('/timetrack/report', { headers: { Authorization: authHeader }, params });
}

export const downloadFile = (url:string, fileName:string) => {
    var download = document.createElement('a');
    download.href = url;
    download.download = fileName;
    document.body.appendChild(download);
    download.click();
    document.body.removeChild(download);
}

export const generateExcelFileURL = (data:string) => {
    return `data:application/vnd.ms-excel;base64,${encodeURIComponent(data)}`;
}