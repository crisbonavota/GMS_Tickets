import { render } from '@testing-library/react';

import HoursInput from './hours-input';

describe('HoursInput', () => {
    it('should render successfully', () => {
        const { baseElement } = render(<HoursInput />);
        expect(baseElement).toBeTruthy();
    });
});
