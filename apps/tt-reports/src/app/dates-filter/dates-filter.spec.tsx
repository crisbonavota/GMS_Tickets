import { render } from '@testing-library/react';

import DatesFilter from './dates-filter';

describe('DatesFilter', () => {
    it('should render successfully', () => {
        const { baseElement } = render(<DatesFilter />);
        expect(baseElement).toBeTruthy();
    });
});
