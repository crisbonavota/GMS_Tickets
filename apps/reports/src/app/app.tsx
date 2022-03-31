import { useSearchParams } from 'react-router-dom';
import { useEffect, useState } from 'react';

export function App() {
    const [searchParams, setSearchParams] = useSearchParams();
    const [authHeader, setAuthHeader] = useState("");
    
    useEffect(() => {
        const queryAuthHeader = searchParams.get('header');
        // We manually change the URL because the router Navigate doesn't reload the page therefore sign-in doesn't catch the new query params
        if (!queryAuthHeader) window.location.href = window.location.origin + '/sign-in?redirect=reports';

        // This if is unnecessary because the previous line redirects to the sign-in page if the query params are not set, but TS complains
        if (queryAuthHeader) setAuthHeader(queryAuthHeader);

        // Clean the URL
        searchParams.delete('header');
        searchParams.delete('user');
        setSearchParams(searchParams);
    }, []);

    
    return (
        <>
            {authHeader}
        </>
    );
}

export default App;
