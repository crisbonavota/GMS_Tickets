import { render } from '@testing-library/react';
import { mainComponent } from '../main';

describe('App', () => {
  it('should render successfully', () => {
    const { baseElement } = render(mainComponent);
    expect(baseElement).toBeTruthy();
  });
});
