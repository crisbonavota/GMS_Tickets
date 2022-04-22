import { LegacyUserPublic } from '@gms-micro/auth-types';
import axios from 'axios';

export const getLegacyUsers = async (authHeader:string) => {
    const client = axios.create({ baseURL: process.env['NX_API_URL'] });
    return await client.get<Array<LegacyUserPublic>>('/users/legacy', { headers: { Authorization: authHeader } });
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