import axios from 'axios';
import { AuthResponse } from '@gms-micro/auth-types';

const client = axios.create({
    'baseURL': `${process.env['NX_API_URL']}/users`
})

export const signInWithExternalProvider = (provider: string, token: string) => {
    return client.post<AuthResponse>('/auth/sign-in-external', { 'provider': provider, 'idToken': token });
}