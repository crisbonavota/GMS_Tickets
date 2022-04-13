import axios from 'axios';
import { environment } from '../environments/environment';
import { AuthResponse } from '@gms-micro/auth-types';

const client = axios.create({
    'baseURL': `${environment.apiUrl}/users`
})

export const signInWithExternalProvider = (provider: string, token: string) => {
    return client.post<AuthResponse>('/auth/sign-in-external', { 'provider': provider, 'idToken': token });
}