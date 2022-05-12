import { render } from '@testing-library/react';

import DatesFilters from './dates-filters';

describe('DatesFilters', () => {
    it('should render successfully', () => {
        const { baseElement } = render(<DatesFilters />);
        expect(baseElement).toBeTruthy();
    });
});
