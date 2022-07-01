import { render } from '@testing-library/react';

import NameInput from './name-input';

describe('NameInput', () => {
    it('should render successfully', () => {
        const { baseElement } = render(<NameInput />);
        expect(baseElement).toBeTruthy();
    });
});
