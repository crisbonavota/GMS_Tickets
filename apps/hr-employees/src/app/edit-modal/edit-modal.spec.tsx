import { render } from '@testing-library/react';

import EditModal from './edit-modal';

describe('EditModal', () => {
    it('should render successfully', () => {
        const { baseElement } = render(<EditModal />);
        expect(baseElement).toBeTruthy();
    });
});
