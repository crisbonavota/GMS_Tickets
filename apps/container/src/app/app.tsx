import styled from 'styled-components';

import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import MicroFrontend from './MicroFrontend';

//cambiar 
//const loginHost = process.env['loginHost'];
//const timetrackHost = process.env['timetrackHost'];

const LoginHost = () => <MicroFrontend name="Login" host={'http://localhost:3001'} />;
const TimetrackHost = () => <MicroFrontend name="Timetrack" host={'http://localhost:3002'} />;

const StyledApp = styled.div`
  // Your style here
`;

const Nav = () => (
  <div role="navigation">
    <ul>
      <li>
        <Link to="/">Login</Link>
      </li>
      <li>
        <Link to="/timetrack">Timetrack</Link>
      </li>
    </ul>
  </div>
);

export function App() {
  return (
    <StyledApp>
      <Router>
        <Nav />
        <Switch>
          <Route exact path="/">
            <LoginHost />
          </Route>

          <Route exact path="/timetrack">
            <TimetrackHost />
          </Route>
        </Switch>
      </Router>
      {/* END: routes */}
    </StyledApp>
  );
}

export default App;
