import { Route, Routes } from 'react-router-dom';
import TabsView from './tabs/TabsView';
import ClientDetailedView from './detailed/clients/ClientDetailedView';
import AccountDetailedView from './detailed/accounts/AccountDetailedView';
import JobDetailedView from './detailed/jobs/JobDetailedView';

const basePath = '/project-management';

const App = () => {
    return (
        <Routes>
            <Route path={basePath} element={<TabsView />} />
            <Route
                path={`${basePath}/clients/:id`}
                element={<ClientDetailedView />}
            />
            <Route
                path={`${basePath}/accounts/:id`}
                element={<AccountDetailedView />}
            />
            <Route
                path={`${basePath}/jobs/:id`}
                element={<JobDetailedView />}
            />
        </Routes>
    );
};

export default App;
