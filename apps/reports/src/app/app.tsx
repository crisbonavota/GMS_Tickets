import { useEffect, useState } from 'react';
import { getAuthHeader } from '@gms-micro/auth-methods';

export function App() {
    const [authHeader, setAuthHeader] = useState("");
    
    useEffect(() => {
        const queryAuthHeader = getAuthHeader('reports');
        setAuthHeader(queryAuthHeader);
    }, []);

    
    return (
        <>
            {authHeader}
        </>
    );
}

export default App;
