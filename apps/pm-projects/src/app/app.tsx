import { Route, Routes } from 'react-router-dom';
import TabsView from './TabsView';

interface Props {
    basePath: string;
}

const App = ({ basePath }: Props) => {
    return (
        <Routes>
            <Route path={basePath} element={<TabsView />} />
        </Routes>
    );
};
export default App;
