import { render } from '@testing-library/react';

import UpdateTypeFilter from './update-type-filter';

describe('UpdateTypeFilter', () => {
    it('should render successfully', () => {
        const { baseElement } = render(<UpdateTypeFilter />);
        expect(baseElement).toBeTruthy();
    });
});
