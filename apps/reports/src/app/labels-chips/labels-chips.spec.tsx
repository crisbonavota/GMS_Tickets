import { render } from '@testing-library/react';

import LabelsChips from './labels-chips';

describe('LabelsChips', () => {
    it('should render successfully', () => {
        const { baseElement } = render(<LabelsChips />);
        expect(baseElement).toBeTruthy();
    });
});
