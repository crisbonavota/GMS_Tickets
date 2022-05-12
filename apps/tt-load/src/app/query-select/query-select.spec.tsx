import { render } from '@testing-library/react';

import QuerySelect from './query-select';

describe('QuerySelect', () => {
    it('should render successfully', () => {
        const { baseElement } = render(<QuerySelect />);
        expect(baseElement).toBeTruthy();
    });
});
