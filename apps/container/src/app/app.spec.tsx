import { render } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';

import App from './app';

// This component, being only a placeholder for the routing, probably won't get much testing.
describe('App', () => {
  it('should render successfully', () => {
    const { baseElement } = render(
      <BrowserRouter>
        <App />
      </BrowserRouter>
    );

    expect(baseElement).toBeTruthy();
  });
});
