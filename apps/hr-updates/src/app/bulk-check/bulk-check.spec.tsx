import { render } from '@testing-library/react';

import BulkCheck from './bulk-check';

describe('BulkCheck', () => {
    it('should render successfully', () => {
        const { baseElement } = render(<BulkCheck />);
        expect(baseElement).toBeTruthy();
    });
});
