import { LegacyUserPublic } from '@gms-micro/auth-types';
import axios from 'axios';

export interface BusinessUnit {
    id: number,
    name: string
}

export interface Account {
    id: number,
    name: string
}

export interface Proposal {
    id: number,
    name: string,
    account: Account
}

export interface Project {
    id: number,
    name: string,
    proposal: Proposal
}

const client = axios.create({ baseURL: process.env['NX_API_URL'] });

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
