import { render } from '@testing-library/react';

import TableDatesFilter from './table-dates-filter';

describe('TableDatesFilter', () => {
    it('should render successfully', () => {
        const { baseElement } = render(<TableDatesFilter />);
        expect(baseElement).toBeTruthy();
    });
});
