import { render } from '@testing-library/react';

import DeleteEntry from './delete-entry';

describe('DeleteEntry', () => {
    it('should render successfully', () => {
        const { baseElement } = render(<DeleteEntry />);
        expect(baseElement).toBeTruthy();
    });
});
