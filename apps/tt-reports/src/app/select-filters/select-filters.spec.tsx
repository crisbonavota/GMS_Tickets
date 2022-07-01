import { render } from '@testing-library/react';

import SelectFilters from './select-filters';

describe('SelectFilters', () => {
    it('should render successfully', () => {
        const { baseElement } = render(<SelectFilters />);
        expect(baseElement).toBeTruthy();
    });
});
