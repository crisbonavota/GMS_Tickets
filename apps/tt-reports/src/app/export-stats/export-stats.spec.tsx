import { render } from '@testing-library/react';

import ExportStats from './export-stats';

describe('ExportStats', () => {
    it('should render successfully', () => {
        const { baseElement } = render(<ExportStats />);
        expect(baseElement).toBeTruthy();
    });
});
