import { render } from '@testing-library/react';

import CustomTab from './custom-tab';

describe('CustomTab', () => {
    it('should render successfully', () => {
        const { baseElement } = render(<CustomTab />);
        expect(baseElement).toBeTruthy();
    });
});
