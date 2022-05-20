import { render } from '@testing-library/react';

import EditEntry from './edit-entry';

describe('EditEntry', () => {
    it('should render successfully', () => {
        const { baseElement } = render(<EditEntry />);
        expect(baseElement).toBeTruthy();
    });
});
