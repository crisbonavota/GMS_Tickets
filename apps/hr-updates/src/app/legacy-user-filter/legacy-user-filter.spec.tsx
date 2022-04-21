import { render } from '@testing-library/react';

import LegacyUserFilter from './legacy-user-filter';

describe('LegacyUserFilter', () => {
    it('should render successfully', () => {
        const { baseElement } = render(<LegacyUserFilter />);
        expect(baseElement).toBeTruthy();
    });
});
