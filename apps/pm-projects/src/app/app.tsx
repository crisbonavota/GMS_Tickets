import { Route, Routes } from 'react-router-dom';
import TabsView from './tabs/TabsView';
import ClientDetailedView from './detailed/clients/ClientDetailedView';
import AccountDetailedView from './detailed/accounts/AccountDetailedView';
import JobDetailedView from './detailed/jobs/JobDetailedView';

interface Props {
    basePath: string;
}

const App = ({ basePath }: Props) => {
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
                path={`${basePath}/Projects/:id`}
                element={<JobDetailedView />}
            />
        </Routes>
    );
};
export default App;
