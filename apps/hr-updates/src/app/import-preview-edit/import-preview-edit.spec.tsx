import { render } from '@testing-library/react';

import ImportPreviewEdit from './import-preview-edit';

describe('ImportPreviewEdit', () => {
    it('should render successfully', () => {
        const { baseElement } = render(<ImportPreviewEdit />);
        expect(baseElement).toBeTruthy();
    });
});
