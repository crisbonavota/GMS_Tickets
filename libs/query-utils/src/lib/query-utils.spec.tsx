import { render } from '@testing-library/react';

import QueryUtils from './query-utils';

describe('QueryUtils', () => {
    it('should render successfully', () => {
        const { baseElement } = render(<QueryUtils />);
        expect(baseElement).toBeTruthy();
    });
});
