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
            {commonRoutes.map((r) => (
                <Route key={r.path} {...r} />
            ))}
        </Routes>
    );
};

export const commonRoutes = [
    {
        path: `${basePath}/accounts/:id`,
        element: <AccountDetailedView />,
    },
    {
        path: `${basePath}/jobs/:id`,
        element: <JobDetailedView />,
    },
    {
        path: `${basePath}/projects/:id`,
        element: <JobDetailedView />,
    },
];

export default App;
