import { render } from '@testing-library/react';

import CopyEntry from './copy-entry';

describe('CopyEntry', () => {
    it('should render successfully', () => {
        const { baseElement } = render(<CopyEntry />);
        expect(baseElement).toBeTruthy();
    });
});
