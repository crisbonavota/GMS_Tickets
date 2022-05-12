import { render } from '@testing-library/react';

import TaskInput from './task-input';

describe('TaskInput', () => {
    it('should render successfully', () => {
        const { baseElement } = render(<TaskInput />);
        expect(baseElement).toBeTruthy();
    });
});
