import { render } from '@testing-library/react';

import ImportButton from './import-button';

describe('ImportButton', () => {
    it('should render successfully', () => {
        const { baseElement } = render(<ImportButton />);
        expect(baseElement).toBeTruthy();
    });
});
