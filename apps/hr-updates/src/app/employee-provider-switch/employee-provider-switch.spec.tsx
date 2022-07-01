import { render } from '@testing-library/react';

import EmployeeProviderSwitch from './employee-provider-switch';

describe('EmployeeProviderSwitch', () => {
    it('should render successfully', () => {
        const { baseElement } = render(<EmployeeProviderSwitch />);
        expect(baseElement).toBeTruthy();
    });
});
