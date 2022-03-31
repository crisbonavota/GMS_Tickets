import queryString from 'query-string';

export const getAuthHeader: (source: string) => string = (source: string) => {
    const urlParams = queryString.parse(window.location.search);
    const queryAuthHeader = urlParams['header'];

    // If there's no header on the URL parameters, go to the sign in page and specify to return them to the source
    if (!queryAuthHeader) {
        window.location.href = `${window.location.origin}/sign-in?redirect=${source}`;
        
        // This return will never happen because the previous line redirects the page, but this way TS doesn't complain about the return type of the function
        return "";
    }

    // Delete the parameters from the URL but without reloading the page
    window.history.replaceState({}, document.title, `/${source}`);

    return queryAuthHeader.toString();
}
