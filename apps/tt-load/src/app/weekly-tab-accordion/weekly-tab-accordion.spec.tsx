import { render } from '@testing-library/react';

import WeeklyTabAccordion from './weekly-tab-accordion';

describe('WeeklyTabAccordion', () => {
    it('should render successfully', () => {
        const { baseElement } = render(<WeeklyTabAccordion />);
        expect(baseElement).toBeTruthy();
    });
});
