import { render } from '@testing-library/react';

import ImportFormatView from './import-format-view';

describe('ImportFormatView', () => {
    it('should render successfully', () => {
        const { baseElement } = render(<ImportFormatView />);
        expect(baseElement).toBeTruthy();
    });
});
