import { render } from '@testing-library/react';

import WeeklyTab from './weekly-tab';

describe('WeeklyTab', () => {
    it('should render successfully', () => {
        const { baseElement } = render(<WeeklyTab />);
        expect(baseElement).toBeTruthy();
    });
});
