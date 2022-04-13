import queryString from 'query-string';
import { ApplicationUserPrivate } from '@gms-micro/auth-types';

interface LocalAuthInfo {
    authHeader: string,
    authUser: ApplicationUserPrivate
}

const getAuthInfo: (source: string) => LocalAuthInfo | null = (source: string) => {
    const urlParams = queryString.parse(window.location.search);
    const queryAuthHeader = urlParams['header'];
    const queryAuthUser = urlParams['user'];

    // If there's no header on the URL parameters, go to the sign in page and specify to return them to the source
    if (!queryAuthHeader || !queryAuthUser) {
        window.location.href = `${window.location.origin}/sign-in?redirect=${source}`;
    }

    // This return will never happen because the above if statement redirects the page if there's no header or user
    if (!queryAuthHeader || !queryAuthUser) return null;

    // Delete the parameters from the URL but without reloading the page
    window.history.replaceState({}, document.title, `/${source}`);

    return { 
        authHeader: queryAuthHeader.toString(), 
        authUser: queryAuthUser.toString() as unknown as ApplicationUserPrivate
    }
}

export const getAuthHeader: (source: string) => string | null = (source: string) => {
    const authInfo = getAuthInfo(source);
    return authInfo ? authInfo.authHeader : null;
}

export const getAuthUser: (source: string) => ApplicationUserPrivate | null = (source: string) => {
    const authInfo = getAuthInfo(source);
    return authInfo ? authInfo.authUser : null;
}
