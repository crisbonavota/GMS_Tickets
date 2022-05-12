import { render } from '@testing-library/react';

import DailyTab from './daily-tab';

describe('DailyTab', () => {
    it('should render successfully', () => {
        const { baseElement } = render(<DailyTab />);
        expect(baseElement).toBeTruthy();
    });
});
