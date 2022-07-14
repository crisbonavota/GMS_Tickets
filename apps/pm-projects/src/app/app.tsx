import { Route, Routes } from 'react-router-dom';
import TabsView from './tabs/TabsView';
import ClientDetailedView from './detailed/clients/ClientDetailedView';

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
        </Routes>
    );
};
export default App;
