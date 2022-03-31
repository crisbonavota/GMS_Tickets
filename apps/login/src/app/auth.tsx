import axios from 'axios';
import { environment } from '../environments/environment';
import { ApplicationUserPublic } from '@gms-micro/auth-types';
interface Token {
    token: string,
    expiresIn: number
}

export interface AuthResponse {
    authToken: Token,
    refreshToken: Token,
    tokenType: string,
    authState: ApplicationUserPublic
}

const client = axios.create({
    'baseURL': `${environment.apiUrl}/users`
})

export const signInWithExternalProvider = (provider: string, token: string) => {
    return client.post<AuthResponse>('/auth/sign-in-external', { 'provider': provider, 'idToken': token });
}