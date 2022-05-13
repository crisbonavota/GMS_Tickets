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
        authUser: JSON.parse(queryAuthUser.toString()) as ApplicationUserPrivate
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

// Clears all cookies and reload the page
export const signOut = () => {
    var cookies = document.cookie.split("; ");
    for (var c = 0; c < cookies.length; c++) {
        var d = window.location.hostname.split(".");
        while (d.length > 0) {
            var cookieBase = encodeURIComponent(cookies[c].split(";")[0].split("=")[0]) + '=; expires=Thu, 01-Jan-1970 00:00:01 GMT; domain=' + d.join('.') + ' ;path=';
            var p = location.pathname.split('/');
            document.cookie = cookieBase + '/';
            while (p.length > 0) {
                document.cookie = cookieBase + p.join('/');
                p.pop();
            };
            d.shift();
        }
    }
    window.location.reload();
}
