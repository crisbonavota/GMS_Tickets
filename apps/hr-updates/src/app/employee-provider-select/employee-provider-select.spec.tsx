import { render } from '@testing-library/react';

import EmployeeProviderSelect from './employee-provider-select';

describe('EmployeeProviderSelect', () => {
    it('should render successfully', () => {
        const { baseElement } = render(<EmployeeProviderSelect />);
        expect(baseElement).toBeTruthy();
    });
});
